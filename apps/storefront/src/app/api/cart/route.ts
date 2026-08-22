import { NextRequest, NextResponse } from "next/server"
import {
  addToCart,
  retrieveCart,
  updateLineItem,
  deleteLineItem,
  applyPromotions,
  getOrSetCart,
} from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const countryCode = searchParams.get("countryCode") || "in"
    const cart = (await retrieveCart()) || (await getOrSetCart(countryCode))
    return NextResponse.json({ success: true, cart })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to fetch cart"
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, variantId, quantity = 1, countryCode = "in", codes, lineId } = body

    // 1. Enforce Farmer Authentication Gate when adding items to cart
    if (action === "add" || variantId) {
      const customer = await retrieveCustomer().catch(() => null)
      if (!customer) {
        return NextResponse.json(
          {
            success: false,
            requireAuth: true,
            redirect: `/${countryCode || "in"}/account?mode=register`,
            message:
              "Please register or sign in to add items to your cart / ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಲು ದಯವಿಟ್ಟು ನೋಂದಾಯಿಸಿ ಅಥವಾ ಲಾಗಿನ್ ಮಾಡಿ",
          },
          { status: 401 }
        )
      }

      await addToCart({
        variantId: variantId,
        quantity: Number(quantity) || 1,
        countryCode: countryCode || "in",
      })
      const cart = await retrieveCart()
      return NextResponse.json({ success: true, message: "Item added to cart", cart })
    }

    if (action === "update" && lineId) {
      await updateLineItem({
        lineId,
        quantity: Number(quantity) || 1,
      })
      const cart = await retrieveCart()
      return NextResponse.json({ success: true, message: "Line item updated", cart })
    }

    if (action === "delete" && lineId) {
      await deleteLineItem(lineId)
      const cart = await retrieveCart()
      return NextResponse.json({ success: true, message: "Line item removed", cart })
    }

    if (action === "promo" && Array.isArray(codes)) {
      await applyPromotions(codes)
      const cart = await retrieveCart()
      return NextResponse.json({ success: true, message: "Promo applied", cart })
    }

    // Default fallback return
    const cart = await retrieveCart()
    return NextResponse.json({ success: true, cart })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Cart operation failed"
    console.error("API /api/cart error:", error)
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    )
  }
}
