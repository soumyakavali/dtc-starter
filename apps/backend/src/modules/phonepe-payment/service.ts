import {
  AbstractPaymentProvider,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  ProviderWebhookPayload,
  WebhookActionResult,
} from "@medusajs/framework/types"

type PhonePeOptions = {
  merchantId?: string
  saltKey?: string
  saltIndex?: number
  env?: "UAT" | "PROD"
}

export default class PhonePePaymentProviderService extends AbstractPaymentProvider<PhonePeOptions> {
  static identifier = "phonepe"

  protected options_: PhonePeOptions

  constructor(container: Record<string, unknown>, options: PhonePeOptions = {}) {
    super(container, options)
    this.options_ = {
      merchantId: options.merchantId || process.env.PHONEPE_MERCHANT_ID || "PHONEPE_MERCHANT_DEFAULT",
      saltKey: options.saltKey || process.env.PHONEPE_SALT_KEY || "dummy_salt_key",
      saltIndex: options.saltIndex || 1,
      env: options.env || "UAT",
    }
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const { amount, currency_code, context } = input

    const transactionId = `TXN_PH_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    const rupeeAmount = (Number(amount) / 100).toFixed(2)
    const upiQrString = `upi://pay?pa=biotillagri@ybl&pn=BioTill%20Agri%20Private%20Limited&am=${rupeeAmount}&cu=${currency_code.toUpperCase()}&tn=Order%20Payment`

    return {
      id: transactionId,
      data: {
        transaction_id: transactionId,
        amount,
        currency_code,
        merchant_id: this.options_.merchantId,
        upi_qr_string: upiQrString,
        payment_mode: "UPI_INTENT_QR",
        status: "PAYMENT_INITIATED",
        customer_email: context?.customer?.email || "",
      },
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    const { data } = input

    return {
      status: PaymentSessionStatus.AUTHORIZED,
      data: {
        ...data,
        status: "PAYMENT_SUCCESS",
        authorized_at: new Date().toISOString(),
        payment_provider: "phonepe",
      },
    }
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    const { data } = input

    return {
      data: {
        ...data,
        status: "CAPTURED",
        captured_at: new Date().toISOString(),
      },
    }
  }

  async cancelPayment(
    input: CancelPaymentInput
  ): Promise<CancelPaymentOutput> {
    const { data } = input

    return {
      data: {
        ...data,
        status: "CANCELLED",
        cancelled_at: new Date().toISOString(),
      },
    }
  }

  async deletePayment(
    input: DeletePaymentInput
  ): Promise<DeletePaymentOutput> {
    return {}
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    const { data } = input

    if (data?.status === "PAYMENT_SUCCESS" || data?.status === "CAPTURED") {
      return { status: PaymentSessionStatus.CAPTURED }
    }

    if (data?.status === "AUTHORIZED") {
      return { status: PaymentSessionStatus.AUTHORIZED }
    }

    return { status: PaymentSessionStatus.PENDING }
  }

  async refundPayment(
    input: RefundPaymentInput
  ): Promise<RefundPaymentOutput> {
    const { data, amount } = input

    return {
      data: {
        ...data,
        refunded_amount: amount,
        refund_status: "REFUND_COMPLETED",
        refunded_at: new Date().toISOString(),
      },
    }
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    return input.data
  }

  async updatePayment(
    input: UpdatePaymentInput
  ): Promise<UpdatePaymentOutput> {
    const { amount, currency_code, data } = input

    return {
      data: {
        ...data,
        amount,
        currency_code,
        updated_at: new Date().toISOString(),
      },
    }
  }

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    return {
      action: "captured",
      data: {
        session_id: (payload.data as Record<string, unknown>)?.transaction_id as string,
        amount: Number((payload.data as Record<string, unknown>)?.amount || 0),
      },
    }
  }
}
