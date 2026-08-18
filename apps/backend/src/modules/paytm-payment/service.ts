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

type PaytmOptions = {
  mid?: string
  mkey?: string
  website?: string
  env?: "STAGE" | "PROD"
}

export default class PaytmPaymentProviderService extends AbstractPaymentProvider<PaytmOptions> {
  static identifier = "paytm"

  protected options_: PaytmOptions

  constructor(container: Record<string, unknown>, options: PaytmOptions = {}) {
    super(container, options)
    this.options_ = {
      mid: options.mid || process.env.PAYTM_MID || "PAYTM_MID_DEFAULT",
      mkey: options.mkey || process.env.PAYTM_MERCHANT_KEY || "dummy_paytm_key",
      website: options.website || "WEBSTAGING",
      env: options.env || "STAGE",
    }
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const { amount, currency_code, context } = input

    const orderId = `PAYTM_ORD_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    const txnToken = `txn_token_${Date.now()}`

    return {
      id: orderId,
      data: {
        order_id: orderId,
        txn_token: txnToken,
        amount,
        currency_code,
        mid: this.options_.mid,
        payment_mode: "PAYTM_UPI_WALLET",
        status: "TXN_INITIATED",
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
        status: "TXN_SUCCESS",
        authorized_at: new Date().toISOString(),
        payment_provider: "paytm",
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

    if (data?.status === "TXN_SUCCESS" || data?.status === "CAPTURED") {
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
        session_id: (payload.data as Record<string, unknown>)?.order_id as string,
        amount: Number((payload.data as Record<string, unknown>)?.amount || 0),
      },
    }
  }
}
