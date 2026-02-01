"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCartStore } from "@/lib/cart-store"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import type { Flavor, CustomMix, BakeryOrder } from "@/lib/types"

export const dynamic = "force-dynamic"

export default function CartPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const [items, setItems] = useState<any[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [total, setTotal] = useState(0)

  const cartStore = useCartStore()

  useEffect(() => {
    setMounted(true)
    if (cartStore) {
      setItems(cartStore.items)
      setItemCount(cartStore.getItemCount())
      setTotal(cartStore.getTotal() || 0)
    }
  }, [cartStore])

  useEffect(() => {
    if (mounted && cartStore) {
      setItems(cartStore.items)
      setItemCount(cartStore.getItemCount())
      const newTotal = cartStore.getTotal() || 0
      setTotal(newTotal)
    }
  }, [mounted, cartStore])

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader cartCount={0} />
        <main className="flex-grow bg-cream flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandBlue mx-auto"></div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader cartCount={0} />
        <main className="flex-grow bg-cream flex items-center justify-center py-20 overflow-hidden">
          <div className="text-center">
            <ShoppingBag className="mx-auto w-24 h-24 text-muted mb-6 animate-bounce-slow" />
            <h2 className="text-3xl font-serif font-bold text-brandBlue mb-4 animate-fade-in-up">Your basket is empty</h2>
            <p className="text-muted-foreground mb-8 animate-fade-in-up delay-100">Start building your perfect ice cream experience!</p>
            <div className="flex gap-4 justify-center animate-fade-in-up delay-200">
              <button
                onClick={() => router.push("/menu")}
                className="px-6 py-3 bg-brandBlue text-white rounded-full font-semibold hover:bg-brandBlue/90 transition-all hover:scale-105"
              >
                Browse Menu
              </button>

            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader cartCount={itemCount} />
      <main className="flex-grow bg-cream py-12 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-brandBlue mb-8 animate-fade-in-up">Your Basket</h1>

          <div className="space-y-4 mb-8">
            {items.map((item, index) => {
              const isSingle = item.type === "single"
              const isMix = item.type === "mix"
              const isBakery = item.type === "bakery"
              const flavor = isSingle ? (item.item as Flavor) : null
              const mix = isMix ? (item.item as CustomMix) : null
              const bakery = isBakery ? (item.item as BakeryOrder) : null

              return (
                <div key={item.id} className={`bg-card rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 animate-fade-in-up ${isBakery ? "border-amber-200" : "border-border"}`} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start gap-4">
                    {flavor && (
                      <div className="w-24 h-24 rounded-lg flex-shrink-0">
                        {flavor.image ? (
                          <img
                            src={flavor.image || "/placeholder.svg"}
                            alt={flavor.name}
                            className="w-full h-full rounded-lg object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none"
                              e.currentTarget.nextElementSibling?.classList.remove("hidden")
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full rounded-lg ${flavor.image ? "hidden" : ""}`}
                          style={{ backgroundColor: flavor.color || "#ccc" }}
                        />
                      </div>
                    )}
                    {mix && (
                      <div
                        className="w-24 h-24 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: mix.base?.color || "#ccc" }}
                      />
                    )}
                    {bakery && (
                      <div className="w-24 h-24 rounded-lg flex-shrink-0 overflow-hidden bg-amber-50">
                        <img
                          src={bakery.productImage || "/placeholder.svg"}
                          alt={bakery.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        {isBakery && (
                          <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">
                            Bakery
                          </span>
                        )}
                        <h3 className="font-serif font-bold text-xl text-brandCocoa">
                          {flavor ? flavor.name : mix?.name || bakery?.productName}
                        </h3>
                      </div>
                      {mix && (
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p><span className="font-medium">Type:</span> {mix.productType || mix.name}</p>
                          {mix.flavors && mix.flavors.length > 0 && (
                            <p><span className="font-medium">Flavors:</span> {mix.flavors.join(", ")}</p>
                          )}
                          {mix.toppings && mix.toppings.length > 0 && (
                            <p><span className="font-medium">Toppings:</span> {Array.isArray(mix.toppings) ? mix.toppings.join(", ") : mix.toppings}</p>
                          )}
                          {mix.sauces && mix.sauces.length > 0 && (
                            <p><span className="font-medium">Sauces:</span> {Array.isArray(mix.sauces) ? mix.sauces.join(", ") : mix.sauces}</p>
                          )}
                        </div>
                      )}
                      {bakery && bakery.toppings.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          <p>Toppings: {bakery.toppings.map((t) => t.name).join(", ")}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                        <button
                          onClick={() => cartStore.updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-background rounded-full transition"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => cartStore.updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-background rounded-full transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right min-w-[100px]">
                        <p className="font-bold text-brandBlue text-lg">
                          UGX {Math.round(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => cartStore.removeItem(item.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-card rounded-xl p-6 shadow-md border-2 border-brandBlue/20 animate-fade-in-scale delay-300 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold text-foreground">Total</span>
              <span className="text-3xl font-bold text-brandBlue">UGX {Math.round(total || 0).toLocaleString()}</span>
            </div>
            <button
              onClick={() => router.push("/checkout")}
              className="w-full py-4 bg-brandPeach text-white rounded-full font-bold text-lg shadow-lg hover:bg-brandPeach/90 hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
