import { CreditCard } from "@medusajs/icons"
import Bancontact from "@modules/common/icons/bancontact"
import Ideal from "@modules/common/icons/ideal"
import PayPal from "@modules/common/icons/paypal"
import PhonePeIcon from "@modules/common/icons/phonepe"
import PaytmIcon from "@modules/common/icons/paytm"
import UpiIcon from "@modules/common/icons/upi"
import LeafIcon from "@modules/common/icons/leaf"
import React from "react"

/* Map of payment provider_id to their title and icon */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element; description?: string }
> = {
  pp_upi_phonepe: {
    title: "PhonePe (UPI / QR / Wallet)",
    icon: <PhonePeIcon size={24} />,
    description: "Instant payment via PhonePe UPI app or QR scan",
  },
  pp_upi_paytm: {
    title: "Paytm (UPI / Wallet / Postpaid)",
    icon: <PaytmIcon size={24} />,
    description: "Fast checkout using Paytm Wallet, UPI or Postpaid",
  },
  pp_upi_gpay: {
    title: "Google Pay & BHIM UPI",
    icon: <UpiIcon size={24} />,
    description: "Pay using any UPI App (GPay, BHIM, Cred, Amazon Pay)",
  },
  pp_kisan_credit: {
    title: "Kisan Credit Card (KCC) / Agri NetBanking",
    icon: <LeafIcon size={22} className="text-emerald-700" />,
    description: "Special seasonal credit & zero-surcharge agri banking",
  },
  pp_cod_agri: {
    title: "Cash on Delivery (Kisan Pay on Delivery)",
    icon: <CreditCard />,
    description: "Pay cash after physical delivery & inspection at your farm",
  },
  pp_stripe_stripe: {
    title: "Credit / Debit Card",
    icon: <CreditCard />,
    description: "Visa, Mastercard, RuPay & Amex accepted",
  },
  "pp_medusa-payments_default": {
    title: "Credit / Debit Card",
    icon: <CreditCard />,
    description: "Secure payment gateway",
  },
  "pp_stripe-ideal_stripe": {
    title: "iDeal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: <PayPal />,
  },
  pp_system_default: {
    title: "NetBanking / UPI / Cards (Direct Gateway)",
    icon: <CreditCard />,
    description: "SBI, HDFC, ICICI, Axis, PNB and 50+ banks",
  },
}

export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe_") || providerId?.startsWith("pp_medusa-")
  )
}

export const isPhonePe = (providerId?: string) => {
  return providerId?.startsWith("pp_upi_phonepe") || providerId === "phonepe"
}

export const isPaytm = (providerId?: string) => {
  return providerId?.startsWith("pp_upi_paytm") || providerId === "paytm"
}

export const isUpi = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_upi_") ||
    providerId?.includes("upi") ||
    providerId === "pp_upi_gpay"
  )
}

export const isKisanCredit = (providerId?: string) => {
  return providerId?.startsWith("pp_kisan_credit")
}

export const isCodAgri = (providerId?: string) => {
  return providerId?.startsWith("pp_cod_agri") || providerId?.includes("cod")
}

export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}

export const isManual = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_system_default") ||
    providerId === "manual" ||
    isCodAgri(providerId) ||
    isKisanCredit(providerId) ||
    isPhonePe(providerId) ||
    isPaytm(providerId) ||
    isUpi(providerId)
  )
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "rwf",
  "ugx",
  "vuv",
]
