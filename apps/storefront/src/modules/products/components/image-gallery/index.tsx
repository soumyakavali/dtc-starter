"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import ProductPackagingVisual from "../packaging-visual"

type ImageGalleryProps = {
  images?: HttpTypes.StoreProductImage[]
  handle?: string
  title?: string
}

const ImageGallery = ({
  images: _images,
  handle = "",
  title = "",
}: ImageGalleryProps) => {
  const isLiquid =
    handle?.includes("liquid") || title?.toLowerCase().includes("liquid")

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-8 gap-y-4">
        {/* Main 3D BioTill Packaging Visual Card */}
        <Container className="relative aspect-square w-full max-w-[550px] mx-auto overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/30 rounded-3xl border border-emerald-200/80 shadow-lg p-6">
          <ProductPackagingVisual
            handle={handle}
            title={title}
            isLiquid={isLiquid}
            className="w-full h-full"
          />
        </Container>

        {/* Feature Badges under Product Image */}
        <div className="grid grid-cols-3 gap-2 text-center max-w-[550px] mx-auto w-full">
          <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100">
            <span className="text-base block">🛡️</span>
            <span className="text-[11px] font-extrabold text-emerald-900 block">100% Bio-Active</span>
            <span className="text-[9px] text-gray-500 font-medium">ಜೈವಿಕ ಪ್ರಮಾಣೀಕೃತ</span>
          </div>
          <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100">
            <span className="text-base block">📦</span>
            <span className="text-[11px] font-extrabold text-emerald-900 block">
              {isLiquid ? "1 Litre Bottle" : "1 Kg Pouch"}
            </span>
            <span className="text-[9px] text-gray-500 font-medium">ಸುರಕ್ಷಿತ ಸೀಲ್ ಪ್ಯಾಕ್</span>
          </div>
          <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100">
            <span className="text-base block">🚚</span>
            <span className="text-[11px] font-extrabold text-emerald-900 block">Farm Delivery</span>
            <span className="text-[9px] text-gray-500 font-medium">ನೇರ ಮನೆ ಬಾಗಿಲಿಗೆ</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery
