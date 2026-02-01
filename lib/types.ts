export interface Flavor {
  id: string
  name: string
  description: string
  notes: string
  allergens: string[]
  price: number
  category: "Classic" | "Premium" | "Fruit" | "Sorbet" | "Kulfi"
  image: string
  color: string
}

export interface MixIn {
  id: string
  name: string
  price: number
  type: "fruit" | "candy" | "nut"
}

export interface Topping {
  id: string
  name: string
  price: number
  type: "sauce" | "sprinkle"
}

export interface CustomMix {
  id?: string
  name?: string
  productType?: string
  base: Flavor | null
  flavors: string[]
  mixIns: MixIn[]
  toppings: string[]
  sauces: string[]
  size: "S" | "M" | "L" | "Regular"
  totalPrice: number
}

export interface BakeryTopping {
  id: string
  name: string
  price: number
}

export interface BakeryOrder {
  id: string
  productId: string
  productName: string
  productImage: string
  basePrice: number
  toppings: BakeryTopping[]
  totalPrice: number
}

export interface CartItem {
  id: string
  item: Flavor | CustomMix | BakeryOrder
  type: "single" | "mix" | "bakery"
  quantity: number
  price: number
}
