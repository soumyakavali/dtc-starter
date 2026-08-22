import { Suspense } from "react"
import { retrieveCustomer } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import LeafIcon from "@modules/common/icons/leaf"
import FarmerSearchBar from "@modules/layout/components/farmer-search"
import LeftNavPanel from "@modules/layout/components/left-nav-panel"
import TestRunnerModal from "@modules/common/components/test-runner-modal"

export default async function Nav() {
  let customer = null
  try {
    customer = await retrieveCustomer()
  } catch {
    customer = null
  }

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-white border-b border-gray-200 shadow-xs font-sans">
      <div className="content-container">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Simple Nav Panel Toggle & Brand Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <LeftNavPanel customer={customer} />

            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2 group"
              data-testid="nav-store-link"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                <LeafIcon size={18} />
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900">
                BioTill<span className="text-emerald-700">Biotech</span>
              </span>
            </LocalizedClientLink>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-md hidden sm:block">
            <FarmerSearchBar />
          </div>

          {/* Right: Test Suite, Account & Cart */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Live Real Instance Test Runner Button */}
            <div className="hidden md:block">
              <TestRunnerModal />
            </div>

            {customer ? (
              <LocalizedClientLink
                href="/account"
                className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors px-2.5 sm:px-3 py-1.5 rounded-lg border border-emerald-200 shadow-2xs"
                data-testid="nav-account-link"
              >
                My Account
              </LocalizedClientLink>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <LocalizedClientLink
                  href="/account"
                  className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-800 bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 transition-colors px-2.5 sm:px-3 py-1.5 rounded-lg shadow-2xs"
                  data-testid="nav-account-link"
                >
                  Sign In
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/account?mode=register"
                  className="text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 transition-colors px-2.5 sm:px-3 py-1.5 rounded-lg shadow-2xs"
                  data-testid="nav-register-link"
                >
                  Register
                </LocalizedClientLink>
              </div>
            )}

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>

        {/* Mobile Search input bar */}
        <div className="pb-3 sm:hidden">
          <FarmerSearchBar />
        </div>
      </div>
    </header>
  )
}
