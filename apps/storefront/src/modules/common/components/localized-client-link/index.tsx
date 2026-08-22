"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  className,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  passHref?: true
  [x: string]: unknown
}) => {
  const params = useParams()
  const countryCode = (params?.countryCode as string) || "in"

  // Normalize path so it always has /countryCode prefix without duplicating
  const normalizedHref = href.startsWith(`/${countryCode}`)
    ? href
    : `/${countryCode}${href.startsWith("/") ? href : `/${href}`}`

  return (
    <Link
      href={normalizedHref}
      prefetch={true}
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}

export default LocalizedClientLink
