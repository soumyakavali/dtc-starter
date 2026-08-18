import PaytmPaymentProviderService from "../service"
import { PaymentSessionStatus } from "@medusajs/framework/utils"

describe("PaytmPaymentProviderService", () => {
  let service: PaytmPaymentProviderService

  beforeEach(() => {
    service = new PaytmPaymentProviderService(
      {},
      {
        mid: "TEST_PAYTM_MID",
        mkey: "test_mkey_123",
        website: "WEBSTAGING",
        env: "STAGE",
      }
    )
  })

  it("should have correct identifier", () => {
    expect(PaytmPaymentProviderService.identifier).toBe("paytm")
  })

  it("should initiate payment with Paytm order details", async () => {
    const result = await service.initiatePayment({
      amount: 35000,
      currency_code: "inr",
      context: {
        customer: {
          email: "farmer@karnataka.in",
        },
      },
      data: {},
    })

    expect(result.id).toMatch(/^PAYTM_ORD_/)
    expect(result.data.amount).toBe(35000)
    expect(result.data.currency_code).toBe("inr")
    expect(result.data.mid).toBe("TEST_PAYTM_MID")
    expect(result.data.payment_mode).toBe("PAYTM_UPI_WALLET")
    expect(result.data.status).toBe("TXN_INITIATED")
  })

  it("should authorize payment and return AUTHORIZED status", async () => {
    const result = await service.authorizePayment({
      data: {
        order_id: "PAYTM_ORD_12345",
        amount: 35000,
      },
    })

    expect(result.status).toBe(PaymentSessionStatus.AUTHORIZED)
    expect(result.data.status).toBe("TXN_SUCCESS")
    expect(result.data.payment_provider).toBe("paytm")
  })

  it("should capture payment and update status to CAPTURED", async () => {
    const result = await service.capturePayment({
      data: {
        order_id: "PAYTM_ORD_12345",
      },
    })

    expect(result.data.status).toBe("CAPTURED")
    expect(result.data.captured_at).toBeDefined()
  })

  it("should cancel payment properly", async () => {
    const result = await service.cancelPayment({
      data: {
        order_id: "PAYTM_ORD_12345",
      },
    })

    expect(result.data.status).toBe("CANCELLED")
    expect(result.data.cancelled_at).toBeDefined()
  })

  it("should correctly resolve payment statuses", async () => {
    const statusSuccess = await service.getPaymentStatus({
      data: { status: "TXN_SUCCESS" },
    })
    expect(statusSuccess.status).toBe(PaymentSessionStatus.CAPTURED)

    const statusCaptured = await service.getPaymentStatus({
      data: { status: "CAPTURED" },
    })
    expect(statusCaptured.status).toBe(PaymentSessionStatus.CAPTURED)

    const statusAuth = await service.getPaymentStatus({
      data: { status: "AUTHORIZED" },
    })
    expect(statusAuth.status).toBe(PaymentSessionStatus.AUTHORIZED)

    const statusPending = await service.getPaymentStatus({
      data: { status: "OTHER" },
    })
    expect(statusPending.status).toBe(PaymentSessionStatus.PENDING)
  })

  it("should parse webhook payload", async () => {
    const webhookResult = await service.getWebhookActionAndData({
      data: {
        order_id: "PAYTM_ORD_9999",
        amount: 15000,
      },
      rawData: "raw",
    })

    expect(webhookResult.action).toBe("captured")
    expect(webhookResult.data.session_id).toBe("PAYTM_ORD_9999")
    expect(webhookResult.data.amount).toBe(15000)
  })
})
