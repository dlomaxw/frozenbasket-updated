"use client"

import React from "react"
import { MenuIcon, X, ShoppingBag } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Logo } from "./logo"

interface SiteHeaderProps {
  cartCount?: number
}

export function SiteHeader({ cartCount = 0 }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNav = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  const isActive = (path: string) =>
    pathname === path ? "text-brandBlue font-semibold" : "text-brandCocoa hover:text-brandBlue"

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-brandPeach/20 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0 cursor-pointer -ml-4" onClick={() => handleNav("/")}>
            <Logo />
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => handleNav("/")} className={isActive("/")}>
              Home
            </button>
            <button onClick={() => handleNav("/menu")} className={isActive("/menu")}>
              Menu
            </button>

            <button onClick={() => handleNav("/about")} className={isActive("/about")}>
              About
            </button>
            <button onClick={() => handleNav("/contact")} className={isActive("/contact")}>
              Contact
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNav("/cart")}
              className="relative p-2 text-brandCocoa hover:text-brandBlue transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brandPeach text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden text-brandCocoa" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-brandPeach/20 absolute w-full left-0 animate-fade-in shadow-xl z-50">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button
              onClick={() => handleNav("/")}
              className="block w-full text-left px-3 py-3 text-brandCocoa text-lg font-medium hover:bg-brandPeach/10 rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => handleNav("/menu")}
              className="block w-full text-left px-3 py-3 text-brandCocoa text-lg font-medium hover:bg-brandPeach/10 rounded-md"
            >
              Menu
            </button>

            <button
              onClick={() => handleNav("/about")}
              className="block w-full text-left px-3 py-3 text-brandCocoa text-lg font-medium hover:bg-brandPeach/10 rounded-md"
            >
              About
            </button>
            <button
              onClick={() => handleNav("/contact")}
              className="block w-full text-left px-3 py-3 text-brandCocoa text-lg font-medium hover:bg-brandPeach/10 rounded-md"
            >
              Contact
            </button>
            <button
              onClick={() => handleNav("/cart")}
              className="block w-full text-left px-3 py-3 text-brandCocoa text-lg font-medium hover:bg-brandPeach/10 rounded-md"
            >
              Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
