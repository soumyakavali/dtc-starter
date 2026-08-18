import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import ActionRecovery from "@modules/common/components/action-recovery"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ActionRecovery />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
