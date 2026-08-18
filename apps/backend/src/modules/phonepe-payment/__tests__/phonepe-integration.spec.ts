import { describe, it, expect } from "@jest/globals"
import PhonePePaymentProviderService from "../service"
import { PaymentSessionStatus } from "@medusajs/framework/utils"

describe("PhonePe Payment Module Integration Tests", () => {
  const service = new PhonePePaymentProviderService({}, {
    merchantId: "BIOTILL_LIVE_MID",
    saltKey: "test_salt_key",
    saltIndex: 1,
    env: "UAT",
  })

  it("should successfully initiate UPI QR Payment Session for Farmer Order", async () => {
    const session = await service.initiatePayment({
      amount: 145000, // ₹1,450.00
      currency_code: "inr",
      context: {
        customer: { email: "9876543210@biotill.farmer" },
      },
      data: {},
    })

    expect(session.id).toBeDefined()
    expect(session.data.amount).toBe(145000)
    expect(session.data.upi_qr_string).toContain("pa=biotillagri@ybl")
    expect(session.data.upi_qr_string).toContain("am=1450.00")
  })

  it("should authorize payment session", async () => {
    const sessionData = {
      id: "TXN_INT_1001",
      amount: 145000,
      status: "PAYMENT_INITIATED",
    }

    const auth = await service.authorizePayment({ data: sessionData })
    expect(auth.status).toBe(PaymentSessionStatus.AUTHORIZED)
    expect(auth.data.status).toBe("PAYMENT_SUCCESS")
  })

  it("should capture authorized payment and record transaction ID", async () => {
    const authData = {
      id: "TXN_INT_1001",
      amount: 145000,
      status: "PAYMENT_SUCCESS",
    }

    const capture = await service.capturePayment({ data: authData })
    expect(capture.data.status).toBe("CAPTURED")
    expect(capture.data.amount).toBe(145000)
  })

  it("should handle payment cancellation cleanly", async () => {
    const authData = {
      id: "TXN_INT_1001",
      amount: 145000,
      status: "PAYMENT_INITIATED",
    }

    const cancel = await service.cancelPayment({ data: authData })
    expect(cancel.data.status).toBe("CANCELLED")
  })
})
