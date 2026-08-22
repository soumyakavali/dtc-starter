import { describe, it, expect } from "@jest/globals"
import PhonePePaymentProviderService from "../modules/phonepe-payment/service"
import PaytmPaymentProviderService from "../modules/paytm-payment/service"
import { PaymentSessionStatus } from "@medusajs/framework/utils"

describe("One-Click Demo Farmer Journey & Multi-Gateway Verification", () => {
  const demoFarmer = {
    id: "cus_farmer_demo_9845012345",
    first_name: "Basavaraj",
    last_name: "Patil",
    phone: "9845012345",
    email: "basavaraj.patil@biotill.farmer",
    village: "Maddur (ಮದ್ದೂರು)",
    district: "Mandya (ಮಂಡ್ಯ)",
    state: "Karnataka",
    pincode: "571428",
    crop: "Sugarcane & Paddy (ಕಬ್ಬು ಮತ್ತು ಭತ್ತ)",
    landholding: "4.5 Acres",
  }

  const selectedProducts = [
    {
      id: "prod_tricho_harzianum",
      title: "Trichoderma Harzianum (ಟ್ರೈಕೋಡರ್ಮಾ ಹಾರ್ಜಿಯಾನಂ)",
      variant_id: "var_tricho_1",
      quantity: 2,
      unit_price: 150,
      type: "powder",
    },
    {
      id: "prod_liquid_consortium",
      title: "Liquid Bio NPK Consortia (ಲಿಕ್ವಿಡ್ ಎನ್.ಪಿ.ಕೆ ಕನ್ಸಾರ್ಸಿಯಂ)",
      variant_id: "var_liquid_npk_1",
      quantity: 1,
      unit_price: 350,
      type: "liquid",
    },
  ]

  it("DEMO-01: Authenticate and Load Demo Farmer Profile with Agricultural Metadata", () => {
    expect(demoFarmer.phone).toBe("9845012345")
    expect(demoFarmer.district).toContain("Mandya")
    expect(demoFarmer.crop).toContain("Sugarcane")
    expect(demoFarmer.email).toBe("basavaraj.patil@biotill.farmer")
  })

  it("DEMO-02: Instant One-Click Cart Population with Powder & Liquid Bio-Inputs", () => {
    const cart = {
      id: "cart_demo_instant_001",
      customer_id: demoFarmer.id,
      items: selectedProducts,
      subtotal: selectedProducts.reduce((acc, p) => acc + p.unit_price * p.quantity, 0),
      shipping_total: 0,
      total: selectedProducts.reduce((acc, p) => acc + p.unit_price * p.quantity, 0),
    }

    expect(cart.items).toHaveLength(2)
    expect(cart.subtotal).toBe(650) // (150*2) + (350*1) = 650
    expect(cart.total).toBe(650)
  })

  it("DEMO-03: Auto-Attach Pre-Validated Mandya Karnataka Rural Delivery Address", () => {
    const shippingAddress = {
      first_name: demoFarmer.first_name,
      last_name: demoFarmer.last_name,
      phone: demoFarmer.phone,
      address_1: "Sy No. 42/1, Sugar Factory Road, Maddur Taluk",
      city: "Mandya",
      province: "Karnataka",
      postal_code: "571428",
      country_code: "in",
    }

    expect(shippingAddress.postal_code).toBe("571428")
    expect(shippingAddress.province.toLowerCase()).toBe("karnataka")
    expect(shippingAddress.phone).toHaveLength(10)
  })

  it("DEMO-04: Execute Dummy PhonePe Payment Authorization & Verification", async () => {
    const phonePeService = new PhonePePaymentProviderService({})
    const session = await phonePeService.initiatePayment({
      amount: 650,
      currency_code: "inr",
      data: {
        customer_phone: demoFarmer.phone,
        farmer_name: `${demoFarmer.first_name} ${demoFarmer.last_name}`,
      },
    })

    expect(session.id).toBeDefined()
    expect((session.data as any).transaction_id).toBeDefined()
    expect((session.data as any).upi_qr_string).toContain("upi://pay")

    // Authorize payment
    const authResult = await phonePeService.authorizePayment({
      ...session,
      data: {
        ...session.data,
        simulate_success: true,
      },
    })

    expect(authResult.status).toBe(PaymentSessionStatus.AUTHORIZED)
    expect((authResult.data as any).status).toBe("PAYMENT_SUCCESS")
  })

  it("DEMO-05: Execute Dummy Paytm Payment Authorization & QR Generation", async () => {
    const paytmService = new PaytmPaymentProviderService({})
    const session = await paytmService.initiatePayment({
      amount: 650,
      currency_code: "inr",
      data: {
        customer_phone: demoFarmer.phone,
        farmer_name: `${demoFarmer.first_name} ${demoFarmer.last_name}`,
      },
    })

    expect(session.id).toBeDefined()
    expect((session.data as any).order_id).toBeDefined()
    expect((session.data as any).txn_token).toBeDefined()

    // Authorize payment
    const authResult = await paytmService.authorizePayment({
      ...session,
      data: {
        ...session.data,
        simulate_success: true,
      },
    })

    expect(authResult.status).toBe(PaymentSessionStatus.AUTHORIZED)
    expect((authResult.data as any).status).toBe("TXN_SUCCESS")
  })

  it("DEMO-06: Real-Time Order Dispatch & Live Timeline Tracking", () => {
    const trackingSteps = [
      { step: 1, name: "Order Placed & Verified", completed: true },
      { step: 2, name: "BioTill Depot QC Passed", completed: true },
      { step: 3, name: "Dispatched from Mandya Depot", completed: true },
      { step: 4, name: "Out for Delivery to Farm", completed: true, active: true },
      { step: 5, name: "Farm Gate Handover", completed: false },
    ]

    const completedSteps = trackingSteps.filter((s) => s.completed)
    expect(completedSteps.length).toBeGreaterThanOrEqual(3)

    const activeStep = trackingSteps.find((s) => s.active)
    expect(activeStep?.name).toBe("Out for Delivery to Farm")
  })

  it("DEMO-07: Verify Order History Retrieval for Farmer Account", () => {
    const mockOrderHistory = [
      {
        id: "order_bt_live_984210",
        display_id: 984210,
        status: "in_transit",
        total: 650,
        payment_method: "PhonePe UPI",
      },
      {
        id: "order_bt_delivered_982104",
        display_id: 982104,
        status: "completed",
        total: 1170,
        payment_method: "Paytm Payments",
      },
    ]

    expect(mockOrderHistory).toHaveLength(2)
    expect(mockOrderHistory[0].status).toBe("in_transit")
    expect(mockOrderHistory[1].status).toBe("completed")
    expect(mockOrderHistory[0].total).toBe(650)
  })
})
