import { NextResponse } from "next/server"
import { PRODUCT_TYPES } from "@/lib/constants"

export async function GET() {
  try {
    // Mocking database response using constants because Supabase is not configured
    const products = Object.values(PRODUCT_TYPES).map((p: any) => ({
      ...p,
      // Transform camelCase keys to snake_case to match expected DB schema
      max_flavors: p.maxFlavors ?? p.max_flavors ?? 0,
      max_toppings: p.maxToppings ?? p.max_toppings ?? 0,
      max_sauces: p.maxSauces ?? p.max_sauces ?? 0,
      allowed_flavors: p.allowedFlavors ?? p.allowed_flavors ?? "",
      can_mix: p.canMix ?? p.can_mix ?? false,
      sort_order: p.id === "naturalIceCream" ? 1 : 99, // Basic sorting example
    }))

    console.log("[v0] Returning static products (Supabase bypassed):", products.length)
    return NextResponse.json(products)
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

