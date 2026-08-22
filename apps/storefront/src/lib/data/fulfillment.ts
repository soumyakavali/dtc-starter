"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getAuthHeaders, getCacheOptions } from "./cookies"

const AGRI_FALLBACK_SHIPPING_OPTIONS: HttpTypes.StoreCartShippingOption[] = [
  {
    id: "so_agri_express",
    name: "Kisan Rural Express (Free Delivery on Orders ₹999+ / 2-3 Days / ಗ್ರಾಮೀಣ ಎಕ್ಸ್‌ಪ್ರೆಸ್)",
    amount: 0,
    is_tax_inclusive: true,
    price_type: "flat",
    data: {
      type: "express",
      estimated_days: "2-3 Days",
    },
  } as unknown as HttpTypes.StoreCartShippingOption,
  {
    id: "so_hub_pickup",
    name: "Direct Agri Depot Pickup (BioTill Mandya / Hubballi Hub - ₹0 / ಡಿಪೋ ಸಂಗ್ರಹ)",
    amount: 0,
    is_tax_inclusive: true,
    price_type: "flat",
    data: {
      type: "pickup",
      estimated_days: "Instant",
    },
  } as unknown as HttpTypes.StoreCartShippingOption,
  {
    id: "so_agri_priority",
    name: "Priority Karnataka Farm Dispatch (Same-Day / ₹49 / ವೇಗದ ವಿತರಣೆ)",
    amount: 49,
    is_tax_inclusive: true,
    price_type: "flat",
    data: {
      type: "priority",
      estimated_days: "1 Day",
    },
  } as unknown as HttpTypes.StoreCartShippingOption,
]

export const listCartShippingMethods = async (cartId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("fulfillment")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreShippingOptionListResponse>(
      `/store/shipping-options`,
      {
        method: "GET",
        query: {
          cart_id: cartId,
        },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ shipping_options }) => {
      if (!shipping_options || shipping_options.length === 0) {
        return AGRI_FALLBACK_SHIPPING_OPTIONS
      }
      return shipping_options
    })
    .catch(() => {
      return AGRI_FALLBACK_SHIPPING_OPTIONS
    })
}

export const calculatePriceForShippingOption = async (
  optionId: string,
  cartId: string,
  data?: Record<string, unknown>
) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("fulfillment")),
  }

  const body = { cart_id: cartId, data }

  if (data) {
    body.data = data
  }

  return sdk.client
    .fetch<{ shipping_option: HttpTypes.StoreCartShippingOption }>(
      `/store/shipping-options/${optionId}/calculate`,
      {
        method: "POST",
        body,
        headers,
        next,
      }
    )
    .then(({ shipping_option }) => shipping_option)
    .catch((_e) => {
      return null
    })
}
