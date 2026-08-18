import { HttpTypes } from "@medusajs/types"
import { getPercentageDiff } from "./get-percentage-diff"
import { convertToLocale } from "./money"

type VariantWithPrice = HttpTypes.StoreProductVariant & {
  calculated_price?: {
    calculated_amount: number
    original_amount: number
    currency_code: string
    calculated_price?: {
      price_list_type?: string
    }
    price_list_type?: string
  }
}

export const getPricesForVariant = (variant: VariantWithPrice) => {
  if (!variant?.calculated_price || typeof variant.calculated_price.calculated_amount !== "number") {
    return null
  }

  const calcAmount = variant.calculated_price.calculated_amount
  const origAmount = variant.calculated_price.original_amount ?? calcAmount
  const currCode = variant.calculated_price.currency_code || "inr"
  const priceType = variant.calculated_price.calculated_price?.price_list_type || variant.calculated_price.price_list_type || "default"

  return {
    calculated_price_number: calcAmount,
    calculated_price: convertToLocale({
      amount: calcAmount,
      currency_code: currCode,
    }),
    original_price_number: origAmount,
    original_price: convertToLocale({
      amount: origAmount,
      currency_code: currCode,
    }),
    currency_code: currCode,
    price_type: priceType,
    percentage_diff: getPercentageDiff(
      origAmount,
      calcAmount
    ),
  }
}

export function getProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct
  variantId?: string
}) {
  if (!product || !product.id) {
    throw new Error("No product provided")
  }

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null
    }

    const cheapestVariant = (product.variants as VariantWithPrice[])
      .filter((v) => !!v.calculated_price)
      .sort((a, b) => {
        return (
          (a.calculated_price?.calculated_amount ?? 0) -
          (b.calculated_price?.calculated_amount ?? 0)
        )
      })[0]

    return getPricesForVariant(cheapestVariant)
  }

  const variantPrice = () => {
    if (!product || !variantId) {
      return null
    }

    const variant = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId
    ) as VariantWithPrice | undefined

    if (!variant) {
      return null
    }

    return getPricesForVariant(variant)
  }

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  }
}
