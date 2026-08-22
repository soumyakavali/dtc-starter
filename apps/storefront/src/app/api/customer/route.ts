import { NextResponse } from "next/server"
import { retrieveCustomer } from "@lib/data/customer"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const customer = await retrieveCustomer().catch(() => null)
    return NextResponse.json({
      authenticated: !!customer,
      customer: customer
        ? {
            id: customer.id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            phone: customer.phone,
          }
        : null,
    })
  } catch {
    return NextResponse.json({ authenticated: false, customer: null })
  }
}
