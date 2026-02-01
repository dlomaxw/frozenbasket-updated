"use client"

import { Suspense } from "react"
import { useState } from "react"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChevronRight } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useRouter, useSearchParams } from "next/navigation"

import { MENU_CATEGORIES } from "@/lib/menu-data"

function MenuContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category")
  const activeFamilyId = searchParams.get("family")

  const { getItemCount } = useCartStore()
  const cartCount = getItemCount()

  // Categories data for the grid
  const categories = [
    { id: "ice-cream", label: "ICE CREAM", image: MENU_CATEGORIES.iceCream.image, count: MENU_CATEGORIES.iceCream.items.length },
    { id: "drinks", label: "DRINKS", image: MENU_CATEGORIES.drinks.image, count: MENU_CATEGORIES.drinks.items.length },
    { id: "bakery", label: "BAKERY", image: MENU_CATEGORIES.bakery.image, count: MENU_CATEGORIES.bakery.items.length },
  ]

  const getCategoryItems = (id: string) => {
    if (id === "ice-cream") return MENU_CATEGORIES.iceCream.items
    if (id === "drinks") return MENU_CATEGORIES.drinks.items
    if (id === "bakery") return MENU_CATEGORIES.bakery.items
    return []
  }

  // Derive active family object if family ID is present
  const activeFamily = activeFamilyId && activeCategory
    ? getCategoryItems(activeCategory).find((item) => item.id === activeFamilyId)
    : null

  // Determine view state based on URL params
  const viewState = activeFamily ? "variants" : activeCategory ? "families" : "categories"

  const handleCategoryClick = (catId: string) => {
    router.push(`/menu?category=${catId}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFamilyClick = (item: any) => {
    // If item has variants, go to variants view
    if (item.variants && item.variants.length > 0) {
      router.push(`/menu?category=${activeCategory}&family=${item.id}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // If no variants, treating it as a single product for now (or could add logic to add to cart directly here)
      console.log("Add to cart:", item)
    }
  }

  const handleBackToCategories = () => {
    router.push("/menu")
  }

  const handleBackToFamilies = () => {
    if (activeCategory) {
      router.push(`/menu?category=${activeCategory}`)
    }
  }

  const getCategoryTitle = (id: string) => {
    return categories.find(c => c.id === id)?.label || "MENU"
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] font-sans">
      <SiteHeader cartCount={cartCount} />

      {/* Breadcrumb / Navigation Bar */}
      <div className="bg-white border-b border-gray-200 py-3 shadow-sm sticky top-16 z-10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 flex items-center text-sm font-bold tracking-widest text-[#2c3e50] overflow-x-auto whitespace-nowrap">
          <button
            onClick={handleBackToCategories}
            className="hover:text-[var(--purple-bg)] transition-colors flex items-center gap-1"
          >
            MENU
          </button>

          {activeCategory && (
            <>
              <ChevronRight size={14} className="mx-2 text-gray-400" />
              <button
                onClick={activeFamily ? handleBackToFamilies : undefined}
                className={`uppercase ${activeFamily ? "hover:text-[var(--purple-bg)] transition-colors" : "text-[var(--purple-bg)]"}`}
              >
                {getCategoryTitle(activeCategory).replace("BIG ON ", "").replace("PERFECTED ", "").replace("REFRESHING ", "").replace("GENEROUS ", "")}
              </button>
            </>
          )}

          {activeFamily && (
            <>
              <ChevronRight size={14} className="mx-2 text-gray-400" />
              <span className="text-[var(--purple-bg)] uppercase">
                {activeFamily.name}
              </span>
            </>
          )}
        </div>
      </div>

      <main className="flex-grow py-12 px-4 max-w-7xl mx-auto w-full">

        {/* VIEW: CATEGORIES GRID (Level 1) */}
        {viewState === "categories" && (
          <div className="animate-fadeIn">
            <div data-aos="fade-down" className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#2c3e50] uppercase tracking-wider mb-2 font-serif">
                Welcome to Frozen Basket
              </h1>
              <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed tracking-wide">
                Everything from our Big on Ice Cream, Perfected Sundaes, Decadent Bakery to your Generous Drinks. Right here at your fingertips. ORDER NOW.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, index) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden text-left flex flex-col h-full border border-gray-100 transform hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col items-center justify-center text-center bg-white border-t border-gray-50">
                    <h3 className="text-lg font-extrabold text-[#2c3e50] uppercase tracking-wide group-hover:text-[var(--purple-bg)] transition-colors duration-300">
                      {cat.label}
                    </h3>
                    <div className="h-0.5 w-8 bg-gray-200 mt-4 mb-3 group-hover:w-16 group-hover:bg-[var(--pink-highlight)] transition-all duration-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: FAMILIES GRID (Level 2) - Shows types of items e.g., Happy Bars, Kulfi */}
        {viewState === "families" && activeCategory && (
          <div className="animate-fadeIn">
            <div data-aos="fade-down" className="text-center mb-10 border-b pb-8 border-gray-100">
              <h2 className="text-3xl font-extrabold text-[#2c3e50] uppercase tracking-wider font-serif">
                {getCategoryTitle(activeCategory)}
              </h2>
              <div className="w-12 h-1 bg-[var(--purple-bg)] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getCategoryItems(activeCategory).map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleFamilyClick(item)}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full group text-left"
                >
                  <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
                    <Image
                      src={(item as any).image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* If it has variants, show a badge */}
                    {item.variants && (
                      <div className="absolute bottom-3 right-3 bg-white/90 text-[var(--purple-bg)] text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wide">
                        {item.variants.length} Flavors
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-sm font-bold text-[#2c3e50] uppercase mb-2 line-clamp-2 min-h-[2.5rem] tracking-tight">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-grow leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center w-full">
                      <span className="text-[#8e8e8e] text-xs font-semibold uppercase tracking-wider">
                        {item.variants ? "Select Flavor" : "View Item"}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[var(--purple-bg)] group-hover:text-white flex items-center justify-center transition-colors text-gray-400">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: VARIANTS GRID (Level 3) - Shows specific flavors e.g., Vanilla Happy Bar */}
        {viewState === "variants" && activeFamily && (
          <div className="animate-fadeIn">
            <div data-aos="fade-down" className="text-center mb-10 border-b pb-8 border-gray-100">
              <h2 className="text-3xl font-extrabold text-[#2c3e50] uppercase tracking-wider font-serif">
                {activeFamily.name}
              </h2>
              <div className="w-12 h-1 bg-[var(--purple-bg)] mx-auto mt-4 rounded-full" />
              <p className="text-gray-500 mt-4 text-sm max-w-xl mx-auto">
                {activeFamily.description} - Choose your favorite flavor below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(activeFamily.variants || [activeFamily]).map((variant: any, index: number) => (
                <div key={variant.id} data-aos="fade-up" data-aos-delay={index * 50}>
                  <ProductCard
                    title={variant.name}
                    price={variant.price.toLocaleString()}
                    image={variant.image || activeFamily.image}
                    description={variant.description || activeFamily.description}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
      <SiteFooter />
    </div>
  )
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fcfcfc]" />}>
      <MenuContent />
    </Suspense>
  )
}

function ProductCard({ title, price, image, description }: { title: string; price: string; image: string; description?: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full group">
      <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-[#2c3e50] uppercase mb-2 line-clamp-2 min-h-[2.5rem] tracking-tight">
          {title}
        </h3>

        {description && (
          <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-auto border-t border-gray-50 pt-4">
          <div className="text-[#8e8e8e] text-sm font-semibold mb-3">
            {price} UGX
          </div>
          <button className="w-full bg-[#527a29] hover:bg-[#456822] text-white text-xs font-bold py-3 px-4 rounded-sm uppercase tracking-widest transition-colors shadow-sm active:transform active:scale-95 duration-150">
            ORDER
          </button>
        </div>
      </div>
    </div>
  )
}
