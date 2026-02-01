import { NextResponse, type NextRequest } from "next/server"

export default async function proxy(request: NextRequest) {
  // Allow all requests through - authentication is handled in individual pages
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
