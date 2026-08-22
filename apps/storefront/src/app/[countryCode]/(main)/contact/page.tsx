import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Contact Us - BioTill Biotech Solutions",
  description:
    "Get direct farmer support, agronomy advice, crop dosage guidance, or place orders with BioTill Biotech Solutions.",
}

export default function ContactPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white py-14 border-b border-emerald-800">
        <div className="content-container text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 border border-emerald-600/70 text-emerald-200 text-xs font-bold rounded-full">
            <span>📞</span>
            <span>Farmer Helpline & Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Contact BioTill Biotech Solutions
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Need crop advisory, dosage calculation, or assistance with your order? Our agricultural experts are here to assist you.
          </p>
          <p className="text-amber-300 font-bold text-xs sm:text-sm">
            ರೈತರ ಸೇವೆಗಾಗಿ ಸದಾ ಸಿದ್ಧ • ಉಚಿತ ಬೆಳೆ ಸಲಹೆ ಮತ್ತು ವಿಚಾರಣೆ
          </p>
        </div>
      </section>

      {/* Contact Cards & Direct Support */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="content-container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Direct Helpline */}
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mx-auto text-xl shadow-xs">
                  📞
                </div>
                <h3 className="font-extrabold text-base text-gray-900">Direct Phone Helpline</h3>
                <p className="text-xs text-gray-600">
                  Speak directly with our agronomy and order support team.
                </p>
                <p className="text-xs text-emerald-800 font-bold">ಕರೆ ಮಾಡಿ: ಬೆಳಿಗ್ಗೆ 8 ರಿಂದ ರಾತ್ರಿ 8</p>
              </div>
              <a
                href="tel:+919480123456"
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm"
              >
                +91 94801 23456
              </a>
            </div>

            {/* Card 2: WhatsApp Chat */}
            <div className="p-6 bg-green-50 rounded-2xl border border-green-200 text-center space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center mx-auto text-xl shadow-xs">
                  💬
                </div>
                <h3 className="font-extrabold text-base text-gray-900">WhatsApp Advisory</h3>
                <p className="text-xs text-gray-600">
                  Send photos of diseased leaves or soil questions for instant recommendation.
                </p>
                <p className="text-xs text-green-800 font-bold">ವಾಟ್ಸ್ಆ್ಯಪ್ ಸಲಹೆ</p>
              </div>
              <a
                href="https://wa.me/919480123456?text=Namaskara,%20I%20have%20an%20inquiry%20about%20BioTill%20biotech%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Card 3: Email & Agronomy Hub */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200 text-center space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center mx-auto text-xl shadow-xs">
                  🏢
                </div>
                <h3 className="font-extrabold text-base text-gray-900">BioTill Agri Hub</h3>
                <p className="text-xs text-gray-600">
                  Karnataka & National Distribution Hub, India
                </p>
                <p className="text-xs text-gray-700 font-bold">Email: support@biotill.agri</p>
              </div>
              <LocalizedClientLink
                href="/store"
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm"
              >
                Browse All Products
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </section>

      {/* Free Delivery Banner */}
      <section className="py-10 bg-emerald-950 text-white border-t border-emerald-800">
        <div className="content-container text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800 rounded-full text-amber-300 font-bold text-xs">
            <span>🚚</span>
            <span>Free Agricultural Farm Express</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Orders of ₹999 or more get FREE delivery anywhere in India</h2>
          <div className="pt-2">
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs transition-transform hover:scale-105 shadow-md"
            >
              <span>Shop All 10 Bio-Products</span>
              <span>→</span>
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </div>
  )
}
