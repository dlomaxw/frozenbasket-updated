import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("[v0] Missing Supabase env vars:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseServiceKey,
      urlValue: supabaseUrl ? "set" : "missing",
      keyValue: supabaseServiceKey ? "set" : "missing",
    })
    return null
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function POST(request: Request) {
  console.log("[v0] POST /api/orders called")

  try {
    const supabaseAdmin = getSupabaseAdmin()

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Server configuration error - missing database credentials" }, { status: 500 })
    }

    let body
    try {
      body = await request.json()
      console.log("[v0] Request body parsed successfully")
    } catch (parseError) {
      console.error("[v0] Failed to parse request body:", parseError)
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { customerInfo, items, total } = body

    // Validate required fields
    if (!customerInfo?.fullName || !customerInfo?.phone) {
      console.error("[v0] Missing customer info:", {
        hasName: !!customerInfo?.fullName,
        hasPhone: !!customerInfo?.phone,
      })
      return NextResponse.json({ error: "Customer name and phone are required" }, { status: 400 })
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("[v0] Invalid items:", { items })
      return NextResponse.json({ error: "At least one item is required" }, { status: 400 })
    }

    const calculatedTotal = items.reduce((sum: number, item: any) => {
      const itemTotal = (item.price || 0) * (item.quantity || 1)
      return sum + itemTotal
    }, 0)

    // Create order
    const orderData = {
      customer_name: customerInfo.fullName,
      customer_email: customerInfo.email || null,
      customer_phone: customerInfo.phone,
      total_amount: calculatedTotal || 0,
      status: "pending",
      payment_method: customerInfo.paymentMethod || "cash",
      delivery_address: customerInfo.address || null,
      notes: customerInfo.notes || null,
    }

    console.log("[v0] Inserting order:", JSON.stringify(orderData))

    const { data: order, error: orderError } = await supabaseAdmin.from("orders").insert(orderData).select().single()

    if (orderError) {
      console.error("[v0] Order insert error:", JSON.stringify(orderError))
      return NextResponse.json({ error: `Database error: ${orderError.message}`, details: orderError }, { status: 500 })
    }

    if (!order) {
      console.error("[v0] No order returned after insert")
      return NextResponse.json({ error: "Order creation failed - no data returned" }, { status: 500 })
    }

    console.log("[v0] Order created:", order.id)

    // Create order items
    const orderItems = items.map((item: any, index: number) => {
      const isSingleItem = item.type === "single"
      const productId = isSingleItem ? String(item.item?.id || `product-${index}`) : `custom-mix-${Date.now()}-${index}`

      const productName = isSingleItem
        ? item.item?.name || "Ice Cream"
        : `${item.item?.productType || "Custom Mix"} - ${item.item?.name || "Custom Order"}`

      return {
        order_id: order.id,
        product_id: productId,
        product_name: productName,
        product_image: isSingleItem ? item.item?.image || null : null,
        quantity: item.quantity || 1,
        price: item.price || 0, // This is the unit price
        customizations:
          item.type === "mix"
            ? {
                productType: item.item?.productType,
                flavors: item.item?.flavors,
                toppings: item.item?.toppings,
                sauces: item.item?.sauces,
                size: item.item?.size,
              }
            : null,
      }
    })

    console.log("[v0] Inserting order items:", JSON.stringify(orderItems))

    const { error: itemsError } = await supabaseAdmin.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("[v0] Order items insert error:", JSON.stringify(itemsError))
      // Rollback order
      await supabaseAdmin.from("orders").delete().eq("id", order.id)
      return NextResponse.json({ error: `Failed to save order items: ${itemsError.message}` }, { status: 500 })
    }

    console.log("[v0] Order completed successfully:", order.id)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: "Order placed successfully!",
    })
  } catch (error) {
    console.error("[v0] Unexpected error in POST /api/orders:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  console.log("[v0] GET /api/orders called")

  try {
    const supabaseAdmin = getSupabaseAdmin()

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("id") || searchParams.get("orderId")

    if (orderId) {
      console.log("[v0] Fetching single order:", orderId)

      const { data: order, error } = await supabaseAdmin
        .from("orders")
        .select(
          `
          *,
          items:order_items (
            id,
            product_name,
            product_image,
            quantity,
            price,
            customizations
          )
        `,
        )
        .eq("id", orderId)
        .single()

      if (error) {
        console.error("[v0] Get order error:", error)
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }

      return NextResponse.json({
        order: {
          ...order,
          items: order.items.map((item: any) => ({
            ...item,
            unit_price: item.price,
          })),
        },
      })
    }

    // Get all orders for admin
    console.log("[v0] Fetching all orders")

    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select(
        `
        *,
        items:order_items (
          id,
          product_name,
          product_image,
          quantity,
          price,
          customizations
        )
      `,
      )
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Get orders error:", error)
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }

    console.log("[v0] Fetched", orders?.length || 0, "orders")

    return NextResponse.json(orders || [])
  } catch (error) {
    console.error("[v0] Unexpected error in GET /api/orders:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  console.log("[v0] PATCH /api/orders called")

  try {
    const supabaseAdmin = getSupabaseAdmin()

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 })
    }

    console.log("[v0] Updating order", orderId, "to status:", status)

    const { error } = await supabaseAdmin
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", orderId)

    if (error) {
      console.error("[v0] Update order error:", error)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }

    console.log("[v0] Order updated successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Unexpected error in PATCH /api/orders:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
