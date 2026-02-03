"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getBakeryProduct, getBakeryToppings, type BakeryProduct, type BakeryTopping as DbTopping } from "@/lib/local-api"
import { useCartStore } from "@/lib/cart-store"
import type { BakeryTopping, BakeryOrder } from "@/lib/types"
import { ArrowLeft, Plus, Minus, ShoppingCart, Check, Croissant } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BakeryOrderPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const { addBakeryItem } = useCartStore()

  const [product, setProduct] = useState<BakeryProduct | null>(null)
  const [availableToppings, setAvailableToppings] = useState<DbTopping[]>([])
  const [selectedToppings, setSelectedToppings] = useState<BakeryTopping[]>([])
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch product from Firebase
        const productData = await getBakeryProduct(productId)
        if (productData) {
          setProduct(productData)
          // Default to first variant if available (usually Make Your Own)
          if (productData.variants && productData.variants.length > 0) {
            setSelectedVariant(productData.variants[0])
          }
        }

        // Fetch toppings from Firebase
        const toppingsData = await getBakeryToppings()
        setAvailableToppings(toppingsData)
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [productId])

  const toggleTopping = (topping: DbTopping) => {
    setSelectedToppings((prev) => {
      const exists = prev.find((t) => t.id === topping.id)
      if (exists) {
        return prev.filter((t) => t.id !== topping.id)
      } else {
        return [...prev, { id: topping.id, name: topping.name, price: topping.price }]
      }
    })
  }

  const isToppingSelected = (toppingId: string) => {
    return selectedToppings.some((t) => t.id === toppingId)
  }

  const calculateTotal = () => {
    if (!product) return 0
    const basePrice = selectedVariant ? selectedVariant.price : product.price
    const toppingsTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0)
    return (basePrice + toppingsTotal) * quantity
  }

  const handleAddToCart = () => {
    if (!product) return

    // Ensure a variant is selected if variants exist
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      return; // Button should be disabled ideally, or show error
    }

    const currentPrice = selectedVariant ? selectedVariant.price : product.price
    const currentName = selectedVariant ? `${product.name} - ${selectedVariant.name}` : product.name
    const currentImage = selectedVariant?.image || product.image

    const bakeryOrder: BakeryOrder = {
      id: `bakery-${product.id}-${Date.now()}`,
      productId: product.id,
      productName: currentName,
      productImage: currentImage,
      basePrice: currentPrice,
      toppings: selectedToppings,
      totalPrice: calculateTotal() / quantity, // Price per item
    }

    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addBakeryItem(bakeryOrder)
    }

    setAddedToCart(true)
    setTimeout(() => {
      router.push("/cart")
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-xl text-muted-foreground mb-4">Product not found</p>
        <Link href="/menu?category=bakery" className="text-brandBlue underline">
          Back to Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fff0f5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/menu?category=bakery"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brandBlue transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Menu
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-inner">
            <img
              src={selectedVariant?.image || product.image || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              className="w-full h-80 md:h-96 object-contain p-6 hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
              <Croissant size={14} />
              Bakery
            </div>
            <h1 className="text-4xl font-serif font-bold text-brandCocoa mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{selectedVariant?.description || product.description}</p>
            <p className="text-3xl font-bold text-amber-600 mb-6">
              Base Price: {((selectedVariant?.price || product.price) / 1000).toFixed(0)}k UGX
            </p>

            {/* Variants Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-xl text-brandCocoa mb-3">Choose Your Option</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${selectedVariant?.id === variant.id
                          ? "border-amber-500 bg-amber-50 ring-2 ring-amber-200"
                          : "border-border hover:border-amber-300"
                        }`}
                    >
                      <div className="font-bold text-brandCocoa">{variant.name}</div>
                      <div className="text-sm text-amber-600">{(variant.price / 1000).toFixed(0)}k UGX</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Toppings Selection */}
            <div className="mb-6">
              <h3 className="font-bold text-xl text-brandCocoa mb-3">Add Toppings</h3>
              <p className="text-sm text-muted-foreground mb-4">Customize your treat!</p>
              <div className="grid grid-cols-2 gap-3">
                {availableToppings.map((topping) => (
                  <button
                    key={topping.id}
                    onClick={() => toggleTopping(topping)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${isToppingSelected(topping.id)
                      ? "border-amber-500 bg-amber-50"
                      : "border-border hover:border-amber-300"
                      }`}
                  >
                    <span className="font-medium text-base">{topping.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        +{(topping.price / 1000).toFixed(1)}k
                      </span>
                      {isToppingSelected(topping.id) && (
                        <Check size={16} className="text-amber-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Toppings Summary */}
            {selectedToppings.length > 0 && (
              <div className="bg-amber-50 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-sm text-amber-700 mb-2">Selected Toppings:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedToppings.map((topping) => (
                    <span
                      key={topping.id}
                      className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {topping.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-brandCocoa">Quantity:</span>
              <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-amber-50 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-amber-50 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium text-amber-800">Total:</span>
                <span className="text-3xl font-bold text-amber-700">
                  {(calculateTotal() / 1000).toFixed(0)}k UGX
                </span>
              </div>
              <p className="text-sm text-amber-600 mt-1">
                Base ({((selectedVariant?.price || product.price) / 1000).toFixed(0)}k)
                {selectedToppings.length > 0 && ` + Toppings (${(selectedToppings.reduce((sum, t) => sum + t.price, 0) / 1000).toFixed(1)}k)`}
                x {quantity}
              </p>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={addedToCart || (product.variants && product.variants.length > 0 && !selectedVariant)}
              className={`w-full py-6 text-lg font-bold rounded-full transition-all ${addedToCart
                ? "bg-green-500 hover:bg-green-500"
                : "bg-amber-500 hover:bg-amber-600"
                }`}
            >
              {addedToCart ? (
                <>
                  <Check size={24} className="mr-2" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart size={24} className="mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
