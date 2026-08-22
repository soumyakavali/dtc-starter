"use client"

import { isManual, isStripeLike, isPhonePe, isPaytm, isUpi, isKisanCredit, isCodAgri } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import ErrorMessage from "../error-message"
import PhonePeIcon from "@modules/common/icons/phonepe"
import PaytmIcon from "@modules/common/icons/paytm"
import UpiIcon from "@modules/common/icons/upi"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]
  const providerId = paymentSession?.provider_id

  switch (true) {
    case isStripeLike(providerId):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isPhonePe(providerId):
      return (
        <PhonePePaymentButton
          cart={cart}
          notReady={notReady}
          data-testid={dataTestId}
        />
      )
    case isPaytm(providerId):
      return (
        <PaytmPaymentButton
          cart={cart}
          notReady={notReady}
          data-testid={dataTestId}
        />
      )
    case isUpi(providerId):
      return (
        <UpiPaymentButton
          cart={cart}
          notReady={notReady}
          data-testid={dataTestId}
        />
      )
    case isManual(providerId):
    default:
      return (
        <ManualTestPaymentButton
          cart={cart}
          notReady={notReady}
          data-testid={dataTestId}
        />
      )
  }
}

const isRedirectError = (err: unknown) => {
  if (!err || typeof err !== "object") return false
  const msg = (err as Record<string, unknown>).message
  const digest = (err as Record<string, unknown>).digest
  return (
    msg === "NEXT_REDIRECT" ||
    (typeof msg === "string" && msg.includes("NEXT_REDIRECT")) ||
    (typeof digest === "string" && digest.startsWith("NEXT_REDIRECT"))
  )
}

/* PhonePe Interactive Payment Button & Modal */
const PhonePePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState<"scan" | "processing" | "success">("scan")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleAuthorize = async () => {
    setStep("processing")
    setSubmitting(true)
    setTimeout(async () => {
      setStep("success")
      setTimeout(async () => {
        await placeOrder().catch((err) => {
          if (!isRedirectError(err)) {
            setErrorMessage(err?.message || "Payment authorization failed")
            setSubmitting(false)
            setStep("scan")
          }
        })
      }, 1000)
    }, 1200)
  }

  return (
    <>
      <Button
        disabled={notReady || submitting}
        isLoading={submitting}
        onClick={() => setIsOpen(true)}
        size="large"
        className="bg-purple-700 hover:bg-purple-800 text-white font-medium flex items-center justify-center gap-2 w-full py-3.5 rounded-xl shadow-md"
        data-testid={dataTestId}
      >
        <PhonePeIcon size={20} />
        <span>Pay with PhonePe UPI (₹{cart.total?.toLocaleString() || "0"})</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-purple-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <PhonePeIcon size={28} />
                <span className="font-bold text-purple-950 text-base">PhonePe Gateway</span>
              </div>
              <button
                onClick={() => !submitting && setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {step === "scan" && (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <div className="bg-white p-3 rounded-lg inline-block shadow-sm">
                    <svg width="140" height="140" viewBox="0 0 96 96" className="text-purple-900 mx-auto">
                      <rect width="96" height="96" fill="white" />
                      <rect x="8" y="8" width="24" height="24" fill="none" stroke="#5F259F" strokeWidth="4" rx="2" />
                      <rect x="14" y="14" width="12" height="12" fill="#5F259F" />
                      <rect x="64" y="8" width="24" height="24" fill="none" stroke="#5F259F" strokeWidth="4" rx="2" />
                      <rect x="70" y="14" width="12" height="12" fill="#5F259F" />
                      <rect x="8" y="64" width="24" height="24" fill="none" stroke="#5F259F" strokeWidth="4" rx="2" />
                      <rect x="14" y="70" width="12" height="12" fill="#5F259F" />
                      <rect x="40" y="12" width="6" height="6" fill="#5F259F" />
                      <rect x="50" y="12" width="6" height="6" fill="#5F259F" />
                      <rect x="40" y="40" width="16" height="16" fill="#5F259F" rx="2" />
                      <rect x="68" y="68" width="8" height="8" fill="#5F259F" />
                    </svg>
                  </div>
                  <p className="font-semibold text-purple-950 mt-2 text-sm">
                    Scan with PhonePe App to Pay
                  </p>
                  <p className="text-xl font-extrabold text-purple-900 mt-1">
                    ₹{cart.total?.toLocaleString() || "0"}
                  </p>
                </div>

                <div className="text-xs text-gray-500">
                  Transaction ID: <span className="font-mono text-gray-700">TXN_PH_{cart.id?.slice(0, 8)}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleAuthorize}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 rounded-xl"
                  >
                    Simulate PhonePe App Approval ✓
                  </Button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-gray-500 hover:text-gray-700 py-1"
                  >
                    Cancel Transaction
                  </button>
                </div>
              </div>
            )}

            {step === "processing" && (
              <div className="py-8 space-y-4">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="font-semibold text-purple-950 text-base">Verifying UPI Transaction...</h4>
                <p className="text-xs text-gray-500">Connecting to NPCI and PhonePe servers</p>
              </div>
            )}

            {step === "success" && (
              <div className="py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-emerald-800 text-lg">Payment Successful!</h4>
                <p className="text-xs text-gray-600">Generating your KrishiVeda agricultural invoice...</p>
              </div>
            )}
          </div>
        </div>
      )}

      <ErrorMessage error={errorMessage} data-testid="phonepe-payment-error-message" />
    </>
  )
}

