import PhonePeIcon from "@modules/common/icons/phonepe"
import PaytmIcon from "@modules/common/icons/paytm"
import UpiIcon from "@modules/common/icons/upi"
import React from "react"

/* Map of payment provider_id to their title and icon (Only 3 payment modes: BHIM UPI, Paytm, PhonePe) */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element; description?: string }
> = {
  phonepe: {
    title: "PhonePe (UPI / QR / Wallet)",
    icon: <PhonePeIcon size={24} />,
    description: "Instant payment via PhonePe UPI app or QR scan",
  },
  pp_upi_phonepe: {
    title: "PhonePe (UPI / QR / Wallet)",
    icon: <PhonePeIcon size={24} />,
    description: "Instant payment via PhonePe UPI app or QR scan",
  },
  paytm: {
    title: "Paytm (UPI / Wallet / Postpaid)",
    icon: <PaytmIcon size={24} />,
    description: "Fast checkout using Paytm Wallet, UPI or Postpaid",
  },
  pp_upi_paytm: {
    title: "Paytm (UPI / Wallet / Postpaid)",
    icon: <PaytmIcon size={24} />,
    description: "Fast checkout using Paytm Wallet, UPI or Postpaid",
  },
  upi: {
    title: "Google Pay & BHIM UPI",
    icon: <UpiIcon size={24} />,
    description: "Pay using any UPI App (GPay, BHIM, Cred, Amazon Pay)",
  },
  pp_upi_gpay: {
    title: "Google Pay & BHIM UPI",
    icon: <UpiIcon size={24} />,
    description: "Pay using any UPI App (GPay, BHIM, Cred, Amazon Pay)",
  },
}

export const isStripeLike = (_providerId?: string) => {
  return false
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

export const isCodAgri = (providerId?: string) => {
  return providerId?.startsWith("pp_cod_agri") || providerId?.includes("cod")
}

export const isKisanCredit = (providerId?: string) => {
  return providerId?.includes("kisan") || providerId?.includes("credit") || providerId?.includes("agri_credit")
}

export const isManual = (providerId?: string) => {
  return (
    isCodAgri(providerId) ||
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
