import { Suspense } from "react"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import LeafIcon from "@modules/common/icons/leaf"
import FarmerSearchBar from "@modules/layout/components/farmer-search"

const NAV_CATEGORIES = [
  {
    name: "All Bio-Products",
    nameKn: "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು",
    href: "/store",
    icon: "🌿",
    highlight: true,
  },
  {
    name: "Bio-Fertilizers",
    nameKn: "ಜೈವಿಕ ಗೊಬ್ಬರಗಳು",
    href: "/collections/liquid-products",
    icon: "🌱",
  },
  {
    name: "Bio-Pesticides",
    nameKn: "ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು",
    href: "/collections/powder-products",
    icon: "🛡️",
  },
  {
    name: "Bio-Stimulants & VAM",
    nameKn: "ಬೇರು ವೃದ್ಧಿ (ವ್ಯಾಮ್)",
    href: "/products/vam-powder",
    icon: "🌾",
  },
  {
    name: "PGR & Liquid Consortia",
    nameKn: "ದ್ರವ ಗೊಬ್ಬರ",
    href: "/products/bio-npk-consortium-liquid",
    icon: "🧪",
  },
  {
    name: "Powder (@ ₹150)",
    nameKn: "ಪೌಡರ್ @ ₹150",
    href: "/collections/powder-products",
    icon: "📦",
    badge: "₹150",
  },
  {
    name: "Liquid (@ ₹350)",
    nameKn: "ಲಿಕ್ವಿಡ್ @ ₹350",
    href: "/collections/liquid-products",
    icon: "🛢️",
    badge: "₹350",
  },
  {
    name: "Dosage Calculator",
    nameKn: "ಡೋಸೇಜ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    href: "#dosage-calculator",
    icon: "🔬",
  },
]

export default async function Nav() {
  const [, , , customer] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions).catch(() => []),
    listLocales().catch(() => []),
    getLocale().catch(() => "en"),
    retrieveCustomer().catch(() => null),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group font-sans">
      {/* Top Banner with Direct Farmer Support Info */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-800">
        <div className="content-container flex justify-between items-center text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-800 text-amber-300 font-bold px-2 py-0.5 rounded text-[10px]">
              Swash & BioTill Biotech
            </span>
            <span className="hidden sm:inline">
              100% Certified Bio-Agri Inputs • Free Shipping on Orders ₹999+ • Direct Farm Delivery
            </span>
            <span className="sm:hidden">
              Direct Farm Delivery across India • Free Shipping ₹999+
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-200">
            <a
              href="tel:+919480123456"
              className="flex items-center gap-1 text-[11px] hover:text-white transition-colors"
            >
              <span className="text-amber-400 font-bold">📞 Helpline:</span>
              <span className="font-bold text-white">+91 94801 23456</span>
            </a>
            <span className="hidden md:inline text-emerald-600">|</span>
            <span className="hidden md:inline text-emerald-300 text-[11px]">
              ರೈತರಿಗೆ ನೇರ ಸರಬರಾಜು
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="relative bg-white/98 backdrop-blur-md border-b border-emerald-100 shadow-xs py-2.5">
        <div className="content-container flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Farmer Brand Tagline */}
          <div className="flex items-center justify-between gap-4">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              data-testid="nav-store-link"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white flex items-center justify-center shadow-md shadow-emerald-800/20 group-hover:scale-105 transition-transform">
                <LeafIcon size={24} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-emerald-950 flex items-center gap-1">
                  BioTill<span className="text-emerald-600">Biotech</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-700 -mt-0.5">
                  SWASH BIOTECH SOLUTIONS
                </span>
              </div>
            </LocalizedClientLink>

            {/* Mobile Actions: Account + Cart */}
            <div className="flex md:hidden items-center gap-2">
              <LocalizedClientLink
                href="/account"
                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center gap-1"
              >
                <span>👤</span>
                <span>{customer ? "Account" : "Login"}</span>
              </LocalizedClientLink>

              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="p-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
                    href="/cart"
                  >
                    🛒
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-lg mx-auto w-full">
            <FarmerSearchBar />
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            {customer ? (
              <LocalizedClientLink
                href="/account"
                className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 text-xs font-bold transition flex items-center gap-2"
              >
                <span className="text-base">🌾</span>
                <div className="text-left">
                  <p className="text-[10px] text-emerald-700 leading-tight">Farmer Account</p>
                  <p className="text-xs font-extrabold leading-tight">{customer.first_name || "My Account"}</p>
                </div>
              </LocalizedClientLink>
            ) : (
              <div className="flex items-center gap-1.5">
                <LocalizedClientLink
                  href="/account"
                  className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 text-xs font-bold transition flex items-center gap-1.5"
                  data-testid="nav-login-link"
                >
                  <span>👤</span>
                  <div className="text-left">
                    <p className="text-[9px] text-emerald-700 leading-none">Farmer Login</p>
                    <p className="text-xs font-extrabold leading-tight">Sign In</p>
                  </div>
                </LocalizedClientLink>

                <LocalizedClientLink
                  href="/account"
                  className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black transition flex items-center gap-1.5 shadow-sm"
                  data-testid="nav-register-link"
                >
                  <span>✨</span>
                  <div className="text-left">
                    <p className="text-[9px] text-amber-900 leading-none">New Farmer</p>
                    <p className="text-xs font-black leading-tight">Register</p>
                  </div>
                </LocalizedClientLink>
              </div>
            )}

            <LocalizedClientLink
              href="/store"
              className="px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 text-xs font-bold transition-all flex items-center gap-1.5"
              data-testid="nav-all-products-link"
            >
              <span className="text-sm">🌿</span>
              <span>All 10 Items</span>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <span>🛒 Cart</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>
      </header>

      {/* Sub Navigation Bar: Categories & Quick Links */}
      <div className="bg-emerald-900 text-white shadow-md border-t border-emerald-800/80 py-1.5 px-2">
        <div className="content-container">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {NAV_CATEGORIES.map((cat, idx) => {
              if (cat.href.startsWith("#")) {
                return (
                  <a
                    key={idx}
                    href={cat.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/90 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap transition-all hover:scale-105 flex-shrink-0 border border-emerald-700/80 shadow-xs"
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </a>
                )
              }

              return (
                <LocalizedClientLink
                  key={idx}
                  href={cat.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all hover:scale-105 flex-shrink-0 shadow-xs ${
                    cat.highlight
                      ? "bg-amber-400 hover:bg-amber-300 text-amber-950 font-black"
                      : "bg-emerald-800/90 hover:bg-emerald-700 text-white border border-emerald-700/80"
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-amber-400 text-amber-950 rounded-full font-extrabold ml-0.5">
                      {cat.badge}
                    </span>
                  )}
                </LocalizedClientLink>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
