
import { Suspense } from "react"
import { getMenuData } from "@/lib/data-fetching"
import { MenuClient } from "@/components/menu/menu-client"

export const dynamic = 'force-dynamic' // Ensure we don't statically cache this endlessly if DB changes

export default async function MenuPage() {
  const menuData = await getMenuData()

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fff0f5] flex items-center justify-center">Loading Menu...</div>}>
      <MenuClient initialData={menuData} />
    </Suspense>
  )
}
