import { describe, it, expect } from "@jest/globals"
import PaytmPaymentProviderService from "../service"
import { PaymentSessionStatus } from "@medusajs/framework/utils"

describe("Paytm Payment Module Integration Tests", () => {
  const service = new PaytmPaymentProviderService({}, {
    mid: "BIOTILL_PAYTM_STAGE_MID",
    mkey: "test_mkey_123",
    website: "WEBSTAGING",
    env: "STAGE",
  })

  it("should initialize Paytm QR Payment session", async () => {
    const session = await service.initiatePayment({
      amount: 145000,
      currency_code: "inr",
      context: {
        customer: { email: "9876543210@biotill.farmer" },
      },
      data: {},
    })

    expect(session.id).toBeDefined()
    expect(session.data.amount).toBe(145000)
    expect(session.data.status).toBe("TXN_INITIATED")
    expect(session.data.mid).toBe("BIOTILL_PAYTM_STAGE_MID")
  })

  it("should authorize and capture Paytm payment", async () => {
    const sessionData = {
      order_id: "PAYTM_ORD_1002",
      amount: 145000,
      status: "TXN_INITIATED",
    }

    const auth = await service.authorizePayment({ data: sessionData })
    expect(auth.status).toBe(PaymentSessionStatus.AUTHORIZED)
    expect(auth.data.status).toBe("TXN_SUCCESS")

    const capture = await service.capturePayment({ data: auth.data })
    expect(capture.data.status).toBe("CAPTURED")
  })
})