/* Paytm Interactive Payment Button & Modal */
const PaytmPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState<"scan" | "processing" | "success">("scan")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleAuthorize = async () => {
    setStep("processing")
    setSubmitting(true)
    setTimeout(async () => {
      setStep("success")
      setTimeout(async () => {
        await placeOrder().catch((err) => {
          if (!isRedirectError(err)) {
            setErrorMessage(err?.message || "Payment authorization failed")
            setSubmitting(false)
            setStep("scan")
          }
        })
      }, 1000)
    }, 1200)
  }

  return (
    <>
      <Button
        disabled={notReady || submitting}
        isLoading={submitting}
        onClick={() => setIsOpen(true)}
        size="large"
        className="bg-[#002E6E] hover:bg-[#002255] text-white font-medium flex items-center justify-center gap-2 w-full py-3.5 rounded-xl shadow-md"
        data-testid={dataTestId}
      >
        <PaytmIcon size={20} />
        <span>Pay with Paytm (₹{cart.total?.toLocaleString() || "0"})</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-sky-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <PaytmIcon size={28} />
                <span className="font-bold text-[#002E6E] text-base">Paytm Payments</span>
              </div>
              <button
                onClick={() => !submitting && setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {step === "scan" && (
              <div className="space-y-4">
                <div className="bg-sky-50/80 p-4 rounded-xl border border-sky-200">
                  <p className="text-xs text-sky-800 font-semibold uppercase tracking-wider mb-2">
                    Paytm Wallet / UPI / Postpaid
                  </p>
                  <p className="text-2xl font-extrabold text-[#002E6E]">
                    ₹{cart.total?.toLocaleString() || "0"}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Order ID: <span className="font-mono text-gray-700">PAYTM_{cart.id?.slice(0, 8)}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleAuthorize}
                    className="w-full bg-[#00BAF2] hover:bg-[#009fd0] text-white font-bold py-3 rounded-xl"
                  >
                    Confirm & Authorize Paytm Payment
                  </Button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-gray-500 hover:text-gray-700 py-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {step === "processing" && (
              <div className="py-8 space-y-4">
                <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="font-semibold text-sky-950 text-base">Contacting Paytm Gateway...</h4>
              </div>
            )}

            {step === "success" && (
              <div className="py-8 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-emerald-800 text-lg">Paytm Payment Verified!</h4>
              </div>
            )}
          </div>
        </div>
      )}

      <ErrorMessage error={errorMessage} data-testid="paytm-payment-error-message" />
    </>
  )
}

/* Generic UPI & GPay Interactive Payment Button */
const UpiPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    setSubmitting(true)
    await placeOrder()
      .catch((err) => {
        if (!isRedirectError(err)) {
          setErrorMessage(err?.message || "Payment failed")
          setSubmitting(false)
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <>
      <Button
        disabled={notReady || submitting}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium flex items-center justify-center gap-2 w-full py-3.5 rounded-xl shadow-md"
        data-testid={dataTestId}
      >
        <UpiIcon size={20} />
        <span>Pay via UPI & Place Order (₹{cart.total?.toLocaleString() || "0"})</span>
      </Button>
      <ErrorMessage error={errorMessage} data-testid="upi-payment-error-message" />
    </>
  )
}

/* Standard / Manual / Kisan Credit / COD Payment Button */
const ManualTestPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const paymentSession = cart?.payment_collection?.payment_sessions?.[0]
  const providerId = paymentSession?.provider_id

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        if (!isRedirectError(err)) {
          setErrorMessage(err?.message || "Order placement failed")
          setSubmitting(false)
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)
    onPaymentCompleted()
  }

  const label = isKisanCredit(providerId)
    ? `Confirm Order with Kisan Credit Card (₹${cart.total?.toLocaleString() || "0"})`
    : isCodAgri(providerId)
    ? `Place Farm Order (Cash / UPI on Delivery - ₹${cart.total?.toLocaleString() || "0"})`
    : `Place Order (₹${cart.total?.toLocaleString() || "0"})`

  return (
    <>
      <Button
        disabled={notReady || submitting}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium w-full py-3.5 rounded-xl shadow-md"
        data-testid={dataTestId || "submit-order-button"}
      >
        {label}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

/* Stripe Payment Button */
const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        if (!isRedirectError(err)) {
          setErrorMessage(err?.message || "Payment processing failed")
          setSubmitting(false)
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !elements ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium w-full py-3.5 rounded-xl shadow-md"
        data-testid={dataTestId}
      >
        Pay ₹{cart.total?.toLocaleString() || "0"} & Place Order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
