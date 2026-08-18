import React from "react"

const GPayIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="48" height="48" rx="10" fill="#FFFFFF" stroke="#E5E7EB" />
      <path
        d="M24 16C26.5 16 28.5 17 29.5 18L32.5 15C30.2 13 27.3 12 24 12C17.4 12 12 17.4 12 24C12 30.6 17.4 36 24 36C30.6 36 35.5 31.4 35.5 24.5C35.5 23.8 35.4 23.1 35.3 22.5H24V26.5H30.8C30.2 29.5 27.5 32 24 32C19.6 32 16 28.4 16 24C16 19.6 19.6 16 24 16Z"
        fill="#4285F4"
      />
    </svg>
  )
}

export default GPayIcon
