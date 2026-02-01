"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle, Printer, Home, ShoppingBag, Clock, Phone, MapPin } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import Image from "next/image"

interface OrderDetails {
  id: string
  customer_name: string
  customer_phone: string
  customer_email: string
  customer_address: string
  total_amount: number
  status: string
  payment_method: string
  notes: string
  created_at: string
  items: {
    id: string
    product_name: string
    quantity: number
    unit_price: number
    customizations: any
  }[]
}

function OrderSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails()
    } else {
      setLoading(false)
    }
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders?id=${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
      }
    } catch (error) {
      console.error("Failed to fetch order:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const deliveryFee = 5000

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader cartCount={0} />
        <main className="flex-grow bg-gradient-to-b from-brandPeach/20 to-cream flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-brandBlue border-t-transparent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your order...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader cartCount={0} />
      <main className="flex-grow bg-gradient-to-b from-brandPeach/20 to-cream py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-success/20 rounded-full animate-ping"></div>
              <CheckCircle className="relative w-24 h-24 text-success mx-auto" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-brandBlue mt-6 mb-2">Thank You for Your Order!</h1>
            <p className="text-muted-foreground text-lg">Your delicious ice cream is being prepared with love</p>
          </div>

          {/* Receipt/Bill Card */}
          <div className="bg-card rounded-2xl shadow-xl border-2 border-brandBlue/20 overflow-hidden print:shadow-none print:border">
            {/* Receipt Header with Logo */}
            <div className="bg-gradient-to-r from-brandBlue to-brandBlue/80 p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="bg-white rounded-full p-3">
                  <Image
                    src="/frozen-basket-logo.png"
                    alt="Frozen Basket"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">Frozen Basket</h2>
              <p className="text-white/80 text-sm">Premium Ice Cream Experience</p>
            </div>

            {/* Order Info */}
            <div className="p-6 border-b border-dashed border-border">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-mono font-bold text-brandBlue text-lg">
                    #{orderId?.slice(0, 8).toUpperCase() || "N/A"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-semibold">
                    {order?.created_at
                      ? new Date(order.created_at).toLocaleString("en-UG", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : new Date().toLocaleString("en-UG", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-full w-fit">
                <Clock size={16} />
                <span className="font-semibold text-sm">
                  {order?.status === "pending" ? "Awaiting Confirmation" : order?.status || "Processing"}
                </span>
              </div>
            </div>

            {/* Customer Details */}
            {order && (
              <div className="p-6 border-b border-dashed border-border bg-muted/30">
                <h3 className="font-semibold text-brandCocoa mb-3">Delivery Details</h3>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{order.customer_name}</p>
                  {order.customer_phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone size={14} />
                      <span>{order.customer_phone}</span>
                    </div>
                  )}
                  {order.customer_address && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={14} />
                      <span>{order.customer_address}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="p-6 border-b border-dashed border-border">
              <h3 className="font-semibold text-brandCocoa mb-4">Order Items</h3>
              <div className="space-y-4">
                {order?.items?.map((item, index) => (
                  <div key={item.id || index} className="flex justify-between items-start">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="bg-brandBlue text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <span className="font-medium text-foreground">{item.product_name}</span>
                      </div>
                      {item.customizations && (
                        <div className="ml-8 mt-1 text-xs text-muted-foreground">
                          {item.customizations.productType && <p>Type: {item.customizations.productType}</p>}
                          {item.customizations.flavors?.length > 0 && (
                            <p>Flavors: {item.customizations.flavors.join(", ")}</p>
                          )}
                          {item.customizations.toppings?.length > 0 && (
                            <p>Toppings: {item.customizations.toppings.join(", ")}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-brandBlue whitespace-nowrap">
                      UGX {(item.unit_price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                )) || <p className="text-muted-foreground text-sm">Order items will appear here</p>}
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-6 bg-muted/30">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>UGX {((order?.total_amount || 0) - deliveryFee).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>UGX {deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border text-xl font-bold">
                  <span className="text-brandCocoa">Total</span>
                  <span className="text-brandBlue">UGX {(order?.total_amount || 0).toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium capitalize">
                    {order?.payment_method?.replace("-", " ") || "Cash on Delivery"}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Message */}
            <div className="p-6 text-center border-t border-border">
              <p className="text-muted-foreground text-sm mb-2">
                Your order has been sent to our kitchen for preparation.
              </p>
              <p className="text-muted-foreground text-sm">We will contact you shortly to confirm your order.</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-brandPeach">
                <span className="text-2xl">🍨</span>
                <span className="font-serif italic">Enjoy your Frozen Basket experience!</span>
                <span className="text-2xl">🍨</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-muted text-foreground rounded-full font-semibold hover:bg-muted/80 transition"
            >
              <Printer size={20} />
              Print Receipt
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-brandBlue text-white rounded-full font-semibold hover:bg-brandBlue/90 transition"
            >
              <Home size={20} />
              Back to Home
            </button>
            <button
              onClick={() => router.push("/menu")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-brandPeach text-white rounded-full font-semibold hover:bg-brandPeach/90 transition"
            >
              <ShoppingBag size={20} />
              Order More
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground print:hidden">
            <p>Questions about your order?</p>
            <p className="font-semibold text-brandBlue">Contact us: +256 700 000 000</p>
          </div>
        </div>
      </main>
      <SiteFooter />

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:shadow-none,
          .print\\:shadow-none * {
            visibility: visible;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-brandBlue border-t-transparent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  )
}
