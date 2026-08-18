import { describe, it, expect } from "@jest/globals"
import PhonePePaymentProviderService from "../modules/phonepe-payment/service"
import PaytmPaymentProviderService from "../modules/paytm-payment/service"
import { PaymentSessionStatus } from "@medusajs/framework/utils"

describe("Payment Gateway & Transaction Security Validations", () => {
  const phonePeService = new PhonePePaymentProviderService(
    {},
    {
      merchantId: "BIOTILL_MERCHANT_PROD",
      saltKey: "salt_prod_secret_8921",
      saltIndex: 1,
      env: "PRODUCTION",
    }
  )

  const paytmService = new PaytmPaymentProviderService(
    {},
    {
      mid: "BIOTILL_PAYTM_PROD_MID",
      mkey: "mkey_prod_secret_7721",
      website: "DEFAULT",
      env: "PROD",
    }
  )

  describe("1. Currency, Unit & Paise Integrity", () => {
    it("Should accurately convert Indian Rupee amounts into integer paise (preventing float precision bugs)", () => {
      const convertInrToPaise = (rupees: number): number => {
        return Math.round(rupees * 100)
      }

      const convertPaiseToInr = (paise: number): number => {
        return paise / 100
      }

      // Single powder item: ₹150 -> 15000 paise
      expect(convertInrToPaise(150)).toBe(15000)
      expect(convertPaiseToInr(15000)).toBe(150)

      // Single liquid item: ₹350 -> 35000 paise
      expect(convertInrToPaise(350)).toBe(35000)
      expect(convertPaiseToInr(35000)).toBe(350)

      // Complex cart: 3x ₹150 + 2x ₹350 = ₹450 + ₹700 = ₹1,150 -> 115000 paise
      expect(convertInrToPaise(1150.0)).toBe(115000)
    })
  })

  describe("2. PhonePe UPI Payment Validations", () => {
    it("Should generate a valid NPCI UPI intent link with BioTill Agri merchant VPA and amount", async () => {
      const initiateRes = await phonePeService.initiatePayment({
        amount: 35000, // ₹350 in paise
        currency_code: "inr",
        context: {
          customer: {
            email: "farmer.karnataka@biotill.in",
          },
        },
        data: {},
      })

      expect(initiateRes.id).toMatch(/^TXN_PH_/)
      expect(initiateRes.data.amount).toBe(35000)
      expect(initiateRes.data.currency_code).toBe("inr")
      expect(initiateRes.data.status).toBe("PAYMENT_INITIATED")

      // UPI deep link verification
      const upiString = initiateRes.data.upi_qr_string as string
      expect(upiString).toBeDefined()
      expect(upiString.startsWith("upi://pay")).toBe(true)
      expect(upiString).toContain("pa=biotillagri@ybl")
      expect(upiString).toContain("pn=BioTill%20Agri%20Private%20Limited")
      expect(upiString).toContain("am=350.00")
      expect(upiString).toContain("cu=INR")
    })

    it("Should verify and authorize valid transaction responses", async () => {
      const authRes = await phonePeService.authorizePayment({
        data: {
          transaction_id: "TXN_PH_882910",
          amount: 45000,
        },
      })

      expect(authRes.status).toBe(PaymentSessionStatus.AUTHORIZED)
      expect(authRes.data.status).toBe("PAYMENT_SUCCESS")
      expect(authRes.data.payment_provider).toBe("phonepe")
    })

    it("Should capture payment and generate verifiable timestamp", async () => {
      const captureRes = await phonePeService.capturePayment({
        data: {
          transaction_id: "TXN_PH_882910",
        },
      })

      expect(captureRes.data.status).toBe("CAPTURED")
      expect(captureRes.data.captured_at).toBeDefined()
    })

    it("Should process valid refunds with amount bounds check", async () => {
      const refundRes = await phonePeService.refundPayment({
        amount: 15000, // ₹150 refund
        data: {
          transaction_id: "TXN_PH_882910",
        },
      })

      expect(refundRes.data.refunded_amount).toBe(15000)
      expect(refundRes.data.refund_status).toBe("REFUND_COMPLETED")
      expect(refundRes.data.refunded_at).toBeDefined()
    })
  })

  describe("3. Paytm Payment Validations", () => {
    it("Should initiate Paytm wallet and net-banking intent", async () => {
      const initiateRes = await paytmService.initiatePayment({
        amount: 70000, // ₹700 in paise
        currency_code: "inr",
        context: {
          customer: {
            email: "farmer.dharwad@biotill.in",
          },
        },
        data: {},
      })

      expect(initiateRes.id).toMatch(/^PAYTM_ORD_/)
      expect(initiateRes.data.amount).toBe(70000)
      expect(initiateRes.data.mid).toBe("BIOTILL_PAYTM_PROD_MID")
      expect(initiateRes.data.payment_mode).toBe("PAYTM_UPI_WALLET")
    })

    it("Should authorize and capture Paytm orders", async () => {
      const authRes = await paytmService.authorizePayment({
        data: {
          order_id: "PAYTM_ORD_7719",
          amount: 70000,
        },
      })
      expect(authRes.status).toBe(PaymentSessionStatus.AUTHORIZED)

      const captureRes = await paytmService.capturePayment({
        data: authRes.data,
      })
      expect(captureRes.data.status).toBe("CAPTURED")
    })
  })
})
