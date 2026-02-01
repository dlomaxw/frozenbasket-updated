"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CartItem, Flavor, CustomMix, BakeryOrder } from "./types"

interface CartContextType {
  items: CartItem[]
  addFlavor: (flavor: Flavor) => void
  addCustomMix: (mix: CustomMix) => void
  addBakeryItem: (bakeryOrder: BakeryOrder) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addFlavor = (flavor: Flavor) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.type === "single" && (item.item as Flavor).id === flavor.id)

      if (existingItem) {
        return prevItems.map((item) => (item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prevItems,
          {
            id: `flavor-${flavor.id}-${Date.now()}`,
            item: flavor,
            type: "single",
            quantity: 1,
            price: flavor.price,
          },
        ]
      }
    })
  }

  const addCustomMix = (mix: CustomMix) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: `mix-${Date.now()}`,
        item: mix,
        type: "mix",
        quantity: 1,
        price: mix.totalPrice,
      },
    ])
  }

  const addBakeryItem = (bakeryOrder: BakeryOrder) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: `bakery-${bakeryOrder.productId}-${Date.now()}`,
        item: bakeryOrder,
        type: "bakery",
        quantity: 1,
        price: bakeryOrder.totalPrice,
      },
    ])
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => setItems([])

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addFlavor,
        addCustomMix,
        addBakeryItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartStore() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCartStore must be used within a CartProvider")
  }
  return context
}
