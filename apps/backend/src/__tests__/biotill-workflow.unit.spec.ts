import PhonePePaymentProviderService from "../modules/phonepe-payment/service"
import PaytmPaymentProviderService from "../modules/paytm-payment/service"
import { PaymentSessionStatus } from "@medusajs/framework/utils"

describe("BioTill Agri End-to-End E-Commerce Workflow", () => {
  // 1. BioTill Product Catalog definition
  const BIOTILL_CATALOG = [
    // Powder Products (₹150)
    { id: "prod_tri_viride_1kg", title: "Trichoderma Viride Bio-Fungicide", form: "powder", price: 15000 },
    { id: "prod_pseudo_fluor_1kg", title: "Pseudomonas Fluorescens Bio-Bactericide", form: "powder", price: 15000 },
    { id: "prod_meta_anis_1kg", title: "Metarhizium Anisopliae Bio-Insecticide", form: "powder", price: 15000 },
    { id: "prod_vam_myco_1kg", title: "VAM Mycorrhiza Bio-Fertilizer", form: "powder", price: 15000 },
    { id: "prod_paecil_1kg", title: "Paecilomyces Lilacinus Bio-Nematicide", form: "powder", price: 15000 },
    { id: "prod_compost_cult_1kg", title: "Compost Culture Bio-Decomposer", form: "powder", price: 15000 },
    // Liquid Products (₹350)
    { id: "prod_tri_liquid_1l", title: "Trichoderma Liquid Concentrate", form: "liquid", price: 35000 },
    { id: "prod_pseudo_liquid_1l", title: "Pseudomonas Fluorescens Liquid", form: "liquid", price: 35000 },
    { id: "prod_meta_liquid_1l", title: "Metarhizium Liquid Concentrate", form: "liquid", price: 35000 },
    { id: "prod_npk_liquid_1l", title: "Bio NPK Liquid Consortium", form: "liquid", price: 35000 },
  ]

  it("Step 1: should verify complete catalog of 10 BioTill Agri products with fixed pricing", () => {
    expect(BIOTILL_CATALOG).toHaveLength(10)

    const powderProducts = BIOTILL_CATALOG.filter((p) => p.form === "powder")
    const liquidProducts = BIOTILL_CATALOG.filter((p) => p.form === "liquid")

    expect(powderProducts).toHaveLength(6)
    powderProducts.forEach((p) => {
      expect(p.price).toBe(15000) // ₹150 in paise
    })

    expect(liquidProducts).toHaveLength(4)
    liquidProducts.forEach((p) => {
      expect(p.price).toBe(35000) // ₹350 in paise
    })
  })

  it("Step 2: should calculate cart totals with shipping fee and free shipping above ₹999", () => {
    const calculateCartTotal = (items: Array<{ price: number; quantity: number }>) => {
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const shipping = subtotal >= 99900 ? 0 : 5000 // Free shipping threshold ₹999
      const total = subtotal + shipping
      return { subtotal, shipping, total }
    }

    // Case A: 2 Powder items = ₹300 (< ₹999, + ₹50 shipping = ₹350)
    const cartA = calculateCartTotal([{ price: 15000, quantity: 2 }])
    expect(cartA.subtotal).toBe(30000)
    expect(cartA.shipping).toBe(5000)
    expect(cartA.total).toBe(35000)

    // Case B: 3 Liquid items = ₹1,050 (>= ₹999, free shipping)
    const cartB = calculateCartTotal([{ price: 35000, quantity: 3 }])
    expect(cartB.subtotal).toBe(105000)
    expect(cartB.shipping).toBe(0)
    expect(cartB.total).toBe(105000)
  })

  it("Step 3: should handle farmer shipping address validation (Karnataka PIN codes & phone)", () => {
    const validateFarmerAddress = (address: {
      first_name: string
      last_name: string
      address_1: string
      city: string
      province: string
      postal_code: string
      phone: string
    }) => {
      const phoneRegex = /^[6-9]\d{9}$/
      const pinRegex = /^\d{6}$/

      if (!address.first_name || !address.address_1 || !address.city) return false
      if (!phoneRegex.test(address.phone)) return false
      if (!pinRegex.test(address.postal_code)) return false
      return true
    }

    const validFarmer = {
      first_name: "Basavaraj",
      last_name: "Patil",
      address_1: "Farm Plot No. 14, Bagalkot Road",
      city: "Vijayapura",
      province: "Karnataka",
      postal_code: "586101",
      phone: "9876543210",
    }

    expect(validateFarmerAddress(validFarmer)).toBe(true)

    const invalidPhoneFarmer = {
      ...validFarmer,
      phone: "12345",
    }
    expect(validateFarmerAddress(invalidPhoneFarmer)).toBe(false)
  })

  it("Step 4: should complete end-to-end PhonePe UPI payment session and order capture", async () => {
    const phonePeService = new PhonePePaymentProviderService({}, { merchantId: "BIOTILL_TEST_MID" })

    // 1. Initiate PhonePe Payment
    const session = await phonePeService.initiatePayment({
      amount: 45000, // ₹450 (3 x ₹150)
      currency_code: "inr",
      context: {
        customer: { email: "farmer.karnataka@biotill.in" },
      },
      data: {},
    })

    expect(session.id).toBeDefined()
    expect(session.data.upi_qr_string).toContain("pa=biotillagri@ybl")

    // 2. Authorize
    const authResult = await phonePeService.authorizePayment({
      data: session.data,
    })
    expect(authResult.status).toBe(PaymentSessionStatus.AUTHORIZED)

    // 3. Capture
    const captureResult = await phonePeService.capturePayment({
      data: authResult.data,
    })
    expect(captureResult.data.status).toBe("CAPTURED")

    // 4. Verify Final Status
    const finalStatus = await phonePeService.getPaymentStatus({
      data: captureResult.data,
    })
    expect(finalStatus.status).toBe(PaymentSessionStatus.CAPTURED)
  })

  it("Step 5: should complete end-to-end Paytm payment session and order capture", async () => {
    const paytmService = new PaytmPaymentProviderService({}, { mid: "BIOTILL_PAYTM_MID" })

    // 1. Initiate Paytm Payment
    const session = await paytmService.initiatePayment({
      amount: 70000, // ₹700 (2 x ₹350)
      currency_code: "inr",
      context: {
        customer: { email: "farmer.dharwad@biotill.in" },
      },
      data: {},
    })

    expect(session.id).toBeDefined()
    expect(session.data.payment_mode).toBe("PAYTM_UPI_WALLET")

    // 2. Authorize & Capture
    const authResult = await paytmService.authorizePayment({ data: session.data })
    expect(authResult.status).toBe(PaymentSessionStatus.AUTHORIZED)

    const captureResult = await paytmService.capturePayment({ data: authResult.data })
    expect(captureResult.data.status).toBe("CAPTURED")
  })
})
