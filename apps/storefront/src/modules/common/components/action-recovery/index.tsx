"use client"

import { useEffect } from "react"

export default function ActionRecovery() {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event?.reason
      const message = String(reason?.message || reason || "")
      if (
        message.includes("was not found on the server") ||
        message.includes("Failed to find Server Action") ||
        message.includes("UnrecognizedActionError") ||
        message.includes("Failed to fetch")
      ) {
        console.warn("Detected stale server action or connection reset, refreshing to re-sync:", message)
        // Refresh page to load updated Server Action compilation hashes
        window.location.reload()
      }
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  return null
}
