import PhonePePaymentProviderService from "../service"
import { PaymentSessionStatus } from "@medusajs/framework/utils"

describe("PhonePePaymentProviderService", () => {
  let service: PhonePePaymentProviderService

  beforeEach(() => {
    service = new PhonePePaymentProviderService(
      {},
      {
        merchantId: "TEST_MERCHANT_ID",
        saltKey: "test_salt_key_123",
        saltIndex: 1,
        env: "UAT",
      }
    )
  })

  it("should have correct identifier", () => {
    expect(PhonePePaymentProviderService.identifier).toBe("phonepe")
  })

  it("should initiate payment with UPI QR string and BioTill Agri branding", async () => {
    const result = await service.initiatePayment({
      amount: 15000,
      currency_code: "inr",
      context: {
        customer: {
          email: "farmer@karnataka.in",
        },
      },
      data: {},
    })

    expect(result.id).toMatch(/^TXN_PH_/)
    expect(result.data.amount).toBe(15000)
    expect(result.data.currency_code).toBe("inr")
    expect(result.data.merchant_id).toBe("TEST_MERCHANT_ID")
    expect(result.data.payment_mode).toBe("UPI_INTENT_QR")
    expect(result.data.status).toBe("PAYMENT_INITIATED")
    expect(result.data.upi_qr_string).toContain("pa=biotillagri@ybl")
    expect(result.data.upi_qr_string).toContain("BioTill%20Agri")
  })

  it("should authorize payment and return AUTHORIZED status", async () => {
    const result = await service.authorizePayment({
      data: {
        transaction_id: "TXN_PH_12345",
        amount: 35000,
      },
    })

    expect(result.status).toBe(PaymentSessionStatus.AUTHORIZED)
    expect(result.data.status).toBe("PAYMENT_SUCCESS")
    expect(result.data.payment_provider).toBe("phonepe")
    expect(result.data.authorized_at).toBeDefined()
  })

  it("should capture payment and update status to CAPTURED", async () => {
    const result = await service.capturePayment({
      data: {
        transaction_id: "TXN_PH_12345",
      },
    })

    expect(result.data.status).toBe("CAPTURED")
    expect(result.data.captured_at).toBeDefined()
  })

  it("should cancel payment properly", async () => {
    const result = await service.cancelPayment({
      data: {
        transaction_id: "TXN_PH_12345",
      },
    })

    expect(result.data.status).toBe("CANCELLED")
    expect(result.data.cancelled_at).toBeDefined()
  })

  it("should correctly resolve payment statuses", async () => {
    const statusSuccess = await service.getPaymentStatus({
      data: { status: "PAYMENT_SUCCESS" },
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

  it("should handle refunds accurately", async () => {
    const result = await service.refundPayment({
      amount: 15000,
      data: {
        transaction_id: "TXN_PH_12345",
      },
    })

    expect(result.data.refunded_amount).toBe(15000)
    expect(result.data.refunded_at).toBeDefined()
  })

  it("should parse webhook payload", async () => {
    const webhookResult = await service.getWebhookActionAndData({
      data: {
        transaction_id: "TXN_PH_9999",
        amount: 35000,
      },
      rawData: "raw",
    })

    expect(webhookResult.action).toBe("captured")
    expect(webhookResult.data.session_id).toBe("TXN_PH_9999")
    expect(webhookResult.data.amount).toBe(35000)
  })
})
