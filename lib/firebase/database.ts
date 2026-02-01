import { ref, get, set, push, update, remove, query, orderByChild, equalTo } from "firebase/database"
import { database } from "./config"

// ============ PRODUCT TYPES (Mix Builder) ============
export interface ProductType {
  id: string
  name: string
  description: string
  price: number
  image: string
  is_active: boolean
  sort_order: number
  max_flavors?: number
  max_toppings?: number
  max_sauces?: number
  allowed_flavors?: string
  can_mix?: boolean
}

export async function getProductTypes(): Promise<ProductType[]> {
  const snapshot = await get(ref(database, "product_types"))
  if (!snapshot.exists()) return []
  const data = snapshot.val()
  return Object.keys(data)
    .map((key) => ({ id: key, ...data[key] }))
    .filter((p) => p.is_active)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
}

export async function getProductType(id: string): Promise<ProductType | null> {
  const snapshot = await get(ref(database, `product_types/${id}`))
  if (!snapshot.exists()) return null
  return { id, ...snapshot.val() }
}

export async function saveProductType(id: string, data: Partial<ProductType>): Promise<void> {
  await set(ref(database, `product_types/${id}`), data)
}

export async function updateProductType(id: string, data: Partial<ProductType>): Promise<void> {
  await update(ref(database, `product_types/${id}`), data)
}

export async function deleteProductType(id: string): Promise<void> {
  await remove(ref(database, `product_types/${id}`))
}

// ============ BAKERY PRODUCTS ============
export interface BakeryProduct {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  is_active: boolean
  sort_order: number
}

export async function getBakeryProducts(): Promise<BakeryProduct[]> {
  const snapshot = await get(ref(database, "bakery_products"))
  if (!snapshot.exists()) return []
  const data = snapshot.val()
  return Object.keys(data)
    .map((key) => ({ id: key, ...data[key] }))
    .filter((p) => p.is_active)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
}

export async function getBakeryProduct(id: string): Promise<BakeryProduct | null> {
  const snapshot = await get(ref(database, `bakery_products/${id}`))
  if (!snapshot.exists()) return null
  return { id, ...snapshot.val() }
}

export async function saveBakeryProduct(id: string, data: Partial<BakeryProduct>): Promise<void> {
  await set(ref(database, `bakery_products/${id}`), data)
}

export async function updateBakeryProduct(id: string, data: Partial<BakeryProduct>): Promise<void> {
  await update(ref(database, `bakery_products/${id}`), data)
}

export async function deleteBakeryProduct(id: string): Promise<void> {
  await remove(ref(database, `bakery_products/${id}`))
}

// ============ BAKERY TOPPINGS ============
export interface BakeryTopping {
  id: string
  name: string
  price: number
  image?: string
  is_active: boolean
  sort_order: number
}

export async function getBakeryToppings(): Promise<BakeryTopping[]> {
  const snapshot = await get(ref(database, "bakery_toppings"))
  if (!snapshot.exists()) return []
  const data = snapshot.val()
  return Object.keys(data)
    .map((key) => ({ id: key, ...data[key] }))
    .filter((t) => t.is_active)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
}

export async function saveBakeryTopping(id: string, data: Partial<BakeryTopping>): Promise<void> {
  await set(ref(database, `bakery_toppings/${id}`), data)
}

export async function deleteBakeryTopping(id: string): Promise<void> {
  await remove(ref(database, `bakery_toppings/${id}`))
}

// ============ ORDERS ============
export interface OrderItem {
  type: "single" | "mix" | "bakery"
  name: string
  price: number
  quantity: number
  details?: string
  toppings?: string[]
}

export interface Order {
  id?: string
  userId: string
  userEmail: string
  userName: string
  userPhone: string
  deliveryAddress: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  paymentMethod: "cash" | "mobile_money"
  paymentStatus: "pending" | "paid"
  notes?: string
  createdAt: string
  updatedAt: string
}

export async function createOrder(order: Omit<Order, "id">): Promise<string> {
  const ordersRef = ref(database, "orders")
  const newOrderRef = push(ordersRef)
  await set(newOrderRef, order)
  return newOrderRef.key!
}

