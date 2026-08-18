"use client"

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-emerald-50/40 text-slate-900 font-sans">
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-6 text-center">
          <span className="text-6xl">🌱</span>
          <h1 className="text-3xl font-bold text-emerald-950">BioTill Agri</h1>
          <p className="text-base text-slate-600 max-w-md">
            An unexpected error occurred. Please refresh or try again.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl shadow transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
