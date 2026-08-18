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

const QUICK_CATEGORIES = [
  {
    name: "ಪೌಡರ್ ಉತ್ಪನ್ನಗಳು (Powder @ ₹150)",
    handle: "powder-products",
    icon: "📦",
    badge: "₹150/- (1 ಕೆಜಿ)",
  },
  {
    name: "ಲಿಕ್ವಿಡ್ ಉತ್ಪನ್ನಗಳು (Liquid @ ₹350)",
    handle: "liquid-products",
    icon: "🧪",
    badge: "₹350/- (1 ಲೀಟರ್)",
  },
  {
    name: "ಟ್ರೈಕೋಡರ್ಮಾ (Trichoderma)",
    handle: "powder-products",
    icon: "🛡️",
    badge: "ಶಿಲೀಂಧ್ರನಾಶಕ",
  },
  {
    name: "ಸುಡೋಮೊನಾಸ್ (Pseudomonas)",
    handle: "powder-products",
    icon: "🌱",
    badge: "ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ",
  },
  {
    name: "ಮೆಟಾರೈಸಿಯಂ (Metarhizium)",
    handle: "powder-products",
    icon: "🐛",
    badge: "ಕೀಟನಾಶಕ",
  },
  {
    name: "ವ್ಯಾಮ್ (VAM)",
    handle: "powder-products",
    icon: "🌾",
    badge: "ರಂಜಕ ಗೊಬ್ಬರ",
  },
  {
    name: "ಬಯೋ ಎನ್ಪಿಕೆ (Bio NPK)",
    handle: "liquid-products",
    icon: "⚡",
    badge: "ದ್ರವ ಗೊಬ್ಬರ",
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
              ಕರ್ನಾಟಕ ರೈತರಿಗೆ
            </span>
            <span className="hidden sm:inline">
              ಕೃಷಿ ಜೈವಿಕ ಉತ್ಪನ್ನಗಳು • Direct Farm Delivery across Karnataka • Free Shipping on ₹999+
            </span>
            <span className="sm:hidden">
              Direct Farm Delivery across Karnataka
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-200">
            <span className="flex items-center gap-1 text-[11px]">
              <span className="text-amber-400 font-bold">📞 ಸಹಾಯವಾಣಿ:</span>
              <span className="font-semibold text-white">+91 94800 00000</span>
            </span>
            <span className="hidden md:inline text-emerald-400">|</span>
            <span className="hidden md:inline text-emerald-300 text-[11px]">
              100% ಶುದ್ಧ ಜೈವಿಕ ಉತ್ಪನ್ನಗಳು
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
                  BioTill<span className="text-emerald-600">Agri</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 -mt-1">
                  BIOTILL AGRI PRIVATE LIMITED
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

          {/* Center: Farmer Search Bar with English & Kannada */}
          <div className="flex-1 max-w-xl mx-auto w-full">
            <FarmerSearchBar />
          </div>

          {/* Desktop Right Actions: Login/Register + Products + Cart */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            {customer ? (
              <LocalizedClientLink
                href="/account"
                className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 text-xs font-bold transition flex items-center gap-2"
              >
                <span className="text-base">🌾</span>
                <div className="text-left">
                  <p className="text-[10px] text-emerald-700 leading-tight">ನನ್ನ ಖಾತೆ</p>
                  <p className="text-xs font-extrabold leading-tight">{customer.first_name || "Farmer Account"}</p>
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
                    <p className="text-[9px] text-emerald-700 leading-none">ರೈತರ ಲಾಗಿನ್</p>
                    <p className="text-xs font-extrabold leading-tight">Farmer Sign In</p>
                  </div>
                </LocalizedClientLink>

                <LocalizedClientLink
                  href="/account"
                  className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black transition flex items-center gap-1.5 shadow-sm"
                  data-testid="nav-register-link"
                >
                  <span>✨</span>
                  <div className="text-left">
                    <p className="text-[9px] text-amber-900 leading-none">ಹೊಸ ನೋಂದಣಿ</p>
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

      {/* Farmer Direct Category Bar (Kannada + English with Icons) */}
      <div className="bg-emerald-900 text-white shadow-md border-t border-emerald-800/80 py-1.5 px-2">
        <div className="content-container">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <LocalizedClientLink
              href="/store"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black whitespace-nowrap transition-all hover:scale-105 flex-shrink-0 shadow-sm"
            >
              <span>🌿 ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು (All 10 Items)</span>
            </LocalizedClientLink>

            <div className="h-4 w-px bg-emerald-700 mx-1 flex-shrink-0" />

            {QUICK_CATEGORIES.map((cat, idx) => (
              <LocalizedClientLink
                key={idx}
                href={`/collections/${cat.handle}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800/90 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap transition-all hover:scale-105 flex-shrink-0 border border-emerald-700/80 shadow-xs"
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-amber-400 text-amber-950 rounded-full font-extrabold ml-0.5">
                  {cat.badge}
                </span>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
