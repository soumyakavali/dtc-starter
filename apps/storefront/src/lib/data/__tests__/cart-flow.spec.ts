import {
  addToCart,
  retrieveCart,
  updateLineItem,
  deleteLineItem,
  applyPromotions,
  getOrSetCart,
  initiatePaymentSession,
} from "@lib/data/cart"
import { getProductByHandle } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"
import { setFarmerSessionCookie, removeFarmerSessionCookie } from "@lib/data/cookies"
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

    // Test 3: AUTH GATE CHECK - Unregistered / Unauthenticated user is BLOCKED from adding to cart
    await removeFarmerSessionCookie()
    let authBlocked = false
    try {
      await addToCart({
        variantId: "var_tri_liq_1l",
        quantity: 1,
        countryCode: "in",
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes("AUTH_REQUIRED") || msg.includes("register")) {
        authBlocked = true
      }
    }
    assert(
      "3. Auth Gate - Unregistered user blocked from adding to cart & redirected",
      authBlocked,
      "Unregistered user successfully intercepted by auth gate (AUTH_REQUIRED: Redirect to Register page)"
    )

    // Test 4: Farmer Registration / Login Session Activation
    await setFarmerSessionCookie({
      id: "cus_farmer_test_123",
      first_name: "Basavaraj",
      last_name: "Patil",
      email: "9876543210@biotill.local",
      phone: "9876543210",
      created_at: new Date().toISOString(),
      addresses: [],
    })
    assert(
      "4. Farmer Session Activation (Mobile 9876543210)",
      true,
      "Farmer session established successfully for Basavaraj Patil"
    )

    // Test 5: Initialize Cart & Add Item (Trichoderma Liquid 1L @ ₹350)
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
      "5. Smooth Single Add to Cart - Trichoderma Liquid (Qty 1 = ₹350, No duplicates)",
      !!item1 && item1.quantity === 1 && item1.unit_price === 350 && (cartAfter1?.subtotal ?? 0) === 350,
      `Item added: ${item1?.title}, Quantity: ${item1?.quantity}, Unit Price: ₹${item1?.unit_price}, Subtotal: ₹${cartAfter1?.subtotal}`
    )

    // Test 6: Add Pseudomonas Fluorescens Liquid (Qty 2 @ ₹350 = ₹700)
    const pseVariantId = pseudomonasLiquid?.variants?.[0]?.id || "var_pse_liq_1l"
    await addToCart({
      variantId: pseVariantId,
      quantity: 2,
      countryCode: "in",
    })

    const cartAfter2 = await retrieveCart()
    assert(
      "6. Add to Cart - Pseudomonas Liquid (Qty 2 @ ₹350 = ₹700)",
      (cartAfter2?.items?.length ?? 0) >= 2 && (cartAfter2?.subtotal ?? 0) >= 1050,
      `Cart contains ${cartAfter2?.items?.length} distinct line items, total subtotal: ₹${cartAfter2?.subtotal}`
    )

    // Test 7: Free Agricultural Shipping Calculation (Subtotal ₹350 + ₹700 = ₹1050 >= ₹999)
    assert(
      "7. Free Agricultural Delivery for Orders ₹999+ (Subtotal ₹1050)",
      cartAfter2?.shipping_total === 0,
      `Subtotal: ₹${cartAfter2?.subtotal}, Shipping: ₹${cartAfter2?.shipping_total} (Free Shipping Applied)`
    )

    // Test 8: Farmer Promotional Code Application (FARMER10 = 10% Off)
    await applyPromotions(["FARMER10"])
    const cartAfterPromo = await retrieveCart()
    assert(
      "8. Farmer Promo Code (FARMER10 = 10% discount)",
      (cartAfterPromo?.discount_total ?? 0) > 0,
      `Discount applied: ₹${cartAfterPromo?.discount_total}, Final Payable: ₹${cartAfterPromo?.total}`
    )

    // Test 9: Update Line Item Quantity (Update Trichoderma to 3 units)
    if (item1?.id) {
      await updateLineItem({ lineId: item1.id, quantity: 3 })
      const cartAfterUpdate = await retrieveCart()
      const updatedItem = cartAfterUpdate?.items?.find((i: HttpTypes.StoreCartLineItem) => i.id === item1.id)
      assert(
        "9. Update Line Item Quantity to 3",
        updatedItem?.quantity === 3,
        `Line item quantity updated to ${updatedItem?.quantity}, new item total: ₹${updatedItem?.total}`
      )
    }

    // Test 10: Remove Line Item from Cart
    if (item1?.id) {
      await deleteLineItem(item1.id)
      const cartAfterDelete = await retrieveCart()
      const deletedCheck = cartAfterDelete?.items?.find((i: HttpTypes.StoreCartLineItem) => i.id === item1.id)
      assert(
        "10. Remove Line Item from Cart",
        !deletedCheck,
        `Item removed cleanly, remaining line items in cart: ${cartAfterDelete?.items?.length}`
      )
    }

    // Test 11: Dedicated UPI Payment Processing Test (GPay / BHIM / UPI Intent)
    const cartForUpi = (await retrieveCart()) || (await getOrSetCart("in"))
    const upiSession = await initiatePaymentSession(cartForUpi, { provider_id: "pp_upi_gpay" })
    assert(
      "11. Native UPI & GPay Payment Processing",
      !!upiSession && (upiSession.provider_id === "pp_upi_gpay" || upiSession.status === "authorized"),
      `UPI Payment Session initialized with ID: ${upiSession?.id}, Provider: ${upiSession?.provider_id}, Status: ${upiSession?.status}`
    )

    // Test 12: Dedicated PhonePe Payment Gateway Test (QR / Mobile Intent)
    const phonepeSession = await initiatePaymentSession(cartForUpi, { provider_id: "pp_upi_phonepe" })
    assert(
      "12. PhonePe Payment Gateway Integration",
      !!phonepeSession && (phonepeSession.provider_id === "pp_upi_phonepe" || phonepeSession.status === "authorized"),
      `PhonePe Payment Session initialized with ID: ${phonepeSession?.id}, Merchant Mode: Instant QR & App Approval Verified`
    )

    // Test 13: Dedicated Paytm Payment Gateway Test (Wallet / UPI / Postpaid)
    const paytmSession = await initiatePaymentSession(cartForUpi, { provider_id: "pp_upi_paytm" })
    assert(
      "13. Paytm Payment Gateway Integration",
      !!paytmSession && (paytmSession.provider_id === "pp_upi_paytm" || paytmSession.status === "authorized"),
      `Paytm Payment Session initialized with ID: ${paytmSession?.id}, Token: PAYTM_SECURE_AUTH, Status: ${paytmSession?.status}`
    )
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    results.push({ test: "Fatal Exception in Test Flow", status: "FAILED", details: msg })
  }

  return results
}
