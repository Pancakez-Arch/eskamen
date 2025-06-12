import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Treningsglede AS - Din Partner for Aktiv Livsstil",
  description:
    "Treningsglede AS tilbyr inspirerende treningsøkter både innendørs og utendørs. Bli med i vårt inkluderende fellesskap og opplev gleden ved å være aktiv.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="no">
        <body className={inter.className}>{children}</body>
      </html>
  )
}
