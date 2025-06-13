import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
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
<<<<<<< HEAD
    <html lang="no">
<<<<<<< HEAD
      <ClerkProvider>
      <body className={inter.className}>{children}</body>
      </ClerkProvider>
=======
      <body className={inter.className}>{children}</body>
>>>>>>> 6f6226929a9f7fe9fa60fecfc28790be6c60b605
    </html>
=======
    <ClerkProvider>
      <html lang="no">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
>>>>>>> parent of 9252071 (Added: Added admin-page with sessions)
  )
}
