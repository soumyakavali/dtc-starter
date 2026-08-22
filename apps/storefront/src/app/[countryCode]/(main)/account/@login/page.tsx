import { Metadata } from "next"
import { Suspense } from "react"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Medusa Store account.",
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex justify-center py-20 text-emerald-800 font-medium">
          Loading account access...
        </div>
      }
    >
      <LoginTemplate />
    </Suspense>
  )
}

