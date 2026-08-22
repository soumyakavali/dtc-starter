"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return undefined
    }
    if (product.variants.length === 1) {
      return product.variants[0]
    }

    return (
      product.variants.find((v) => {
        const variantOptions = optionsAsKeymap(v.options)
        return isEqual(variantOptions, options)
      }) || product.variants[0]
    )
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return false
    if (product.variants.length === 1) return true
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (!selectedVariant) return true
    // If we don't manage inventory, we can always add to cart
    if (!selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if ((selectedVariant.inventory_quantity || 0) > 0) {
      return true
    }

    return true
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  const [cartError, setCartError] = useState<string | null>(null)
  const [addedSuccess, setAddedSuccess] = useState(false)

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    const targetVariantId = selectedVariant?.id || product.variants?.[0]?.id
    if (!targetVariantId) return null

    setIsAdding(true)
    setCartError(null)
    setAddedSuccess(false)

    try {
      try {
        await addToCart({
          variantId: targetVariantId,
          quantity: 1,
          countryCode: countryCode || "in",
        })
      } catch (actionErr) {
        console.warn("Direct server action failed, falling back to /api/cart:", actionErr)
        const apiRes = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "add",
            variantId: targetVariantId,
            quantity: 1,
            countryCode: countryCode || "in",
          }),
        })
        const data = await apiRes.json()
        if (!data.success) {
          throw new Error(data.error || "Failed to add item to cart")
        }
      }

      setAddedSuccess(true)
      router.refresh()
      setTimeout(() => setAddedSuccess(false), 5000)
    } catch (err: unknown) {
      console.error("Add to cart failed:", err)
      const message =
        err instanceof Error
          ? err.message
          : "Could not add product to cart. Please try again."
      setCartError(message)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {addedSuccess
            ? "✓ Added to Cart! / ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ"
            : !selectedVariant && !options
            ? "Select variant"
            : !inStock || !isValidVariant
            ? "Out of stock"
            : "Add to cart"}
        </Button>

        {addedSuccess && (
          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <span>🌾 Product added to cart! / ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ</span>
            <a
              href={`/${countryCode}/cart`}
              className="underline font-bold text-emerald-800 hover:text-emerald-950"
            >
              View Cart →
            </a>
          </div>
        )}

        {cartError && (
          <div className="p-2.5 rounded-lg bg-red-50 border border-red-300 text-red-800 text-xs">
            <p className="font-bold">⚠️ Cart Error:</p>
            <p className="mt-0.5">{cartError}</p>
          </div>
        )}
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
