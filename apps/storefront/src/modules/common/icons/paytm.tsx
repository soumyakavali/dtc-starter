import React from "react"

const PaytmIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="48" height="48" rx="10" fill="#002E6E" />
      <path
        d="M10 18H16C19 18 21 19.5 21 22.5C21 25.5 19 27 16 27H13.5V32H10V18ZM13.5 24H15.8C16.9 24 17.5 23.4 17.5 22.5C17.5 21.6 16.9 21 15.8 21H13.5V24Z"
        fill="#00BAF2"
      />
      <path
        d="M24 18H28V32H24V18Z"
        fill="#00BAF2"
      />
      <path
        d="M31 18H38V21.5H33.5V23.5H37.5V26.5H33.5V32H30V18H31Z"
        fill="white"
      />
    </svg>
  )
}

export default PaytmIcon
