"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { HttpTypes } from "@medusajs/types"

const AGRI_PAYMENT_PROVIDERS: HttpTypes.StorePaymentProvider[] = [
  {
    id: "pp_upi_phonepe",
    is_enabled: true,
  },
  {
    id: "pp_upi_paytm",
    is_enabled: true,
  },
  {
    id: "pp_upi_gpay",
    is_enabled: true,
  },
  {
    id: "pp_kisan_credit",
    is_enabled: true,
  },
  {
    id: "pp_system_default",
    is_enabled: true,
  },
  {
    id: "pp_cod_agri",
    is_enabled: true,
  },
]

export const listCartPaymentMethods = async (regionId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("payment_providers")),
  }

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>(
      `/store/payment-providers`,
      {
        method: "GET",
        query: { region_id: regionId },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ payment_providers }) => {
      if (!payment_providers || payment_providers.length === 0) {
        return AGRI_PAYMENT_PROVIDERS
      }
      return payment_providers.sort((a, b) => {
        return a.id > b.id ? 1 : -1
      })
    })
    .catch(() => {
      return AGRI_PAYMENT_PROVIDERS
    })
}
