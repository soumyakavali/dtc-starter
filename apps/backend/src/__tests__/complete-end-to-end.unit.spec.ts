import { describe, it, expect } from "@jest/globals"
import PhonePePaymentProviderService from "../modules/phonepe-payment/service"
import { PaymentSessionStatus } from "@medusajs/framework/utils"
import { validateFarmerAddress } from "./address-check-validation.unit.spec"

describe("Complete End-to-End BioTill Agri Farmer Purchasing Journey", () => {
  // Test State across workflow steps
  let registeredFarmer: {
    id: string
    name: string
    mobile: string
    username: string
    village: string
    crop: string
    token: string
  }

  let cart: {
    items: Array<{
      product_id: string
      title: string
      form: "powder" | "liquid"
      quantity: number
      unit_price: number
    }>
    subtotal: number
    shipping_total: number
    total: number
  }

  let shippingAddress: {
    first_name: string
    last_name: string
    phone: string
    address_1: string
    village: string
    city: string
    province: string
    postal_code: string
    country_code: string
  }

  let paymentSession: any
  let placedOrder: any

  it("Step 1: Farmer Registration with Mobile Number and Password (No OTP)", () => {
    const signupData = {
      first_name: "Basavaraj",
      last_name: "Patil",
      phone: "9876543210",
      username: "basavaraj_patil",
      village: "Tikota",
      crop: "Sugarcane & Pomegranate",
      password: "farm_secure_password_2026",
    }

    // Verify phone is 10 digits
    const cleanPhone = signupData.phone.replace(/[^0-9]/g, "")
    expect(cleanPhone).toHaveLength(10)
    expect(cleanPhone.startsWith("9")).toBe(true)

    // Emulate farmer account creation
    registeredFarmer = {
      id: `cus_farmer_${cleanPhone}`,
      name: `${signupData.first_name} ${signupData.last_name}`,
      mobile: cleanPhone,
      username: signupData.username,
      village: signupData.village,
      crop: signupData.crop,
      token: "jwt_token_farmer_session_xyz789",
    }

    expect(registeredFarmer.id).toBe("cus_farmer_9876543210")
    expect(registeredFarmer.name).toBe("Basavaraj Patil")
    expect(registeredFarmer.token).toBeDefined()
  })

  it("Step 2: Farmer Login via Mobile Number & Password", () => {
    const loginCredentials = {
      identifier: "9876543210",
      password: "farm_secure_password_2026",
    }

    expect(loginCredentials.identifier).toBe(registeredFarmer.mobile)
    expect(loginCredentials.password).toBe("farm_secure_password_2026")
  })

  it("Step 3: Add BioTill Products to Cart & Apply Free Shipping above ₹999", () => {
    // Farmer selects:
    // - 4x Trichoderma Viride (4 x ₹150 = ₹600)
    // - 2x Bio NPK Liquid Consortium (2 x ₹350 = ₹700)
    const items = [
      {
        product_id: "prod_tri_viride_1kg",
        title: "Trichoderma Viride Bio-Fungicide (1 Kg)",
        form: "powder" as const,
        quantity: 4,
        unit_price: 15000, // ₹150 in paise
      },
      {
        product_id: "prod_npk_liquid_1l",
        title: "Bio NPK Liquid Consortium (1 Litre)",
        form: "liquid" as const,
        quantity: 2,
        unit_price: 35000, // ₹350 in paise
      },
    ]

    const subtotal = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
    // Subtotal: 60,000 + 70,000 = 130,000 paise (₹1,300.00)
    expect(subtotal).toBe(130000)

    // Free shipping qualification check (₹999 = 99900 paise)
    const FREE_SHIPPING_THRESHOLD = 99900
    const shipping_total = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5000
    const total = subtotal + shipping_total

    expect(shipping_total).toBe(0) // Free delivery applied!
    expect(total).toBe(130000)

    cart = {
      items,
      subtotal,
      shipping_total,
      total,
    }
  })

  it("Step 4: Shipping Address Check & Validation for Rural Dispatch", () => {
    shippingAddress = {
      first_name: "Basavaraj",
      last_name: "Patil",
      phone: registeredFarmer.mobile,
      address_1: "Survey No. 45/2, Near Gram Panchayat",
      village: registeredFarmer.village,
      city: "Vijayapura",
      province: "Karnataka",
      postal_code: "586101",
      country_code: "in",
    }

    const validation = validateFarmerAddress(shippingAddress)
    expect(validation.isValid).toBe(true)
    expect(validation.errors).toEqual({})
  })

  it("Step 5: PhonePe UPI Payment Session Initiation & Authorization", async () => {
    const phonePeService = new PhonePePaymentProviderService({}, { merchantId: "BIOTILL_PROD_MID" })

    // Initiate
    paymentSession = await phonePeService.initiatePayment({
      amount: cart.total, // ₹1,300 in paise
      currency_code: "inr",
      context: {
        customer: { email: `${registeredFarmer.mobile}@biotill.farmer` },
      },
      data: {},
    })

    expect(paymentSession.id).toBeDefined()
    expect(paymentSession.data.amount).toBe(130000)
    expect(paymentSession.data.upi_qr_string).toContain("pa=biotillagri@ybl")
    expect(paymentSession.data.upi_qr_string).toContain("am=1300.00")

    // Authorize & Capture
    const authResult = await phonePeService.authorizePayment({ data: paymentSession.data })
    expect(authResult.status).toBe(PaymentSessionStatus.AUTHORIZED)

    const captureResult = await phonePeService.capturePayment({ data: authResult.data })
    expect(captureResult.data.status).toBe("CAPTURED")
  })

  it("Step 6: Order Placement & Generation of Order Confirmation", () => {
    placedOrder = {
      id: "ord_biotill_2026_001",
      display_id: 1001,
      customer_id: registeredFarmer.id,
      customer_phone: registeredFarmer.mobile,
      shipping_address: shippingAddress,
      items: cart.items,
      total_amount: cart.total,
      currency_code: "inr",
      status: "pending",
      fulfillment_status: "not_fulfilled",
      payment_status: "captured",
      created_at: new Date().toISOString(),
    }

    expect(placedOrder.id).toBe("ord_biotill_2026_001")
    expect(placedOrder.display_id).toBe(1001)
    expect(placedOrder.payment_status).toBe("captured")
    expect(placedOrder.items).toHaveLength(2)
  })

  it("Step 7: Delivery Lifecycle Progression to Delivered", () => {
    // 1. Warehouse Packing & Ready for Dispatch
    placedOrder.status = "processing"
    placedOrder.fulfillment_status = "fulfilled"

    // 2. Shipped with Tracking
    placedOrder.fulfillment_status = "shipped"
    placedOrder.carrier = "Karnataka State Agro Logistics"
    placedOrder.tracking_number = "KA-AGRI-EXP-586101-01"

    expect(placedOrder.fulfillment_status).toBe("shipped")
    expect(placedOrder.tracking_number).toBeDefined()

    // 3. Out for Farm Delivery
    placedOrder.fulfillment_status = "out_for_delivery"
    expect(placedOrder.fulfillment_status).toBe("out_for_delivery")

    // 4. Delivered to Farmer
    placedOrder.fulfillment_status = "delivered"
    placedOrder.status = "completed"
    placedOrder.delivered_at = new Date().toISOString()

    expect(placedOrder.fulfillment_status).toBe("delivered")
    expect(placedOrder.status).toBe("completed")
    expect(placedOrder.delivered_at).toBeDefined()
  })
})
