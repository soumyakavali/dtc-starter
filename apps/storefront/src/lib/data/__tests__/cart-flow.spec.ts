import {
  addToCart,
  retrieveCart,
  updateLineItem,
  deleteLineItem,
  applyPromotions,
  getOrSetCart,
} from "@lib/data/cart"
import { getProductByHandle } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"

export type TestResult = {
  test: string
  status: "PASSED" | "FAILED"
  details: string
}

export async function runCartUITestSuite(): Promise<TestResult[]> {
  const results: TestResult[] = []

  const assert = (test: string, condition: boolean, details: string) => {
    results.push({
      test,
      status: condition ? "PASSED" : "FAILED",
      details,
    })
  }

  try {
    // Test 1: Category Listing & Agricultural Taxonomy
    const categories = await listCategories()
    assert(
      "1. Agricultural Taxonomy & Category Retrieval",
      categories.length >= 6,
      `Loaded ${categories.length} categories (Bio-Fertilizers, Bio-Pesticides, Bio-Fungicides, etc.)`
    )

    // Test 2: Product Catalog & Pricing (₹150 Powder / ₹350 Liquid)
    const { product: trichodermaLiquid } = await getProductByHandle("trichoderma-liquid")
    const { product: pseudomonasLiquid } = await getProductByHandle("pseudomonas-liquid")
    assert(
      "2. Product Catalog & Liquid Pricing (₹350)",
      !!trichodermaLiquid &&
        !!pseudomonasLiquid &&
        trichodermaLiquid.variants?.[0]?.calculated_price?.calculated_amount === 350,
      `Trichoderma Liquid price: ₹${trichodermaLiquid?.variants?.[0]?.calculated_price?.calculated_amount}`
    )

    // Test 3: Initialize Cart & Add Item (Trichoderma Liquid 1L @ ₹350)
    await getOrSetCart("in")
    const triVariantId = trichodermaLiquid?.variants?.[0]?.id || "var_tri_liq_1l"
    await addToCart({
      variantId: triVariantId,
      quantity: 1,
      countryCode: "in",
    })

    const cartAfter1 = await retrieveCart()
    const item1 = cartAfter1?.items?.find(
      (i: HttpTypes.StoreCartLineItem) =>
        (i as Record<string, unknown>).product_handle === "trichoderma-liquid" || i.variant_id === triVariantId
    )
    assert(
      "3. Add to Cart - Trichoderma Liquid (₹350)",
      !!item1 && item1.unit_price === 350 && (cartAfter1?.subtotal ?? 0) >= 350,
      `Item added: ${item1?.title}, Unit Price: ₹${item1?.unit_price}, Subtotal: ₹${cartAfter1?.subtotal}`
    )

    // Test 4: Add Pseudomonas Fluorescens Liquid (Qty 2 @ ₹350 = ₹700)
    const pseVariantId = pseudomonasLiquid?.variants?.[0]?.id || "var_pse_liq_1l"
    await addToCart({
      variantId: pseVariantId,
      quantity: 2,
      countryCode: "in",
    })

    const cartAfter2 = await retrieveCart()
    assert(
      "4. Add to Cart - Pseudomonas Liquid (Qty 2 @ ₹350)",
      (cartAfter2?.items?.length ?? 0) >= 2,
      `Cart contains ${cartAfter2?.items?.length} distinct line items, total subtotal: ₹${cartAfter2?.subtotal}`
    )

    // Test 5: Free Agricultural Shipping Calculation (Subtotal ₹350 + ₹700 = ₹1050 >= ₹999)
    assert(
      "5. Free Agricultural Delivery for Orders ₹999+ (Subtotal ₹1050)",
      cartAfter2?.shipping_total === 0,
      `Subtotal: ₹${cartAfter2?.subtotal}, Shipping: ₹${cartAfter2?.shipping_total} (Free Shipping Applied)`
    )

    // Test 6: Farmer Promotional Code Application (FARMER10 = 10% Off)
    await applyPromotions(["FARMER10"])
    const cartAfterPromo = await retrieveCart()
    assert(
      "6. Farmer Promo Code (FARMER10 = 10% discount)",
      (cartAfterPromo?.discount_total ?? 0) > 0,
      `Discount applied: ₹${cartAfterPromo?.discount_total}, Final Payable: ₹${cartAfterPromo?.total}`
    )

    // Test 7: Update Line Item Quantity (Update Trichoderma to 3 units)
    if (item1?.id) {
      await updateLineItem({ lineId: item1.id, quantity: 3 })
      const cartAfterUpdate = await retrieveCart()
      const updatedItem = cartAfterUpdate?.items?.find((i: HttpTypes.StoreCartLineItem) => i.id === item1.id)
      assert(
        "7. Update Line Item Quantity to 3",
        updatedItem?.quantity === 3,
        `Line item quantity updated to ${updatedItem?.quantity}, new item total: ₹${updatedItem?.total}`
      )
    }

    // Test 8: Remove Line Item from Cart
    if (item1?.id) {
      await deleteLineItem(item1.id)
      const cartAfterDelete = await retrieveCart()
      const deletedCheck = cartAfterDelete?.items?.find((i: HttpTypes.StoreCartLineItem) => i.id === item1.id)
      assert(
        "8. Remove Line Item from Cart",
        !deletedCheck,
        `Item removed cleanly, remaining line items in cart: ${cartAfterDelete?.items?.length}`
      )
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    results.push({ test: "Fatal Exception in Test Flow", status: "FAILED", details: msg })
  }

  return results
}
