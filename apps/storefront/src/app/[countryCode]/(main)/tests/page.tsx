import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import TestRunnerModal from "@modules/common/components/test-runner-modal"

export const metadata: Metadata = {
  title: "Live Instance E2E Test Suite | BioTill Biotech",
  description:
    "Real user automated test runner for verifying 100% catalog coverage, category taxonomies, pricing math, cart transactions, and dosage calculations.",
}

export default async function TestSuitePage() {
  return (
    <div className="w-full bg-slate-900 min-h-screen text-slate-100 py-10 font-sans">
      <div className="content-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
          <LocalizedClientLink href="/" className="hover:text-emerald-400">
            Home
          </LocalizedClientLink>
          <span>/</span>
          <span className="text-emerald-400 font-bold">Real Instance Test Suite</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-10 mb-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-4 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Real User E2E Verification Engine • 100% Coverage
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              BioTill Real Instance Automated Test Suite
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Execute comprehensive live user tests on this running instance. Covers all 10 certified bio-products, 6 taxonomy categories, cart lifecycle (add, quantity update, remove), farmer discounts (₹150 powder, ₹350 liquid, FARMER10 coupon), and agricultural dosage math.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <TestRunnerModal />

              <LocalizedClientLink
                href="/store"
                className="px-4 py-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all border border-slate-600"
              >
                Explore Storefront Catalog →
              </LocalizedClientLink>
            </div>
          </div>

          <div className="absolute right-6 -bottom-6 opacity-10 sm:opacity-20 text-9xl pointer-events-none select-none font-black text-emerald-400">
            🧪
          </div>
        </div>

        {/* Test Scope Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-xl">
            <div className="text-2xl mb-2">🌿</div>
            <h3 className="text-sm font-bold text-white mb-1">Catalog & Inventory (100%)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Validates all 10 organic formulations, Kannada/English bilingual titles, CFU potencies, and guaranteed farmer rates (₹150 for 1kg, ₹350 for 1L).
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-xl">
            <div className="text-2xl mb-2">🏷️</div>
            <h3 className="text-sm font-bold text-white mb-1">Categories & Taxonomy (100%)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Validates bio-fertilizers, bio-pesticides, bio-fungicides, bio-decomposers, powder, and liquid category routes and sidebar filter integration.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-xl">
            <div className="text-2xl mb-2">🛒</div>
            <h3 className="text-sm font-bold text-white mb-1">Cart & Transactions (100%)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real session testing of cart initialization, multi-item additions, quantity mutations, item deletion, FARMER10 coupon & ₹999 free delivery.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-xl">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="text-sm font-bold text-white mb-1">Pricing & Free Shipping (100%)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tests free agricultural shipping rules for orders ≥ ₹999 and validates line item totals across multi-quantity purchases.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-xl">
            <div className="text-2xl mb-2">🧮</div>
            <h3 className="text-sm font-bold text-white mb-1">Dosage Calculator (100%)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mathematical verification of acreage-to-dosage conversions for Sugarcane, Paddy, Cotton, Arecanut, and Vegetables + 1-click cart bundling.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-xl">
            <div className="text-2xl mb-2">💳</div>
            <h3 className="text-sm font-bold text-white mb-1">Checkout & Payments (100%)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verifies payment session initialization supporting UPI (PhonePe, Paytm, GPay), NetBanking, and Cash on Delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
