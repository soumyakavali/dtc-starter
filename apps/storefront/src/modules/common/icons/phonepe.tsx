import React from "react"

const PhonePeIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="48" height="48" rx="10" fill="#5F259F" />
      <path
        d="M28.4 24.1C30.6 23.3 32.1 21.2 32.1 18.5C32.1 14.5 28.9 12 24.3 12H15V36H20.8V26.2H24.1L29.6 36H35.8L29.5 25.1C29.1 24.7 28.7 24.4 28.4 24.1ZM20.8 16.9H23.9C25.7 16.9 26.8 17.6 26.8 19C26.8 20.4 25.7 21.2 23.9 21.2H20.8V16.9Z"
        fill="white"
      />
    </svg>
  )
}

export default PhonePeIcon
