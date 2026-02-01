import type React from "react"
import type { Metadata } from "next"
// import { Geist, Geist_Mono, Pacifico } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-store"
import { MascotWidget } from "@/components/mascot/mascot-widget"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { AOSInit } from "@/components/aos-init"
import "./globals.css"

// const _geist = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })
// const _pacifico = Pacifico({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-logo",
// })

export const metadata: Metadata = {
  title: "Frozen Basket - Handcrafted Ice Cream Delivered",
  description:
    "Experience the joy of handcrafted ice cream. Choose from 24 premium flavors or build your own custom mix with our interactive builder.",
  generator: "v0.app",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <CartProvider>
          <AOSInit />
          {children}
          <Analytics />
          <MascotWidget />
          <ThemeSwitcher />
        </CartProvider>
      </body>
    </html>
  )
}
