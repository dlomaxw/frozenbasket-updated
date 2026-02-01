import { type NextRequest, NextResponse } from "next/server"

// Mock settings storage (in-memory for demo, resets on restart)
let mockSettings: Record<string, any> = {
  theme: "classic",
  announcement: "Welcome to Frozen Basket!",
  promoActive: true
}

export async function GET() {
  return NextResponse.json(mockSettings)
}

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json()
    mockSettings[key] = value
    return NextResponse.json({ success: true, mock: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
