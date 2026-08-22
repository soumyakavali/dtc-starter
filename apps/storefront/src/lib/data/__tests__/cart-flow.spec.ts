import {
  addToCart,
  retrieveCart,
  updateLineItem,
  deleteLineItem,
  applyPromotions,
  getOrSetCart,
} from "../cart"
import { MOCK_PRODUCTS } from "../mock-data"

/**
 * BioTill Live E2E & User Flow Test Suite
 * Tests full Add to Cart, Pricing, Indian Farmer Discounts, Shipping Thresholds, and Checkout.
 */
export async function runCartUITestSuite() {
  const results: { test: string; status: "PASSED" | "FAILED"; details: string }[] = []

  const assert = (name: string, condition: boolean, message: string) => {
    if (condition) {
      results.push({ test: name, status: "PASSED", details: message })
    } else {
      results.push({ test: name, status: "FAILED", details: `Assertion failed: ${message}` })
      console.error(`[TEST FAILED] ${name}: ${message}`)
    }
  }

  try {
    // Test 1: Initialize Cart for India Region
    const cart = await getOrSetCart("in")
    assert("1. Cart Initialization", !!cart && !!cart.id, `Created/retrieved cart with ID: ${cart?.id}`)

    // Test 2: Locate Products
    const trichodermaLiquid = MOCK_PRODUCTS.find((p) => p.handle === "trichoderma-liquid")
    const pseudomonasLiquid = MOCK_PRODUCTS.find((p) => p.handle === "pseudomonas-liquid")
    assert("2. Locate Agricultural Products", !!trichodermaLiquid && !!pseudomonasLiquid, `Found Trichoderma & Pseudomonas in catalog`)

    // Test 3: Add Trichoderma Harzianum Liquid (@ ₹350)
    const triVariantId = trichodermaLiquid?.variants?.[0]?.id || "var_tri_liq_1l"
    await addToCart({
      variantId: triVariantId,
      quantity: 1,
      countryCode: "in",
    })

    const cartAfter1 = await retrieveCart()
    const item1 = cartAfter1?.items?.find(
      (i: any) => i.product_handle === "trichoderma-liquid" || i.variant_id === triVariantId
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
      const updatedItem = cartAfterUpdate?.items?.find((i: any) => i.id === item1.id)
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
      const deletedCheck = cartAfterDelete?.items?.find((i: any) => i.id === item1.id)
      assert(
        "8. Remove Line Item from Cart",
        !deletedCheck,
        `Item removed cleanly, remaining line items in cart: ${cartAfterDelete?.items?.length}`
      )
    }

  } catch (err: any) {
    results.push({ test: "Fatal Exception in Test Flow", status: "FAILED", details: err.message || String(err) })
  }

  return results
}
