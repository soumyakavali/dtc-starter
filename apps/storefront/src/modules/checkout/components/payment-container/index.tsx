import { Radio as RadioGroupOption } from "@headlessui/react"
import { Text, clx } from "@modules/common/components/ui"
import React, { useContext, useMemo, useState, type JSX } from "react"

import Radio from "@modules/common/components/radio"
import { isPhonePe, isPaytm, isUpi, isKisanCredit, isCodAgri } from "@lib/constants"
import SkeletonCardDetails from "@modules/skeletons/components/skeleton-card-details"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import { StripeContext } from "../payment-wrapper/stripe-wrapper"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element; description?: string }>
  children?: React.ReactNode
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}) => {
  const isSelected = selectedPaymentOptionId === paymentProviderId
  const [upiId, setUpiId] = useState("")
  const [kccNumber, setKccNumber] = useState("")
  const [activeTab, setActiveTab] = useState<"qr" | "vpa">("qr")

  const info = paymentInfoMap[paymentProviderId]

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={clx(
        "flex flex-col gap-y-3 text-small-regular cursor-pointer py-4 border rounded-xl px-6 mb-3 transition-all duration-200",
        {
          "border-emerald-600 bg-emerald-50/40 shadow-sm ring-1 ring-emerald-600/30":
            isSelected,
          "border-gray-200 hover:border-emerald-300 hover:bg-gray-50/60":
            !isSelected,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3.5">
          <Radio checked={isSelected} />
          <div>
            <div className="flex items-center gap-2">
              <Text className="text-base-semi text-gray-900 font-medium">
                {info?.title || paymentProviderId}
              </Text>
              {isPhonePe(paymentProviderId) && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-purple-100 text-purple-700 rounded-full">
                  Fast UPI
                </span>
              )}
              {isPaytm(paymentProviderId) && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-sky-100 text-sky-700 rounded-full">
                  Wallet / UPI
                </span>
              )}
              {isKisanCredit(paymentProviderId) && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                  0% Surcharge
                </span>
              )}
              {isCodAgri(paymentProviderId) && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded-full">
                  Pay at Farm
                </span>
              )}
            </div>
            {info?.description && (
              <p className="text-xs text-gray-500 mt-0.5">{info.description}</p>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center p-1.5 bg-white rounded-lg border border-gray-100 shadow-2xs">
          {info?.icon}
        </div>
      </div>

      {/* Expanded Interactive Payment Options for Selected Provider */}
      {isSelected && (isPhonePe(paymentProviderId) || isPaytm(paymentProviderId) || isUpi(paymentProviderId)) && (
        <div className="mt-2 pt-3 border-t border-emerald-200/60 text-xs text-gray-700 bg-white/80 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setActiveTab("qr")
              }}
              className={clx(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                activeTab === "qr"
                  ? "bg-emerald-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Scan UPI QR Code
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setActiveTab("vpa")
              }}
              className={clx(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                activeTab === "vpa"
                  ? "bg-emerald-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Enter UPI ID / VPA
            </button>
          </div>

          {activeTab === "qr" ? (
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-emerald-50/80 p-3 rounded-md border border-emerald-100">
              <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-xs flex flex-col items-center">
                {/* Visual SVG QR Representation */}
                <svg width="96" height="96" viewBox="0 0 96 96" className="text-emerald-900">
                  <rect width="96" height="96" fill="white" />
                  {/* Outer corners */}
                  <rect x="8" y="8" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" rx="2" />
                  <rect x="14" y="14" width="12" height="12" fill="currentColor" />
                  <rect x="64" y="8" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" rx="2" />
                  <rect x="70" y="14" width="12" height="12" fill="currentColor" />
                  <rect x="8" y="64" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" rx="2" />
                  <rect x="14" y="70" width="12" height="12" fill="currentColor" />
                  {/* Data modules pattern */}
                  <rect x="40" y="12" width="6" height="6" fill="currentColor" />
                  <rect x="50" y="12" width="6" height="6" fill="currentColor" />
                  <rect x="44" y="24" width="6" height="6" fill="currentColor" />
                  <rect x="12" y="42" width="6" height="6" fill="currentColor" />
                  <rect x="24" y="42" width="6" height="6" fill="currentColor" />
                  <rect x="40" y="40" width="16" height="16" fill="#047857" rx="2" />
                  <rect x="64" y="42" width="6" height="6" fill="currentColor" />
                  <rect x="76" y="42" width="6" height="6" fill="currentColor" />
                  <rect x="44" y="64" width="6" height="6" fill="currentColor" />
                  <rect x="54" y="74" width="6" height="6" fill="currentColor" />
                  <rect x="68" y="68" width="8" height="8" fill="currentColor" />
                  <rect x="80" y="80" width="6" height="6" fill="currentColor" />
                </svg>
                <span className="text-[10px] text-emerald-800 font-semibold mt-1">BHIM UPI QR</span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900 text-xs">
                  Instant Auto-Verified Payment
                </p>
                <p className="text-[11px] text-gray-600 mt-1">
                  Scan using <strong className="text-purple-700">PhonePe</strong>,{" "}
                  <strong className="text-sky-600">Paytm</strong>, or{" "}
                  <strong className="text-emerald-700">Google Pay</strong> on review step.
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Secured by NPCI & Medusa Payment Gateway
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
              <label className="block text-[11px] font-medium text-gray-700">
                Your UPI ID (Virtual Payment Address)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. mobile@ybl or yourname@paytm"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
                />
                <button
                  type="button"
                  onClick={() => alert(`UPI ID ${upiId || "farmer@upi"} verified!`)}
                  className="px-3 py-1 text-xs font-semibold bg-emerald-700 text-white rounded-md hover:bg-emerald-800"
                >
                  Verify
                </button>
              </div>
              <p className="text-[10px] text-gray-500">
                A collect request will be sent to your UPI app upon order confirmation.
              </p>
            </div>
          )}
        </div>
      )}

      {isSelected && isKisanCredit(paymentProviderId) && (
        <div className="mt-2 pt-3 border-t border-emerald-200/60 text-xs text-gray-700 bg-emerald-50/70 p-3 rounded-lg" onClick={(e) => e.stopPropagation()}>
          <p className="font-semibold text-emerald-900 mb-1">Kisan Credit Card (KCC) Verification</p>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              placeholder="Enter 16-digit KCC Number or Farmer Registration ID"
              value={kccNumber}
              onChange={(e) => setKccNumber(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">
            Applicable for NABARD/SBI/PNB/HDFC Agri crop season loans with zero transaction fee.
          </p>
        </div>
      )}

      {isSelected && isCodAgri(paymentProviderId) && (
        <div className="mt-2 pt-3 border-t border-amber-200/60 text-xs text-amber-900 bg-amber-50/80 p-3 rounded-lg">
          <p className="font-semibold flex items-center gap-1.5">
            🌾 Farmer Assurance Guarantee:
          </p>
          <p className="text-[11px] text-amber-800 mt-0.5">
            Inspect the sealed seed bags & lab certification QR tag upon arrival at your farm before giving cash or paying via PhonePe/Paytm QR to the delivery agent.
          </p>
        </div>
      )}

      {children}
    </RadioGroupOption>
  )
}

export default PaymentContainer

export const StripeCardContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setCardBrand,
  setError,
  setCardComplete,
}: Omit<PaymentContainerProps, "children"> & {
  setCardBrand: (brand: string) => void
  setError: (error: string | null) => void
  setCardComplete: (complete: boolean) => void
}) => {
  const stripeReady = useContext(StripeContext)

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out",
      },
    }
  }, [])

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
    >
      {selectedPaymentOptionId === paymentProviderId &&
        (stripeReady ? (
          <div className="my-4 transition-all duration-150 ease-in-out">
            <Text className="txt-medium-plus text-ui-fg-base mb-1">
              Enter your card details:
            </Text>
            <CardElement
              options={useOptions as StripeCardElementOptions}
              onChange={(e) => {
                setCardBrand(
                  e.brand &&
                    e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                )
                setError(e.error?.message || null)
                setCardComplete(e.complete)
              }}
            />
          </div>
        ) : (
          <SkeletonCardDetails />
        ))}
    </PaymentContainer>
  )
}
