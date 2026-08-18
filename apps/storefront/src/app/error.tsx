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
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-80px)] p-6 text-center bg-emerald-50/30">
      <span className="text-6xl">🌾</span>
      <h1 className="text-3xl font-bold text-emerald-950">Something went wrong!</h1>
      <p className="text-base text-slate-600 max-w-md">
        An error occurred while loading the agricultural store. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl shadow transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
