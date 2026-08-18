"use client"

import { Container, clx } from "@modules/common/components/ui"
import React, { useState } from "react"
import Image from "next/image"
import ProductPackagingVisual from "../packaging-visual"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: { url?: string }[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  handle?: string
  title?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured: _isFeatured,
  className,
  handle,
  title,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url
  const [useFallback, setUseFallback] = useState(false)

  const isLiquid =
    handle?.includes("liquid") ||
    title?.toLowerCase().includes("liquid")

  return (
    <Container
      className={clx(
        "relative w-full overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-emerald-50/40 border border-emerald-100/90 shadow-elevation-card-rest rounded-2xl group-hover:shadow-elevation-card-hover group-hover:border-emerald-300 transition-all ease-in-out duration-200",
        className,
        {
          "aspect-square": true,
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      {/* Top Floating Badge */}
      <div className="absolute top-2 left-2 z-20 bg-emerald-800/95 backdrop-blur-xs text-white text-[9.5px] font-black px-2 py-0.5 rounded-full shadow-xs tracking-wider uppercase flex items-center gap-1">
        <span>🌱 BioTill Agri</span>
      </div>

      <div className="absolute top-2 right-2 z-20">
        <span
          className={`text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs ${
            isLiquid
              ? "bg-amber-400 text-amber-950 font-black"
              : "bg-emerald-600 text-white"
          }`}
        >
          {isLiquid ? "1 LITRE" : "1 KG"}
        </span>
      </div>

      {/* Render 3D BioTill Packaging Artwork or fallback */}
      {!initialImage || useFallback ? (
        <ProductPackagingVisual handle={handle} title={title} isLiquid={isLiquid} />
      ) : (
        <div className="w-full h-full relative">
          <ProductPackagingVisual handle={handle} title={title} isLiquid={isLiquid} />
          {/* Subtle background photo overlay if image provided */}
          {initialImage && !useFallback && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
              <Image
                src={initialImage}
                alt={title || "BioTill Agri Product"}
                className="object-cover"
                fill
                onError={() => setUseFallback(true)}
              />
            </div>
          )}
        </div>
      )}
    </Container>
  )
}

export default Thumbnail
