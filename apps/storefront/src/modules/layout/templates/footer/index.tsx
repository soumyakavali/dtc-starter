import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import LeafIcon from "@modules/common/icons/leaf"
import PhonePeIcon from "@modules/common/icons/phonepe"
import PaytmIcon from "@modules/common/icons/paytm"
import UpiIcon from "@modules/common/icons/upi"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  }).catch(() => ({ collections: [] }))
  const productCategories = await listCategories().catch(() => [])

  return (
    <footer className="border-t border-emerald-900/30 bg-emerald-950 text-emerald-100 w-full font-sans">
      <div className="content-container flex flex-col w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-emerald-800/80">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white flex items-center justify-center shadow-md shadow-emerald-900/40 group-hover:scale-105 transition-transform">
                <LeafIcon size={22} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                  BioTill<span className="text-emerald-400">Agri</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-300">
                  BIOTILL AGRI PRIVATE LIMITED
                </span>
              </div>
            </LocalizedClientLink>
            <p className="text-xs text-emerald-200/90 leading-relaxed max-w-sm">
              ರೈತರಿಗೆ ನೇರ ತಂತ್ರಜ್ಞಾನ ಆಧಾರಿತ 100% ಶುದ್ಧ ಜೈವಿಕ ಕೃಷಿ ಉತ್ಪನ್ನಗಳು. ಉತ್ತಮ ಇಳುವರಿ ಮತ್ತು ಮಣ್ಣಿನ ಫಲವತ್ತತೆಗಾಗಿ ಪ್ರಮಾಣೀಕೃತ ಬಯೋ-ಫಂಗಿಸೈಡ್, ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ, ಕೀಟನಾಶಕ ಹಾಗೂ ಸಾವಯವ ಗೊಬ್ಬರಗಳು.
            </p>
            <div className="space-y-1.5 text-xs text-emerald-300">
              <p className="flex items-center gap-1.5">
                <span>🏢</span> <strong>BIOTILL AGRI PRIVATE LIMITED</strong>
              </p>
              <p className="flex items-center gap-1.5">
                <span>🌱</span> <strong>Bio-Certified:</strong> CCOF & NPOP Organic Inputs
              </p>
              <p className="flex items-center gap-1.5">
                <span>🚚</span> <strong>Farmer Doorstep Delivery:</strong> Pan India Farm Dispatch
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
              <span>🌿</span> ಉತ್ಪನ್ನ ವಿಭಾಗಗಳು (Categories)
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <LocalizedClientLink
                  className="hover:text-amber-400 transition-colors flex items-center justify-between"
                  href="/collections/powder-products"
                >
                  <span>📦 ಪೌಡರ್ ಉತ್ಪನ್ನಗಳು (Powder 1 Kg)</span>
                  <span className="text-amber-400 font-bold">₹150/-</span>
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="hover:text-amber-400 transition-colors flex items-center justify-between"
                  href="/collections/liquid-products"
                >
                  <span>🧪 ಲಿಕ್ವಿಡ್ ಉತ್ಪನ್ನಗಳು (Liquid 1 L)</span>
                  <span className="text-amber-400 font-bold">₹350/-</span>
                </LocalizedClientLink>
              </li>
              {productCategories?.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    className="hover:text-amber-400 transition-colors"
                    href={`/categories/${c.handle}`}
                  >
                    {c.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <LocalizedClientLink
                  className="hover:text-amber-400 transition-colors"
                  href="/store"
                >
                  ಎಲ್ಲಾ 10 ಉತ್ಪನ್ನಗಳು (All Products)
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="hover:text-amber-400 transition-colors"
                  href="/cart"
                >
                  ಬುಟ್ಟಿ (Cart & Checkout)
                </LocalizedClientLink>
              </li>
              {collections?.slice(0, 3).map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    className="hover:text-amber-400 transition-colors"
                    href={`/collections/${c.handle}`}
                  >
                    {c.title}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Payments & Assurance */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              ಸುರಕ್ಷಿತ ಪಾವತಿ (Safe Payments)
            </h4>
            <p className="text-xs text-emerald-200/90">
              0% ಹೆಚ್ಚುವರಿ ಶುಲ್ಕದೊಂದಿಗೆ ಎಲ್ಲಾ ಭಾರತೀಯ ಪಾವತಿ ವಿಧಾನಗಳು ಲಭ್ಯ:
            </p>
            <div className="flex items-center gap-2 pt-1">
              <div className="p-1.5 bg-white rounded-md shadow-xs">
                <PhonePeIcon size={24} />
              </div>
              <div className="p-1.5 bg-white rounded-md shadow-xs">
                <PaytmIcon size={24} />
              </div>
              <div className="p-1.5 bg-white rounded-md shadow-xs">
                <UpiIcon size={24} />
              </div>
            </div>
            <p className="text-[11px] text-emerald-300 pt-1 font-medium">
              ✓ PhonePe, Paytm, Google Pay, UPI & Cash on Delivery (COD)
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-emerald-300">
          <p>© {new Date().getFullYear()} BIOTILL AGRI PRIVATE LIMITED. All rights reserved.</p>
          <div className="flex items-center gap-4 text-emerald-400">
            <span>100% Bio-Organic Certified</span>
            <span>•</span>
            <span>Made for Indian Farmers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
