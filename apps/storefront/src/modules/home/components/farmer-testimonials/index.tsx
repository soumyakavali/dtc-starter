import React from "react"

const TESTIMONIALS = [
  {
    name: "Basavaraj Patil",
    location: "Belagavi, Karnataka",
    crop: "Sugarcane (ಕಬ್ಬು)",
    image: "👨‍🌾",
    quote:
      "ನನ್ನ ಕಬ್ಬಿನ ಗದ್ದೆಯಲ್ಲಿ ಗೊಣ್ಣೆ ಹುಳುವಿನ ಬಾಧೆ ಹೆಚ್ಚಾಗಿತ್ತು. ಮೆಟಾರೈಸಿಯಂ ಮತ್ತು ಬಯೋ ಎನ್ಪಿಕೆ ಲಿಕ್ವಿಡ್ ಬಳಸಿದ ನಂತರ ಗೊಣ್ಣೆ ಹುಳು ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣಕ್ಕೆ ಬಂದು, ಎಕರೆಗೆ 12 ಟನ್ ಇಳುವರಿ ಹೆಚ್ಚಾಯಿತು.",
    quoteEn:
      "Metarhizium & Bio NPK Liquid completely eradicated white grubs in my sugarcane field. Cane weight increased by 12 tonnes per acre.",
    product: "Metarhizium + Bio NPK Liquid",
    stars: 5,
  },
  {
    name: "Manjunath Hegde",
    location: "Sirsi, Uttara Kannada",
    crop: "Arecanut & Pepper (ಅಡಿಕೆ & ಕಾಳುಮೆಣಸು)",
    image: "👨‍🌾",
    quote:
      "ಅಡಿಕೆಯಲ್ಲಿ ಬೇರು ಕೊಳೆತ ಮತ್ತು ಮಹಾಳಿ ರೋಗಕ್ಕೆ ಟ್ರೈಕೋಡರ್ಮಾ ಲಿಕ್ವಿಡ್ ಡ್ರೆಂಚಿಂಗ್ ಮಾಡಿದೆವು. ಗಿಡಗಳು ಹಚ್ಚಹಸಿರಾಗಿ ಚಿಗುರೊಡೆದು ಕಾಯಿ ಕಟ್ಟುವುದು ಹೆಚ್ಚಾಗಿದೆ.",
    quoteEn:
      "Trichoderma Liquid basin drenching saved our arecanut grove from root rot and Koleroga during heavy rains. Excellent crop vigor.",
    product: "Trichoderma Liquid Concentrate",
    stars: 5,
  },
  {
    name: "Shivanna Gowda",
    location: "Mandya, Karnataka",
    crop: "Paddy (ಭತ್ತ) & Vegetables",
    image: "👨‍🌾",
    quote:
      "ಸುಡೋಮೊನಾಸ್ ಮತ್ತು ವ್ಯಾಮ್ ಪೌಡರ್ ಬಳಸಿದ್ದರಿಂದ ಭತ್ತದಲ್ಲಿ ಬೆಂಕಿರೋಗ ಬರಲಿಲ್ಲ. ಕಡಿಮೆ ವೆಚ್ಚದಲ್ಲಿ ₹150/- ಪ್ಯಾಕ್‌ನಿಂದ ಉತ್ತಮ ರಕ್ಷಣೆ ಸಿಕ್ಕಿದೆ.",
    quoteEn:
      "Using Pseudomonas and VAM powder prevented blast disease in paddy. Genuine high-potency bio products at just ₹150 per pack.",
    product: "Pseudomonas + VAM Powder",
    stars: 5,
  },
]

export default function FarmerTestimonials() {
  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="content-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black rounded-full mb-2 uppercase tracking-wider">
            ★ Farmer Success Stories / ರೈತರ ಅನುಭವಗಳು
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Trusted by Progressive Farmers Across Karnataka & India
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Real field results from farmers utilizing bio-fertilizers, microbial pest controllers, and soil enrichers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 p-6 rounded-3xl border border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    Verified Farmer
                  </span>
                </div>

                <p className="text-xs text-gray-800 font-medium leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <p className="text-[11px] text-gray-500 leading-normal">
                  {item.quoteEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-xs">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-emerald-800 font-semibold">
                    {item.crop} • {item.location}
                  </p>
                </div>
                <span className="text-2xl">{item.image}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
