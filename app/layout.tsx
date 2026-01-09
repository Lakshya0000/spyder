import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, Geist_Mono } from "next/font/google"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Spyder - Web Security Platform",
  description:
    "Securing the web with real-time threat detection and prevention. Protect your applications with intelligent security insights.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
