import React from "react"

const UpiIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="48" height="48" rx="10" fill="#0D5E3A" />
      <path
        d="M12 28L21 14H30L21 28H12Z"
        fill="#00B050"
      />
      <path
        d="M25 28L34 14H39L30 28H25Z"
        fill="#FF9933"
      />
      <path
        d="M15 34H33V31H15V34Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export default UpiIcon
