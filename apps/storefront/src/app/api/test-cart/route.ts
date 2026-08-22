import { NextResponse } from "next/server"
import { runCartUITestSuite } from "@lib/data/__tests__/cart-flow.spec"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const results = await runCartUITestSuite()
    const allPassed = results.every((r) => r.status === "PASSED")

    return NextResponse.json({
      status: allPassed ? "SUCCESS" : "FAILURES_DETECTED",
      timestamp: new Date().toISOString(),
      testsCount: results.length,
      passedCount: results.filter((r) => r.status === "PASSED").length,
      failedCount: results.filter((r) => r.status === "FAILED").length,
      results,
    })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to execute cart test suite"
    return NextResponse.json(
      {
        status: "ERROR",
        message: msg,
      },
      { status: 500 }
    )
  }
}
