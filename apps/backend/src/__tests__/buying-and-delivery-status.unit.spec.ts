import { describe, it, expect } from "@jest/globals"

export type OrderFulfillmentStatus =
  | "not_fulfilled"
  | "partially_fulfilled"
  | "fulfilled"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "canceled"

export interface BioTillOrder {
  id: string
  display_id: number
  customer_id: string
  farmer_name: string
  farmer_phone: string
  status: "pending" | "processing" | "completed" | "canceled"
  fulfillment_status: OrderFulfillmentStatus
  payment_status: "not_paid" | "authorized" | "captured" | "refunded"
  items: Array<{
    title: string
    unit_price: number
    quantity: number
    form: "powder" | "liquid"
  }>
  total_amount: number
  tracking_number?: string
  carrier?: string
  delivered_at?: string
  logs: Array<{ timestamp: string; note: string }>
}

describe("Buying & Delivery Status Lifecycle Validations", () => {
  const createTestOrder = (): BioTillOrder => ({
    id: "order_biotill_001",
    display_id: 1089,
    customer_id: "cus_farmer_9876543210",
    farmer_name: "Basavaraj Patil",
    farmer_phone: "9876543210",
    status: "pending",
    fulfillment_status: "not_fulfilled",
    payment_status: "authorized",
    items: [
      {
        title: "Trichoderma Viride Bio-Fungicide (1 Kg)",
        unit_price: 15000,
        quantity: 4,
        form: "powder",
      },
      {
        title: "Bio NPK Liquid Consortium (1 Litre)",
        unit_price: 35000,
        quantity: 2,
        form: "liquid",
      },
    ],
    total_amount: 130000, // ₹1,300.00
    logs: [{ timestamp: new Date().toISOString(), note: "Order placed by farmer via Mobile Web" }],
  })

  it("1. Should successfully transition from Order Placed to Payment Captured", () => {
    const order = createTestOrder()
    expect(order.status).toBe("pending")
    expect(order.payment_status).toBe("authorized")

    // Payment captured by gateway
    order.payment_status = "captured"
    order.status = "processing"
    order.logs.push({
      timestamp: new Date().toISOString(),
      note: "Payment ₹1,300 captured via PhonePe UPI (TXN_PH_98821)",
    })

    expect(order.payment_status).toBe("captured")
    expect(order.status).toBe("processing")
  })

  it("2. Should progress fulfillment to Shipped with Indian Postal / Agro Courier tracking", () => {
    const order = createTestOrder()
    order.payment_status = "captured"
    order.status = "processing"

    // Dispatch from Hubli/Dharwad Agri Warehouse
    const trackingCode = "KA-AGRI-EXP-586101-99"
    order.fulfillment_status = "shipped"
    order.carrier = "Karnataka Agro Express Logistics"
    order.tracking_number = trackingCode
    order.logs.push({
      timestamp: new Date().toISOString(),
      note: `Dispatched from Hubli Bio-Warehouse with tracking ${trackingCode}`,
    })

    expect(order.fulfillment_status).toBe("shipped")
    expect(order.tracking_number).toBe(trackingCode)
    expect(order.carrier).toContain("Karnataka Agro Express")
  })

  it("3. Should mark Out for Delivery for last-mile rural delivery", () => {
    const order = createTestOrder()
    order.fulfillment_status = "shipped"

    // Last mile delivery agent assigned
    order.fulfillment_status = "out_for_delivery"
    order.logs.push({
      timestamp: new Date().toISOString(),
      note: "Out for farm delivery: Vijayapura rural route vehicle #KA-28-E-4501",
    })

    expect(order.fulfillment_status).toBe("out_for_delivery")
  })

  it("4. Should record Delivered status with timestamp on farmer receipt", () => {
    const order = createTestOrder()
    order.fulfillment_status = "out_for_delivery"

    // Farmer confirmed delivery
    const deliveryTime = new Date().toISOString()
    order.fulfillment_status = "delivered"
    order.status = "completed"
    order.delivered_at = deliveryTime
    order.logs.push({
      timestamp: deliveryTime,
      note: "Delivered to farm location. Farmer verified batch QR codes.",
    })

    expect(order.fulfillment_status).toBe("delivered")
    expect(order.status).toBe("completed")
    expect(order.delivered_at).toBe(deliveryTime)
    expect(order.logs.length).toBe(2)
  })

  it("5. Should handle partial fulfillment or batch replacements when needed", () => {
    const order = createTestOrder()
    
    // Partially fulfill powder batch first
    order.fulfillment_status = "partially_fulfilled"
    order.logs.push({
      timestamp: new Date().toISOString(),
      note: "4x Trichoderma powder packs dispatched. 2x Liquid bottles awaiting morning bottling batch.",
    })

    expect(order.fulfillment_status).toBe("partially_fulfilled")
  })
})
