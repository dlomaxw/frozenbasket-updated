
import { Suspense } from "react"
import { getFeaturedItems } from "@/lib/data-fetching"
import { HomeClient } from "@/components/home/home-client"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const featuredItems = await getFeaturedItems()

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <HomeClient featuredItems={featuredItems} />
    </Suspense>
  )
}
