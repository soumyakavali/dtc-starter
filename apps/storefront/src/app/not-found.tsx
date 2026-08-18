import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-80px)] p-6 text-center bg-emerald-50/30">
      <span className="text-6xl">🌾</span>
      <h1 className="text-3xl font-bold text-emerald-950">Page Not Found</h1>
      <p className="text-base text-slate-600 max-w-md">
        The agri-product or page you requested could not be located. Explore certified seeds, bio-fertilizers, and farming equipment in our catalog.
      </p>
      <Link
        href="/in"
        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl shadow transition-colors"
      >
        ← Back to KrishiVeda Direct Store
      </Link>
    </div>
  )
}
