"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Storefront nested error boundary:", error)
    if (
      error?.message?.includes("was not found on the server") ||
      error?.message?.includes("Failed to find Server Action") ||
      error?.name === "UnrecognizedActionError"
    ) {
      if (typeof window !== "undefined") {
        window.location.reload()
      }
    }
  }, [error])

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-120px)] p-6 text-center bg-emerald-50/20">
      <span className="text-5xl">🌱</span>
      <h2 className="text-2xl font-bold text-emerald-950">Agricultural Store Notice</h2>
      <p className="text-sm text-slate-600 max-w-md">
        The application was updated or experienced a connection refresh.
      </p>
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.location.reload()
          } else {
            reset()
          }
        }}
        className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl shadow transition-colors"
      >
        Refresh & Try Again
      </button>
    </div>
  )
}