export async function getOrder(id: string): Promise<Order | null> {
  const snapshot = await get(ref(database, `orders/${id}`))
  if (!snapshot.exists()) return null
  return { id, ...snapshot.val() }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const snapshot = await get(ref(database, "orders"))
  if (!snapshot.exists()) return []
  const data = snapshot.val()
  return Object.keys(data)
    .map((key) => ({ id: key, ...data[key] }))
    .filter((o) => o.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getAllOrders(): Promise<Order[]> {
  const snapshot = await get(ref(database, "orders"))
  if (!snapshot.exists()) return []
  const data = snapshot.val()
  return Object.keys(data)
    .map((key) => ({ id: key, ...data[key] }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<void> {
  await update(ref(database, `orders/${id}`), { status, updatedAt: new Date().toISOString() })
}

export async function updatePaymentStatus(id: string, paymentStatus: Order["paymentStatus"]): Promise<void> {
  await update(ref(database, `orders/${id}`), { paymentStatus, updatedAt: new Date().toISOString() })
}

// Image mappings for products - correct URLs from Supabase
const PRODUCT_IMAGES: Record<string, string> = {
  "natural-ice-cream": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T140113.569.png",
  "classic-treats": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T140708.600.png",
  "kids-delight": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T141448.613.png",
  "dry-fruit-royals": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T141951.118.png",
  "taste-of-india": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T144038.617.png",
  "waffle-cone-basket": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T103824.709.png",
  "jar-sundae": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T133048.057.png",
  "frozen-tacos": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T133747.918.png",
  "waffle-basket-single-sundae": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T134329.373.png",
  "cold-slab": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T145350.217.png",
  "sizzling-volcano": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-09T135349.940.png",
  "triple-sundae": "https://py743zvjnmrdpwja.public.blob.vercel-storage.com/envato-labs-image-edit%20-%202025-12-07T171354.988.png",
}

const BAKERY_IMAGES: Record<string, string> = {
  crepes: "/images/crepes.jpeg",
  waffles: "/images/waffles.jpeg",
  pancakes: "/images/pancakes.png",
}

// Force update all product images (used when images need to be fixed)
export async function forceUpdateAllImages(): Promise<void> {
  try {
    // Update all product type images
    const productTypesSnapshot = await get(ref(database, "product_types"))
    if (productTypesSnapshot.exists()) {
      const data = productTypesSnapshot.val()
      for (const [id] of Object.entries(data)) {
        const newImage = PRODUCT_IMAGES[id]
        if (newImage) {
          await update(ref(database, `product_types/${id}`), { image: newImage })
        }
      }
    }

    // Update all bakery product images
    const bakerySnapshot = await get(ref(database, "bakery_products"))
    if (bakerySnapshot.exists()) {
      const data = bakerySnapshot.val()
      for (const [id] of Object.entries(data)) {
        const newImage = BAKERY_IMAGES[id]
        if (newImage) {
          await update(ref(database, `bakery_products/${id}`), { image: newImage })
        }
      }
    }
  } catch (err) {
    console.log("[v0] Could not force update images:", err)
  }
}

// Update missing images for existing products
export async function updateMissingImages(): Promise<void> {
  try {
    // Update product type images
    const productTypesSnapshot = await get(ref(database, "product_types"))
    if (productTypesSnapshot.exists()) {
      const data = productTypesSnapshot.val()
      for (const [id, product] of Object.entries(data)) {
        const p = product as any
        if (!p.image || p.image === "" || p.image === "/placeholder.svg") {
          const newImage = PRODUCT_IMAGES[id]
          if (newImage) {
            await update(ref(database, `product_types/${id}`), { image: newImage })
          }
        }
      }
    }

    // Update bakery product images
    const bakerySnapshot = await get(ref(database, "bakery_products"))
    if (bakerySnapshot.exists()) {
      const data = bakerySnapshot.val()
      for (const [id, product] of Object.entries(data)) {
        const p = product as any
        if (!p.image || p.image === "" || p.image === "/placeholder.svg") {
          const newImage = BAKERY_IMAGES[id]
          if (newImage) {
            await update(ref(database, `bakery_products/${id}`), { image: newImage })
          }
        }
      }
    }
  } catch (err) {
    console.log("[v0] Could not update images:", err)
  }
}

// ============ INITIALIZE DEFAULT DATA ============
export async function initializeDefaultData(): Promise<void> {
  // Check if product_types exists
  const productTypesSnapshot = await get(ref(database, "product_types"))
  if (!productTypesSnapshot.exists()) {
    // Add default product types with correct images from Supabase
    const defaultProductTypes: Record<string, Omit<ProductType, "id">> = {
      "natural-ice-cream": {
        name: "Natural Ice Cream",
        description: "Pure and natural ice cream made with fresh ingredients",
        price: 10000,
        image: PRODUCT_IMAGES["natural-ice-cream"],
        is_active: true,
        sort_order: 1,
        max_flavors: 2,
        max_toppings: 3,
        can_mix: true,
      },
      "classic-treats": {
        name: "Classic Treats",
        description: "Traditional ice cream treats everyone loves",
        price: 6000,
        image: PRODUCT_IMAGES["classic-treats"],
        is_active: true,
        sort_order: 2,
      },
      "kids-delight": {
        name: "Kids Delight",
        description: "Fun and colorful treats for the little ones",
        price: 8000,
        image: PRODUCT_IMAGES["kids-delight"],
        is_active: true,
        sort_order: 3,
      },
      "dry-fruit-royals": {
        name: "Dry Fruit Royals",
        description: "Premium ice cream loaded with dry fruits",
        price: 8000,
        image: PRODUCT_IMAGES["dry-fruit-royals"],
        is_active: true,
        sort_order: 4,
      },
      "taste-of-india": {
        name: "Taste of India",
        description: "Authentic Indian flavors in frozen form",
        price: 8000,
        image: PRODUCT_IMAGES["taste-of-india"],
        is_active: true,
        sort_order: 5,
      },
      "waffle-cone-basket": {
        name: "Waffle Cone Basket",
        description: "Crispy waffle cone filled with ice cream",
        price: 20000,
        image: PRODUCT_IMAGES["waffle-cone-basket"],
        is_active: true,
        sort_order: 6,
      },
      "jar-sundae": {
        name: "Jar Sundae",
        description: "Layered sundae served in a jar",
        price: 20000,
        image: PRODUCT_IMAGES["jar-sundae"],
        is_active: true,
        sort_order: 7,
      },
      "frozen-tacos": {
        name: "Frozen Tacos",
        description: "Ice cream served in crispy taco shells",
        price: 20000,
        image: PRODUCT_IMAGES["frozen-tacos"],
        is_active: true,
        sort_order: 8,
      },
      "waffle-basket-single-sundae": {
        name: "Waffle Basket Single Sundae",
        description: "Single scoop in a waffle basket",
        price: 12000,
        image: PRODUCT_IMAGES["waffle-basket-single-sundae"],
        is_active: true,
        sort_order: 9,
      },
      "cold-slab": {
        name: "Cold Slab",
        description: "Ice cream mixed on a cold stone slab",
        price: 20000,
        image: PRODUCT_IMAGES["cold-slab"],
        is_active: true,
        sort_order: 10,
      },
      "sizzling-volcano": {
        name: "Sizzling Volcano",
        description: "Hot and cold dessert experience",
        price: 20000,
        image: PRODUCT_IMAGES["sizzling-volcano"],
        is_active: true,
        sort_order: 11,
      },
      "triple-sundae": {
        name: "Triple Sundae",
        description: "Three scoops of your favorite flavors",
        price: 20000,
        image: PRODUCT_IMAGES["triple-sundae"],
        is_active: true,
        sort_order: 12,
      },
    }
    await set(ref(database, "product_types"), defaultProductTypes)
  }

  // Check if bakery_products exists
  const bakeryProductsSnapshot = await get(ref(database, "bakery_products"))
  if (!bakeryProductsSnapshot.exists()) {
    const defaultBakeryProducts: Record<string, Omit<BakeryProduct, "id">> = {
      crepes: {
        name: "Crepes",
        description: "Delicious thin French pancakes with Strawberry and Nutella",
        price: 12000,
        image: "/images/crepes.jpeg",
        category: "bakery",
        is_active: true,
        sort_order: 1,
      },
      waffles: {
        name: "Waffles",
        description: "Crispy Belgian waffles with your choice of toppings",
        price: 15000,
        image: "/images/waffles.jpeg",
        category: "bakery",
        is_active: true,
        sort_order: 2,
      },
      pancakes: {
        name: "Pancakes",
        description: "Fluffy stack of pancakes with delicious toppings",
        price: 10000,
        image: "/images/pancakes.png",
        category: "bakery",
        is_active: true,
        sort_order: 3,
      },
    }
    await set(ref(database, "bakery_products"), defaultBakeryProducts)
  }

  // Check if bakery_toppings exists
  const bakeryToppingsSnapshot = await get(ref(database, "bakery_toppings"))
  if (!bakeryToppingsSnapshot.exists()) {
    const defaultBakeryToppings: Record<string, Omit<BakeryTopping, "id">> = {
      nutella: { name: "Nutella", price: 2000, is_active: true, sort_order: 1 },
      honey: { name: "Honey", price: 1500, is_active: true, sort_order: 2 },
      strawberry: { name: "Strawberry", price: 2000, is_active: true, sort_order: 3 },
      banana: { name: "Banana", price: 1500, is_active: true, sort_order: 4 },
      blueberry: { name: "Blueberry", price: 2500, is_active: true, sort_order: 5 },
      sprinkles: { name: "Sprinkles", price: 1000, is_active: true, sort_order: 6 },
      "chocolate-chips": { name: "Chocolate Chips", price: 2000, is_active: true, sort_order: 7 },
      "chocolate-flakes": { name: "Chocolate Flakes", price: 2000, is_active: true, sort_order: 8 },
    }
    await set(ref(database, "bakery_toppings"), defaultBakeryToppings)
  }
}
