"use client"

import { useState } from "react"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-8 max-w-xl mx-auto">
      {/* Switcher Tabs */}
      <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl mb-6 w-full max-w-md border border-gray-200 shadow-inner">
        <button
          onClick={() => setCurrentView("sign-in")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
            currentView === "sign-in"
              ? "bg-white text-emerald-900 shadow-sm border border-gray-200/60"
              : "text-gray-600 hover:text-gray-900"
          }`}
          data-testid="tab-sign-in"
        >
          <span>👤</span>
          <span>Sign In / ಲಾಗಿನ್</span>
        </button>
        <button
          onClick={() => setCurrentView("register")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
            currentView === "register"
              ? "bg-emerald-700 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
          data-testid="tab-register"
        >
          <span>✨</span>
          <span>Register / ಹೊಸ ನೋಂದಣಿ</span>
        </button>
      </div>

      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  )
}

export default LoginTemplate
