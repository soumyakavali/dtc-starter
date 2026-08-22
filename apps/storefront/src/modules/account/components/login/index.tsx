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
  const [password, setPassword] = useState("")

  const fillDemoAccount = () => {
    setIdentifier("9845012345")
    setPassword("farmer123")
  }

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
      className="max-w-md w-full flex flex-col items-center bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm"
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
      <p className="text-center text-xs text-gray-500 mb-5 max-w-xs">
        Enter your Mobile Number or Username and Password to access your farm orders and special pricing.
      </p>

      {/* Demo Farmer Account Helper Box */}
      <div className="w-full mb-5 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-100/40 border border-emerald-200 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
              🌾 Demo Farmer Account
            </span>
            <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-black px-2 py-0.5 rounded-full">
              Test Ready
            </span>
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold">
            ಪರೀಕ್ಷಾ ಖಾತೆ
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/80 p-2.5 rounded-xl border border-emerald-200/70 mb-3">
          <div>
            <span className="text-gray-400 block text-[10px]">Farmer / ಹೆಸರು</span>
            <span className="font-bold text-gray-800">Basavaraj Patil</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">District / ಜಿಲ್ಲೆ</span>
            <span className="font-semibold text-emerald-800">Mandya, Karnataka</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Mobile / ಮೊಬೈಲ್</span>
            <span className="font-mono font-bold text-gray-900">9845012345</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Password / ಪಾಸ್‌ವರ್ಡ್</span>
            <span className="font-mono font-bold text-gray-900">farmer123</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fillDemoAccount}
            className="flex-1 py-1.5 px-3 rounded-lg bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold transition shadow-2xs cursor-pointer flex items-center justify-center gap-1"
            data-testid="fill-demo-credentials-btn"
          >
            <span>📝</span> Fill Demo Info
          </button>
          <form action={formAction} className="flex-1">
            <input type="hidden" name="email" value="9845012345" />
            <input type="hidden" name="password" value="farmer123" />
            <button
              type="submit"
              className="w-full py-1.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-1"
              data-testid="quick-demo-login-btn"
            >
              <span>⚡</span> 1-Click Sign In
            </button>
          </form>
        </div>
      </div>

      <form className="w-full flex flex-col gap-y-4" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Mobile Number or Username / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ
            </label>
            <input
              name="email"
              type="text"
              placeholder="e.g. 9845012345 or basavaraj"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <SubmitButton data-testid="sign-in-button" className="w-full mt-1 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl shadow-md transition">
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
