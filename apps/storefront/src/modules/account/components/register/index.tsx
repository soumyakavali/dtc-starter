"use client"

import { useActionState, useState } from "react"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")

  return (
    <div
      className="max-w-md w-full flex flex-col items-center bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm"
      data-testid="register-page"
    >
      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 text-emerald-700 text-2xl font-bold shadow-inner">
        🌾
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
        Farmer Registration
      </h1>
      <p className="text-sm font-medium text-emerald-700 mb-2">
        ಹೊಸ ರೈತರ ನೋಂದಣಿ (BioTill Agri)
      </p>
      <p className="text-center text-xs text-gray-500 mb-6 max-w-xs">
        Register with your mobile number and password to place orders with farm delivery across Karnataka.
      </p>

      <form className="w-full flex flex-col gap-y-4" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                First Name / ಹೆಸರು *
              </label>
              <input
                name="first_name"
                type="text"
                placeholder="Basavaraj"
                required
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                data-testid="first-name-input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Last Name / ಅಡ್ಡಹೆಸರು
              </label>
              <input
                name="last_name"
                type="text"
                placeholder="Patil"
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                data-testid="last-name-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Mobile Number / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500 text-sm font-medium">
                +91
              </span>
              <input
                name="phone"
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "")
                  setPhone(val)
                  if (!username) {
                    setUsername(val)
                  }
                }}
                required
                className="w-full pl-12 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition font-mono font-medium"
                data-testid="phone-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Username / ಬಳಕೆದಾರ ಹೆಸರು (Optional)
            </label>
            <input
              name="username"
              type="text"
              placeholder="e.g. basavaraj_patil"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              data-testid="username-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Village / Taluk / ಊರು
              </label>
              <input
                name="village"
                type="text"
                placeholder="e.g. Vijayapura / Bagalkot"
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Primary Crop / ಬೆಳೆ
              </label>
              <input
                name="crop"
                type="text"
                placeholder="Sugarcane / Paddy"
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Set Password / ಪಾಸ್‌ವರ್ಡ್ *
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              data-testid="password-input"
            />
          </div>
        </div>

        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="register-error"
        />

        <span className="text-center text-gray-500 text-xs mt-2">
          By registering, you agree to BioTill Agri&apos;s{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline text-emerald-700"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>

        <SubmitButton className="w-full mt-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl shadow-md transition" data-testid="register-button">
          Register & Continue / ನೋಂದಾಯಿಸಿ
        </SubmitButton>
      </form>

      <div className="w-full mt-6 pt-6 border-t border-gray-100 flex flex-col items-center gap-2">
        <span className="text-center text-gray-600 text-sm">
          Already registered? / ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-emerald-700 font-bold hover:underline"
          >
            Sign In / ಲಾಗಿನ್ ಮಾಡಿ
          </button>
        </span>
      </div>
    </div>
  )
}

export default Register
