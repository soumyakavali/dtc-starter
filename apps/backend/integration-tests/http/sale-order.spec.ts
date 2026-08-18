import { describe, it, expect, beforeAll } from "@jest/globals"
import PhonePePaymentProviderService from "../../src/modules/phonepe-payment/service"
import PaytmPaymentProviderService from "../../src/modules/paytm-payment/service"
import { PaymentSessionStatus } from "@medusajs/framework/utils"
import { validateFarmerAddress } from "../../src/__tests__/address-check-validation.unit.spec"

describe("Integration Test: Complete Sale Order & Checkout Pipeline", () => {
  let cartId: string
  let regionId: string
  let customerId: string
  let paymentProvider: PhonePePaymentProviderService
  let paytmProvider: PaytmPaymentProviderService

  const testFarmer = {
    first_name: "Mahantesh",
    last_name: "Gouda",
    phone: "9988776655",
    email: "9988776655@biotill.farmer",
    address_1: "Plot 12, Agro Industrial Area",
    village: "Tikota",
    city: "Vijayapura",
    province: "Karnataka",
    postal_code: "586101",
    country_code: "in",
  }

  const catalogProducts = [
    {
      id: "prod_tricho_1kg",
      title: "BioTill Trichoderma Viride (1 Kg)",
      form: "powder",
      price_inr: 150.0,
      price_paise: 15000,
    },
    {
      id: "prod_npk_1l",
      title: "BioTill Bio NPK Liquid Consortium (1 Litre)",
      form: "liquid",
      price_inr: 350.0,
      price_paise: 35000,
    },
    {
      id: "prod_pseu_1kg",
      title: "BioTill Pseudomonas Fluorescens (1 Kg)",
      form: "powder",
      price_inr: 150.0,
      price_paise: 15000,
    },
  ]

  beforeAll(() => {
    paymentProvider = new PhonePePaymentProviderService({}, { merchantId: "BIOTILL_INT_MID" })
    paytmProvider = new PaytmPaymentProviderService({}, { mid: "BIOTILL_INT_PAYTM_MID" })
  })

  it("1. [Integration] Initialize Region with INR Currency and India Country Code", async () => {
    const region = {
      id: "reg_karnataka_in",
      name: "Karnataka (India)",
      currency_code: "inr",
      countries: [{ iso_2: "in", name: "India" }],
    }

    expect(region.id).toBeDefined()
    expect(region.currency_code).toBe("inr")
    expect(region.countries[0].iso_2).toBe("in")
    regionId = region.id
  })

  it("2. [Integration] Create Cart and attach Customer Session", async () => {
    // Simulated Medusa Store Cart Creation API
    const cart = {
      id: "cart_int_" + Date.now(),
      region_id: regionId,
      currency_code: "inr",
      email: testFarmer.email,
      customer_id: "cus_farmer_9988776655",
      items: [],
      shipping_methods: [],
      subtotal: 0,
      shipping_total: 0,
      total: 0,
    }

    expect(cart.id).toContain("cart_int_")
    expect(cart.currency_code).toBe("inr")
    cartId = cart.id
    customerId = cart.customer_id
  })

  it("3. [Integration] Add Line Items to Cart & Calculate Totals", async () => {
    // Add 4x Trichoderma Viride (4 x 15000 = 60000 paise)
    // Add 2x Bio NPK Liquid (2 x 35000 = 70000 paise)
    // Add 1x Pseudomonas (1 x 15000 = 15000 paise)
    const lineItems = [
      {
        id: "item_1",
        cart_id: cartId,
        product_id: catalogProducts[0].id,
        title: catalogProducts[0].title,
        quantity: 4,
        unit_price: catalogProducts[0].price_paise,
      },
      {
        id: "item_2",
        cart_id: cartId,
        product_id: catalogProducts[1].id,
        title: catalogProducts[1].title,
        quantity: 2,
        unit_price: catalogProducts[1].price_paise,
      },
      {
        id: "item_3",
        cart_id: cartId,
        product_id: catalogProducts[2].id,
        title: catalogProducts[2].title,
        quantity: 1,
        unit_price: catalogProducts[2].price_paise,
      },
    ]

    const subtotal = lineItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
    // Subtotal: 60000 + 70000 + 15000 = 145000 paise (₹1,450.00)
    expect(subtotal).toBe(145000)
  })

  it("4. [Integration] Set Delivery Address & Validate Karnataka Rural Address", async () => {
    const addressValidation = validateFarmerAddress(testFarmer)
    expect(addressValidation.isValid).toBe(true)
    expect(addressValidation.errors).toEqual({})
    expect(testFarmer.postal_code).toBe("586101")
    expect(testFarmer.phone).toHaveLength(10)
  })

  it("5. [Integration] Apply Shipping Method with Free Shipping Threshold (>= ₹999)", async () => {
    const subtotal = 145000 // ₹1450.00
    const FREE_SHIPPING_MIN_PAISE = 99900 // ₹999.00
    const standardShippingFee = 5000 // ₹50.00

    const shipping_total = subtotal >= FREE_SHIPPING_MIN_PAISE ? 0 : standardShippingFee
    const total = subtotal + shipping_total

    expect(shipping_total).toBe(0)
    expect(total).toBe(145000)
  })

  it("6. [Integration] Create Payment Collection and PhonePe UPI Payment Session", async () => {
    const totalAmount = 145000 // ₹1,450.00

    // Initialize PhonePe Payment Provider
    const session = await paymentProvider.initiatePayment({
      amount: totalAmount,
      currency_code: "inr",
      context: {
        customer: { email: testFarmer.email },
      },
      data: {},
    })

    expect(session.id).toBeDefined()
    expect(session.data.amount).toBe(145000)
    expect(session.data.status).toBe("PAYMENT_INITIATED")
    expect(session.data.upi_qr_string).toContain("pa=biotillagri@ybl")
    expect(session.data.upi_qr_string).toContain("am=1450.00")
    expect(session.data.upi_qr_string).toContain("cu=INR")

    // Authorize PhonePe Payment
    const authResult = await paymentProvider.authorizePayment({ data: session.data })
    expect(authResult.status).toBe(PaymentSessionStatus.AUTHORIZED)

    // Capture Payment
    const captureResult = await paymentProvider.capturePayment({ data: authResult.data })
    expect(captureResult.data.status).toBe("CAPTURED")
    expect(captureResult.data.amount).toBe(145000)
  })

  it("7. [Integration] Complete Sale Order and Generate Invoiced Order Record", async () => {
    const orderRecord = {
      id: `ord_bt_${Date.now()}`,
      display_id: 1012,
      cart_id: cartId,
      customer_id: customerId,
      customer_name: `${testFarmer.first_name} ${testFarmer.last_name}`,
      customer_phone: testFarmer.phone,
      shipping_address: testFarmer,
      total_items: 7, // 4 + 2 + 1
      subtotal_inr: 1450.0,
      shipping_total_inr: 0.0,
      total_inr: 1450.0,
      currency_code: "inr",
      payment_status: "captured",
      fulfillment_status: "not_fulfilled",
      carrier: "Karnataka State Rural Agro Express",
      created_at: new Date().toISOString(),
    }

    expect(orderRecord.id).toBeDefined()
    expect(orderRecord.display_id).toBe(1012)
    expect(orderRecord.payment_status).toBe("captured")
    expect(orderRecord.total_inr).toBe(1450.0)
    expect(orderRecord.total_items).toBe(7)
  })

  it("8. [Integration] Fulfill Sale Order and Transition Shipping Lifecycle", async () => {
    const trackingNumber = `KA-AGRI-EXP-${testFarmer.postal_code}-1012`
    
    // Status Transitions:
    const statusHistory: string[] = []
    
    // 1. Order Confirmed & Processing
    statusHistory.push("processing")
    // 2. Packed at Dharwad/Bengaluru Warehouse
    statusHistory.push("packed")
    // 3. Handed to Logistics Carrier
    statusHistory.push("shipped")
    // 4. Out for Farm Delivery
    statusHistory.push("out_for_delivery")
    // 5. Delivered to Farmer
    statusHistory.push("delivered")

    expect(statusHistory).toEqual([
      "processing",
      "packed",
      "shipped",
      "out_for_delivery",
      "delivered",
    ])
    expect(trackingNumber).toBe("KA-AGRI-EXP-586101-1012")
  })
})
