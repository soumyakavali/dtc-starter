import { Metadata } from "next"
import Hero from "@modules/home/components/hero"
import TrustFeatures from "@modules/home/components/trust-features"
import CategoryShowcase from "@modules/home/components/category-showcase"
import DealOfTheDay from "@modules/home/components/deal-of-the-day"
import DosageCalculator from "@modules/home/components/dosage-calculator"
import AboutBiotech from "@modules/home/components/about-biotech"
import FarmerTestimonials from "@modules/home/components/farmer-testimonials"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "BioTill Biotech - Direct Agricultural Biotechnology Solutions",
  description:
    "100% certified bio-fertilizers, biopesticides, and crop stimulants for farmers. Clean pricing: Powder at ₹150 (1 Kg) & Liquid at ₹350 (1 L). Direct farm delivery across India.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  return (
    <div className="w-full font-sans bg-white">
      {/* Hero Section */}
      <Hero />

      {/* 4 Core Value Pillars (Fast Delivery, Safe Payments, Certified Quality, Helpline) */}
      <TrustFeatures />

      {/* Shop By Bio-Category (Circular Cards) */}
      <CategoryShowcase />

      {/* Deal of the Day & Featured Formulations with Tabs */}
      <DealOfTheDay region={region || undefined} />

      {/* Farmer Crop Advisory & Dosage Calculator */}
      <DosageCalculator />

      {/* Biotechnology & Sustainable Research Mission */}
      <AboutBiotech />

      {/* Farmer Success Stories & Testimonials */}
      <FarmerTestimonials />
    </div>
  )
}
