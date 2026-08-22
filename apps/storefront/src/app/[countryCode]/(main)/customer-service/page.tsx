import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Customer Service & Kisan Support - BioTill Biotech Solutions",
  description:
    "Get help with orders, shipments, returns, agricultural dosage guides, and farmer support from BioTill Biotech Solutions.",
}

export default function CustomerServicePage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white py-14 border-b border-emerald-800">
        <div className="content-container text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 border border-emerald-600/70 text-emerald-200 text-xs font-bold rounded-full">
            <span>🛡️</span>
            <span>Customer Service & Kisan Support Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            We Are Here to Assist Every Farmer
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Find answers to frequently asked questions about orders, delivery, organic bio-inputs, dosage recommendations, and direct farmer support.
          </p>
          <p className="text-amber-300 font-bold text-xs sm:text-sm">
            ಗ್ರಾಹಕ ಸೇವೆ ಮತ್ತು ಕಿಸಾನ್ ಸಹಾಯ ಕೇಂದ್ರ • ರೈತರ ಬೆನ್ನೆಲುಬು ಬಯೋಟಿಲ್ಲ್
          </p>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="content-container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-2">📦</div>
                <h3 className="font-bold text-gray-900 text-base">Order & Tracking Support</h3>
                <p className="text-xs text-gray-600 mt-1">Check your shipment status, delivery tracking numbers, or dispatch details.</p>
              </div>
              <LocalizedClientLink
                href="/account/orders"
                className="inline-block text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                View My Orders →
              </LocalizedClientLink>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-2">🧪</div>
                <h3 className="font-bold text-gray-900 text-base">Crop Dosage & Advisory</h3>
                <p className="text-xs text-gray-600 mt-1">Get precise application rates for Trichoderma, Rhizobium, and Bio-Pesticides.</p>
              </div>
              <LocalizedClientLink
                href="/calculator"
                className="inline-block text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                Open Dosage Calculator →
              </LocalizedClientLink>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-2xl mb-2">📞</div>
                <h3 className="font-bold text-gray-900 text-base">Direct Kisan Helpline</h3>
                <p className="text-xs text-gray-600 mt-1">Speak directly with our agronomist experts or request a callback.</p>
              </div>
              <LocalizedClientLink
                href="/contact"
                className="inline-block text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                Contact & Support →
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-white">
        <div className="content-container max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-sm text-gray-600">
              ಉಳಿದ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಉತ್ತರಗಳು • Common questions from our farming community
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl border border-gray-200 bg-emerald-50/40 space-y-2">
              <h3 className="font-bold text-gray-900 text-base">
                1. How long does standard farm delivery take?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Standard deliveries to rural and semi-urban agricultural hubs take between 3 to 5 business days. Express direct-farm delivery is also available for urgent crop protection needs.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 bg-emerald-50/40 space-y-2">
              <h3 className="font-bold text-gray-900 text-base">
                2. Are BioTill bio-inputs certified by agricultural universities?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Yes! All our bio-fertilizers and bio-pesticides (Trichoderma, Pseudomonas, Rhizobium, etc.) are manufactured under strict ICAR and state agricultural university quality standards with 100% organic certification.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 bg-emerald-50/40 space-y-2">
              <h3 className="font-bold text-gray-900 text-base">
                3. What payment methods are accepted for orders?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We support PhonePe UPI, Paytm, Google Pay, BHIM UPI, credit/debit cards, net banking, and Cash on Delivery (COD) with doorstep inspection for farmers.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 bg-emerald-50/40 space-y-2">
              <h3 className="font-bold text-gray-900 text-base">
                4. How can I apply promotion coupons like WELCOME10 or FARMER10?
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                You can enter valid promotion codes directly in your cart or during checkout. Valid codes (e.g. WELCOME10, FARMER10, BIOTILL50) apply immediate discounts to your order subtotal.
              </p>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-4">
              Still need assistance? Our support team is available Monday to Saturday (8:00 AM – 8:00 PM IST).
            </p>
            <LocalizedClientLink
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl transition-all shadow-sm"
            >
              Contact Agronomy Support
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </div>
  )
}
