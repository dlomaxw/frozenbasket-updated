"use client"

import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ShieldCheck, Truck, CreditCard, User, LogIn } from "lucide-react"
import { createOrder, type Order, type OrderItem } from "@/lib/firebase/database"
import Link from "next/link"

const DELIVERY_FEE = 5000

export default function CheckoutPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { items, getItemCount, getTotal, clearCart } = useCartStore()
  // const { user, userProfile, loading: authLoading } = useAuth() // Removed Auth
  const itemCount = getItemCount()
  const subtotal = getTotal()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "cash",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const total = subtotal + DELIVERY_FEE

  useEffect(() => {
    setMounted(true)
  }, [])

  // Pre-fill form with user profile data
  // useEffect(() => {
  //   if (userProfile) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       fullName: userProfile.displayName || prev.fullName,
  //       email: userProfile.email || prev.email,
  //       phone: userProfile.phone || prev.phone,
  //       address: userProfile.address || prev.address,
  //     }))
  //   }
  // }, [userProfile])

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router, mounted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // if (!user) {
    //   router.push("/auth/sign-in?redirect=/checkout")
    //   return
    // }

    setIsSubmitting(true)
    setError(null)

    try {
      // Transform cart items to order items
      const orderItems: OrderItem[] = items.map((item) => {
        const product = item.item as any;
        if (item.type === "single") {
          return {
            type: "single" as const,
            name: product.name,
            price: item.price,
            quantity: item.quantity,
            details: product.category || "",
          }
        } else if (item.type === "mix") {
          const mix = product
          return {
            type: "mix" as const,
            name: mix.name || mix.productType,
            price: item.price,
            quantity: item.quantity,
            details: `Flavors: ${mix.flavors?.join(", ") || "None"}`,
          }
        } else {
          // bakery
          const bakery = product
          return {
            type: "bakery" as const,
            name: bakery.productName,
            price: item.price,
            quantity: item.quantity,
            details: bakery.toppings?.length > 0 ? `Toppings: ${bakery.toppings.map((t: any) => t.name).join(", ")}` : "",
            toppings: bakery.toppings?.map((t: any) => t.name) || [],
          }
        }
      })

      const order: Omit<Order, "id"> = {
        userId: "guest",
        userEmail: formData.email || "guest@example.com",
        userName: formData.fullName,
        userPhone: formData.phone,
        deliveryAddress: formData.address,
        items: orderItems,
        subtotal: subtotal,
        deliveryFee: DELIVERY_FEE,
        total: total,
        status: "pending",
        paymentMethod: formData.paymentMethod === "cash" ? "cash" : "mobile_money",
        paymentStatus: "pending",
        notes: formData.notes || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const orderId = await createOrder(order)

      // Clear cart and redirect to success page
      clearCart()
      router.push(`/order-success?orderId=${orderId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader cartCount={0} />
        <main className="flex-grow bg-cream flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandBlue mx-auto"></div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader cartCount={itemCount} />
      <main className="flex-grow bg-gradient-to-b from-cream to-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-brandBlue mb-2">Checkout</h1>
          <p className="text-muted-foreground mb-8">Complete your order to enjoy delicious ice cream!</p>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-success" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-5 h-5 text-brandBlue" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="w-5 h-5 text-brandPeach" />
              <span>Multiple Payment Options</span>
            </div>
          </div>

          {/* Sign In Required for checkout */}
          {/* Sign In Removed */}
          {true && ( // Always show form
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Delivery Information Form */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                <h2 className="text-2xl font-serif font-bold text-brandCocoa mb-6">Delivery Information</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+256 700 000 000"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter your full delivery address"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any special instructions?"
                      rows={2}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="mb-3 block">Payment Method</Label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition">
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          checked={formData.paymentMethod === "cash"}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-4 h-4 text-brandBlue"
                        />
                        <div>
                          <span className="font-medium">Cash on Delivery</span>
                          <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition">
                        <input
                          type="radio"
                          name="payment"
                          value="mobile-money"
                          checked={formData.paymentMethod === "mobile-money"}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                          className="w-4 h-4 text-brandBlue"
                        />
                        <div>
                          <span className="font-medium">Mobile Money</span>
                          <p className="text-xs text-muted-foreground">MTN MoMo, Airtel Money</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full py-6 text-lg font-bold bg-brandPeach hover:bg-brandPeach/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                        Processing...
                      </span>
                    ) : (
                      `Place Order - UGX ${total.toLocaleString()}`
                    )}
                  </Button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                  <h2 className="text-2xl font-serif font-bold text-brandCocoa mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                    {items.map((item) => {
                      const product = item.item as any;
                      return (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                          {item.type === "single" && product.image && (
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          )}
                          {item.type === "mix" && (
                            <div
                              className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl"
                              style={{ backgroundColor: product.base?.color || "#6B5B95" }}
                            >
                              🍨
                            </div>
                          )}
                          <div className="flex-grow">
                            <p className="font-semibold text-brandCocoa">
                              {item.quantity}x {product.name}
                            </p>
                            {item.type === "mix" && (
                              <div className="text-xs text-muted-foreground mt-1">
                                <p>{product.productType}</p>
                                {product.flavors?.length > 0 && <p>Flavors: {product.flavors.join(", ")}</p>}
                              </div>
                            )}
                          </div>
                          <p className="font-semibold text-brandBlue whitespace-nowrap">
                            UGX {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>UGX {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span>UGX {DELIVERY_FEE.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-brandBlue pt-3 border-t border-border">
                      <span>Total</span>
                      <span>UGX {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info Card */}
                <div className="bg-brandBlue/5 rounded-2xl p-4 border border-brandBlue/20">
                  <div className="flex items-start gap-3">
                    <Truck className="w-6 h-6 text-brandBlue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-brandCocoa">Delivery Information</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Orders are typically delivered within 30-60 minutes. We'll contact you to confirm your order before dispatch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
