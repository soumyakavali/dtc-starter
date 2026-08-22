import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import LeafIcon from "@modules/common/icons/leaf"
import PhonePeIcon from "@modules/common/icons/phonepe"
import PaytmIcon from "@modules/common/icons/paytm"
import UpiIcon from "@modules/common/icons/upi"

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-emerald-900/30 bg-emerald-950 text-emerald-100 w-full font-sans">
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
                  BioTill<span className="text-emerald-400">Biotech</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-300">
                  BIOTILL BIOTECH SOLUTIONS
                </span>
              </div>
            </LocalizedClientLink>
            <p className="text-xs text-emerald-200/90 leading-relaxed max-w-sm">
              Transforming agriculture through science, sustainability, and bio-innovation. High-potency certified bio-fertilizers, biopesticides, and crop stimulants delivered directly to farmers across India.
            </p>
            <div className="space-y-1.5 text-xs text-emerald-300">
              <p className="flex items-center gap-1.5">
                <span>🏢</span> <strong>BIOTILL BIOTECH SOLUTIONS AGRI</strong>
              </p>
              <p className="flex items-center gap-1.5">
                <span>📍</span> <strong>Agronomy Hub:</strong> Karnataka, India
              </p>
              <p className="flex items-center gap-1.5">
                <span>📞</span> <strong>Helpline:</strong> +91 94801 23456 / Support
              </p>
            </div>
          </div>

          {/* Bio Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
              <span>🌿</span> Product Categories
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <LocalizedClientLink
                  className="hover:text-amber-400 transition-colors flex items-center justify-between"
                  href="/collections/powder-products"
                >
                  <span>📦 Powder Formulations (1 Kg)</span>
                  <span className="text-amber-400 font-bold">₹150/-</span>
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="hover:text-amber-400 transition-colors flex items-center justify-between"
                  href="/collections/liquid-products"
                >
                  <span>🛢️ Liquid Formulations (1 Litre)</span>
                  <span className="text-emerald-300 font-bold">₹350/-</span>
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="hover:text-white transition-colors"
                  href="/store"
                >
                  🌱 Bio-Fertilizers & NPK Consortia
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="hover:text-white transition-colors"
                  href="/store"
                >
                  🛡️ Bio-Pesticides & Bio-Fungicides
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="hover:text-white transition-colors"
                  href="/products/vam-powder"
                >
                  🌾 Mycorrhizal Bio-Stimulants (VAM)
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Farmer Advisory & Helpline */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
              <span>👨‍🌾</span> Farmer Support
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200">
              <li>
                <LocalizedClientLink className="hover:text-white transition-colors" href="/about">
                  About Us
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink className="hover:text-white transition-colors" href="/contact">
                  Contact Us & Helpline
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink className="hover:text-white transition-colors" href="/store">
                  All Bio-Products
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink className="hover:text-white transition-colors" href="/account">
                  Farmer Account
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink className="text-emerald-300 hover:text-white font-bold transition-colors flex items-center gap-1" href="/tests">
                  <span>🧪 Run Live E2E Tests</span>
                </LocalizedClientLink>
              </li>
              <li>
                <a
                  className="hover:text-amber-400 transition-colors font-bold text-amber-300 flex items-center gap-1"
                  href="tel:+919480123456"
                >
                  <span>📞 Toll-Free Helpline</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Trust Badges & Direct Payment Support */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-1.5">
              <span>🔒</span> 100% Safe Payments
            </h4>
            <p className="text-xs text-emerald-300">
              Direct UPI payment via PhonePe, Paytm, Google Pay, NetBanking & Cash on Delivery.
            </p>
            <div className="flex items-center gap-2 pt-2">
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
              ✓ PhonePe, Paytm, Google Pay, BHIM UPI & COD
            </p>
            <div className="pt-2 text-[11px] text-emerald-400 border-t border-emerald-800/80">
              <p>🌱 CIB & FCO Certified Biological Formulations</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-emerald-300">
          <p suppressHydrationWarning>© {new Date().getFullYear()} BioTill Biotech Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4 text-emerald-400">
            <span>100% Certified Bio-Organic</span>
            <span>•</span>
            <span>Made with Science for Indian Farmers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
