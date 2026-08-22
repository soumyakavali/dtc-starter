import React from "react"

const TRUST_ITEMS = [
  {
    icon: "🚚",
    title: "Fast Delivery Across India",
    titleKn: "ತ್ವರಿತ ಕೃಷಿ ವಿತರಣೆ",
    description:
      "Direct dispatch to farm gates, taluk centers & rural pincodes with live tracking and secure packaging.",
  },
  {
    icon: "💳",
    title: "100% Safe Payments",
    titleKn: "ಸುರಕ್ಷಿತ ಪಾವತಿಗಳು",
    description:
      "Instant checkout via PhonePe, Paytm, Google Pay, BHIM UPI, Cards or Cash on Delivery (COD).",
  },
  {
    icon: "🔬",
    title: "Certified High CFU Bio-Inputs",
    titleKn: "ಪ್ರಮಾಣೀಕೃತ ಜೈವಿಕ ಗುಣಮಟ್ಟ",
    description:
      "100% organic, residue-free biological strains tested for maximum viable colony count & zero chemicals.",
  },
  {
    icon: "📞",
    title: "Agronomist Helpline & Guidance",
    titleKn: "ಉಚಿತ ಕೃಷಿ ತಜ್ಞರ ಮಾರ್ಗದರ್ಶನ",
    description:
      "Dedicated crop specialists for dosage calculation, disease diagnosis and application schedule advice.",
  },
]

export default function TrustFeatures() {
  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100/80 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0 border border-emerald-100">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 text-sm">
                  {item.title}
                </h3>
                <p className="text-[11px] font-bold text-emerald-800">
                  {item.titleKn}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed pt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
