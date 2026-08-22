"use client"

import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useActionState, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect")

  const [message, formAction] = useActionState(login, null)
  const [identifier, setIdentifier] = useState("")

  useEffect(() => {
    if (message?.state === "success") {
      if (redirectUrl) {
        router.push(redirectUrl)
      } else {
        router.push("/account")
      }
      router.refresh()
    }
  }, [message, redirectUrl, router])

  return (
    <div
      className="max-w-md w-full flex flex-col items-center bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm"
      data-testid="login-page"
    >
      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-emerald-700 text-2xl font-bold shadow-inner">
        🌱
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
        Farmer Sign In
      </h1>
      <p className="text-sm font-medium text-emerald-700 mb-2">
        ರೈತರ ಲಾಗಿನ್ (BioTill Agri)
      </p>
      <p className="text-center text-xs text-gray-500 mb-6 max-w-xs">
        Enter your Mobile Number or Username and Password to access your farm orders and special pricing.
      </p>

      <form className="w-full flex flex-col gap-y-4" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Mobile Number or Username / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ
            </label>
            <input
              name="email"
              type="text"
              placeholder="e.g. 9876543210 or basavaraj"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              data-testid="identifier-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Password / ಪಾಸ್‌ವರ್ಡ್
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              data-testid="password-input"
            />
          </div>
        </div>

        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="login-error-message"
        />

        <SubmitButton data-testid="sign-in-button" className="w-full mt-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl shadow-md transition">
          Sign In / ಲಾಗಿನ್ ಮಾಡಿ
        </SubmitButton>
      </form>

      <div className="w-full mt-6 pt-6 border-t border-gray-100 flex flex-col items-center gap-2">
        <span className="text-center text-gray-600 text-sm">
          New Farmer? / ಹೊಸ ರೈತರು?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="text-emerald-700 font-bold hover:underline"
            data-testid="register-button"
          >
            Register Here / ನೋಂದಾಯಿಸಿ
          </button>
        </span>
        <span className="text-xs text-gray-400 text-center">
          ✓ Simple password login • No OTP required
        </span>
      </div>
    </div>
  )
}

export default Login
