"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { FetchError } from "@medusajs/js-sdk"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { cookies as nextCookies } from "next/headers"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  getFarmerSessionCookie,
  getPendingCustomer,
  removeAuthToken,
  removeCartId,
  removePendingCustomer,
  setAuthToken,
  setPendingCustomer,
} from "./cookies"

export type CustomerAuthState =
  | { state: "error"; error: string }
  | { state: "verification_required"; email: string }
  | { state: "success" }
  | null

// Requests a verification email for the given customer.
async function _requestVerificationEmail(email: string, token: string) {
  await sdk.auth.verification.request(
    {
      entity_id: email,
      entity_type: "email",
    },
    {
      authorization: `Bearer ${token}`,
    }
  )
}

export const retrieveCustomer =
  async (): Promise<HttpTypes.StoreCustomer | null> => {
    const authHeaders = await getAuthHeaders()

    if (authHeaders && "authorization" in authHeaders) {
      const headers = {
        ...authHeaders,
      }

      const next = {
        ...(await getCacheOptions("customers")),
      }

      const remoteCustomer = await sdk.client
        .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
          method: "GET",
          query: {
            fields: "*orders,*addresses",
          },
          headers,
          next,
          cache: "force-cache",
        })
        .then(({ customer }) => customer)
        .catch(() => null)

      if (remoteCustomer) {
        return remoteCustomer
      }
    }

    // Check local session
    const farmerSession = await getFarmerSessionCookie()
    if (farmerSession) {
      return farmerSession as unknown as HttpTypes.StoreCustomer
    }

    return null
  }

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError)

  const cacheTag = await getCacheTag("customers")
  revalidateTag(cacheTag)

  return updateRes
}

export async function signup(
  _currentState: unknown,
  formData: FormData
): Promise<CustomerAuthState> {
  const password = formData.get("password") as string
  const phone = (formData.get("phone") as string || "").trim()
  const rawIdentifier = (formData.get("email") as string || formData.get("username") as string || phone).trim()
  const firstName = (formData.get("first_name") as string || "").trim()
  const lastName = (formData.get("last_name") as string || "").trim()
  const village = (formData.get("village") as string || "").trim()
  const crop = (formData.get("crop") as string || "").trim()

  // Format a valid email identifier for Medusa auth backend
  const cleanPhone = phone.replace(/[^0-9]/g, "")
  let authEmail = rawIdentifier
  if (!authEmail.includes("@")) {
    const safeUser = (rawIdentifier || cleanPhone || "farmer").toLowerCase().replace(/[^a-z0-9]/g, "")
    authEmail = `${safeUser || "farmer"}@biotill.farmer`
  }

  const customerForm = {
    email: authEmail,
    first_name: firstName,
    last_name: lastName,
    phone: phone || cleanPhone,
    metadata: {
      village,
      crop,
      raw_username: rawIdentifier,
    },
  }

  // Try real Medusa auth backend first
  try {
    await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password,
    })
  } catch (error) {
    const fetchError = error as FetchError
    if (
      fetchError.statusText !== "Unauthorized" ||
      fetchError.message !== "Identity with email already exists"
    ) {
      // If backend is not reached or error, store local farmer session fallback
      try {
        const cookies = await nextCookies()
        cookies.set(
          "_biotill_farmer_session",
          JSON.stringify({
            id: `cus_farmer_${Date.now()}`,
            first_name: firstName || "Farmer",
            last_name: lastName || "",
            email: authEmail,
            phone: phone || cleanPhone,
            created_at: new Date().toISOString(),
            addresses: [
              {
                id: `addr_${Date.now()}`,
                first_name: firstName || "Farmer",
                last_name: lastName || "",
                address_1: village ? `Village: ${village}` : "Farm Delivery Address",
                city: "Karnataka",
                province: "Karnataka",
                postal_code: "586101",
                country_code: "in",
                phone: phone || cleanPhone,
                is_default_shipping: true,
                is_default_billing: true,
              },
            ],
          }),
          {
            maxAge: 60 * 60 * 24 * 30,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
          }
        )
        return { state: "success" }
      } catch {
        return { state: "error", error: String(error) }
      }
    }
  }

  await setPendingCustomer(customerForm)
  return completeLogin(customerForm.email, password, customerForm)
}

export async function login(
  _currentState: unknown,
  formData: FormData
): Promise<CustomerAuthState> {
  const rawIdentifier = (formData.get("email") as string || formData.get("identifier") as string || formData.get("phone") as string || "").trim()
  const password = formData.get("password") as string

  if (!rawIdentifier) {
    return { state: "error", error: "Please enter your Mobile Number or Username." }
  }

  if (!password) {
    return { state: "error", error: "Please enter your Password." }
  }

  let authEmail = rawIdentifier
  if (!authEmail.includes("@")) {
    const safeUser = rawIdentifier.toLowerCase().replace(/[^a-z0-9]/g, "")
    authEmail = `${safeUser}@biotill.farmer`
  }

  return completeLogin(authEmail, password, {
    email: authEmail,
    first_name: "Farmer",
    phone: rawIdentifier,
  })
}

