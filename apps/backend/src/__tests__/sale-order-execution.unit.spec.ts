import { describe, it, expect } from "@jest/globals"
import { executeCompleteSaleOrder } from "../scripts/test-complete-sales-order"

describe("Live Sale Order Execution Test", () => {
  it("should process a full end-to-end sale order with ₹1,450.00 total and PhonePe capture", async () => {
    const result = await executeCompleteSaleOrder()

    // 1. Order Identification
    expect(result.orderId).toBeDefined()
    expect(result.orderId).toContain("order_bt_2026_")
    expect(result.orderNumber).toBeGreaterThan(1000)

    // 2. Customer
    expect(result.customer.mobile).toHaveLength(10)
    expect(result.customer.postalCode).toBe("586101")
    expect(result.customer.district).toContain("Karnataka")

    // 3. Line Items
    expect(result.items).toHaveLength(3)
    expect(result.items[0].unitPrice).toBe(150) // Powder @ ₹150
    expect(result.items[1].unitPrice).toBe(350) // Liquid @ ₹350
    expect(result.items[2].unitPrice).toBe(150) // Powder @ ₹150

    // 4. Financials & Free Shipping threshold check
    expect(result.subtotal).toBe(1450.0)
    expect(result.shippingTotal).toBe(0.0) // Subtotal >= ₹999 -> Free delivery
    expect(result.grandTotal).toBe(1450.0)
    expect(result.currency).toContain("INR")

    // 5. Payment Capture
    expect(result.payment.provider).toBe("PhonePe UPI")
    expect(result.payment.status).toBe("CAPTURED")
    expect(result.payment.transactionId).toBeDefined()
    expect(result.payment.upiQrString).toContain("pa=biotillagri@ybl")

    // 6. Fulfillment
    expect(result.fulfillment.trackingNumber).toBe(`KA-AGRI-EXP-586101-${result.orderNumber}`)
    expect(result.fulfillment.status).toBe("shipped")
  })
})
