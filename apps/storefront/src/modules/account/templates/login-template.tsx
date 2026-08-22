"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const mode = searchParams.get("mode")
  const hasRedirect = searchParams.get("redirect")

  const [currentView, setCurrentView] = useState<string>(
    mode === "register" ? LOGIN_VIEW.REGISTER : LOGIN_VIEW.SIGN_IN
  )

  useEffect(() => {
    if (mode === "register") {
      setCurrentView(LOGIN_VIEW.REGISTER)
    } else {
      setCurrentView(LOGIN_VIEW.SIGN_IN)
    }
  }, [mode])

  const handleViewChange = (view: LOGIN_VIEW) => {
    setCurrentView(view)
    const params = new URLSearchParams(searchParams.toString())
    if (view === LOGIN_VIEW.REGISTER) {
      params.set("mode", "register")
    } else {
      params.delete("mode")
    }
    const newQuery = params.toString() ? `?${params.toString()}` : ""
    router.replace(`${pathname}${newQuery}`, { scroll: false })
  }

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto">
      {/* Notice Banner when user was redirected from Add-to-Cart */}
      {hasRedirect && (
        <div className="w-full max-w-md mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300/80 shadow-sm text-amber-950 flex items-start gap-3">
          <span className="text-xl">🌾</span>
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-amber-900 text-sm">
              Farmer Registration Required / ರೈತರ ನೋಂದಣಿ ಅಗತ್ಯವಿದೆ
            </p>
            <p className="text-amber-800 leading-relaxed font-medium">
              Please register or sign in to add certified biological products to your cart and place farm delivery orders.
            </p>
            <p className="text-amber-900 text-[11px] font-semibold pt-1">
              ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಲು ಮತ್ತು ಆರ್ಡರ್ ಮಾಡಲು ದಯವಿಟ್ಟು ಖಾತೆ ತೆರೆಯಿರಿ ಅಥವಾ ಲಾಗಿನ್ ಮಾಡಿ.
            </p>
          </div>
        </div>
      )}

      {/* Switcher Tabs */}
      <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl mb-6 w-full max-w-md border border-gray-200 shadow-inner">
        <button
          onClick={() => handleViewChange(LOGIN_VIEW.SIGN_IN)}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
            currentView === LOGIN_VIEW.SIGN_IN
              ? "bg-white text-emerald-900 shadow-sm border border-gray-200/60"
              : "text-gray-600 hover:text-gray-900"
          }`}
          data-testid="tab-sign-in"
        >
          <span>👤</span>
          <span>Sign In / ಲಾಗಿನ್</span>
        </button>
        <button
          onClick={() => handleViewChange(LOGIN_VIEW.REGISTER)}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
            currentView === LOGIN_VIEW.REGISTER
              ? "bg-emerald-700 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
          data-testid="tab-register"
        >
          <span>✨</span>
          <span>Register / ಹೊಸ ನೋಂದಣಿ</span>
        </button>
      </div>

      {currentView === LOGIN_VIEW.SIGN_IN ? (
        <Login setCurrentView={(view) => handleViewChange(view)} />
      ) : (
        <Register setCurrentView={(view) => handleViewChange(view)} />
      )}
    </div>
  )
}

export default LoginTemplate