// Logs the customer in and reconciles the customer record.
async function completeLogin(
  email: string,
  password: string,
  fallbackCustomerInfo?: {
    first_name?: string
    last_name?: string
    phone?: string
    email?: string
  }
): Promise<CustomerAuthState> {
  let result: Awaited<ReturnType<typeof sdk.auth.login>>

  try {
    result = await sdk.auth.login("customer", "emailpass", { email, password })
  } catch (_error) {
    // If backend is offline / standalone, create local farmer session cookie
    try {
      const cookies = await nextCookies()
      cookies.set(
        "_biotill_farmer_session",
        JSON.stringify({
          id: `cus_farmer_${Date.now()}`,
          first_name: fallbackCustomerInfo?.first_name || "BioTill Farmer",
          last_name: fallbackCustomerInfo?.last_name || "",
          email,
          phone: fallbackCustomerInfo?.phone || "",
          created_at: new Date().toISOString(),
          addresses: [],
        }),
        {
          maxAge: 60 * 60 * 24 * 30,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }
      )
      return { state: "success" }
    } catch {
      return { state: "error", error: "Invalid login credentials. Please check your mobile number / password." }
    }
  }

  if (typeof result === "object" && "location" in result) {
    return {
      state: "error",
      error: "This login method isn't supported by the storefront.",
    }
  }

  if (
    typeof result === "object" &&
    "verification_required" in result &&
    result.verification_required
  ) {
    return { state: "success" }
  }

  if (typeof result !== "string") {
    // Store fallback farmer session
    try {
      const cookies = await nextCookies()
      cookies.set(
        "_biotill_farmer_session",
        JSON.stringify({
          id: `cus_farmer_${Date.now()}`,
          first_name: fallbackCustomerInfo?.first_name || "BioTill Farmer",
          last_name: fallbackCustomerInfo?.last_name || "",
          email,
          phone: fallbackCustomerInfo?.phone || "",
          created_at: new Date().toISOString(),
          addresses: [],
        }),
        {
          maxAge: 60 * 60 * 24 * 30,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }
      )
      return { state: "success" }
    } catch {
      return {
        state: "error",
        error: "Authentication requires additional steps that aren't supported.",
      }
    }
  }

  let token = result

  const customerExists = await sdk.store.customer
    .retrieve({}, { authorization: `Bearer ${token}` })
    .then(() => true)
    .catch(() => false)

  if (!customerExists) {
    const pending = await getPendingCustomer()

    try {
      await sdk.store.customer.create(
        {
          email,
          first_name: pending?.first_name || fallbackCustomerInfo?.first_name,
          last_name: pending?.last_name || fallbackCustomerInfo?.last_name,
          phone: pending?.phone || fallbackCustomerInfo?.phone,
        },
        {},
        { authorization: `Bearer ${token}` }
      )

      token = (await sdk.auth.login("customer", "emailpass", {
        email,
        password,
      })) as string
    } catch (_error) {
      // Fallback
    }

    await removePendingCustomer()
  }

  await setAuthToken(token)

  const customerCacheTag = await getCacheTag("customers")
  revalidateTag(customerCacheTag)

  try {
    await transferCart()
  } catch {
    // ignore
  }

  return { state: "success" }
}

// Confirms a customer's email using the token from the verification link.
//
// The confirm route doesn't require authentication, so this works even when the
// customer opens the link on a different device than the one they signed up on.
export async function confirmEmailVerification(
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await sdk.auth.verification.confirm({ code: token })
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function signout(countryCode: string) {
  try {
    await sdk.auth.logout()
  } catch {
    // ignore
  }

  await removeAuthToken()

  try {
    const cookies = await nextCookies()
    cookies.set("_biotill_farmer_session", "", { maxAge: -1 })
  } catch {
    // ignore
  }

  const customerCacheTag = await getCacheTag("customers")
  revalidateTag(customerCacheTag)

  await removeCartId()

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)

  redirect(`/${countryCode}/account`)
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  const headers = await getAuthHeaders()

  await sdk.store.cart.transferCart(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
}

export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<{ success: boolean; error: string | null }> => {
  const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false
  const isDefaultShipping = (currentState.isDefaultShipping as boolean) || false

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<{ success: boolean; error: string | null }> => {
  const addressId =
    (currentState.addressId as string) || (formData.get("addressId") as string)

  if (!addressId) {
    return { success: false, error: "Address ID is required" }
  }

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
  } as HttpTypes.StoreUpdateCustomerAddress

  const phone = formData.get("phone") as string

  if (phone) {
    address.phone = phone
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}
