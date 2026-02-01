"use client"

import { useState, useEffect } from "react"
import { FLAVORS } from "@/lib/constants"
import type { Flavor } from "@/lib/types"
import { Search, Plus, IceCream, Sparkles, Croissant } from "lucide-react"
import { getProductTypes, getBakeryProducts, initializeDefaultData, forceUpdateAllImages, type ProductType, type BakeryProduct } from "@/lib/local-api"
import Link from "next/link"

interface MenuGridProps {
  onAddQuick: (item: Flavor) => void
}

const categories = ["All", "Classic", "Premium", "Fruit", "Sorbet", "Kulfi"]

export function MenuGrid({ onAddQuick }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [mixProducts, setMixProducts] = useState<ProductType[]>([])
  const [bakeryProducts, setBakeryProducts] = useState<BakeryProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingBakery, setLoadingBakery] = useState(true)

  // Fetch products from Firebase
  useEffect(() => {
    async function fetchData() {
      try {
        // Try to initialize default data (may fail if no write permission)
        try {
          await initializeDefaultData()
          // Force update all images to ensure correct images are displayed
          await forceUpdateAllImages()
        } catch (initErr) {
          // Silently continue if init fails
        }

        // Fetch mix builder products
        const products = await getProductTypes()
        if (products.length > 0) {
          setMixProducts(products)
        }
        setLoadingProducts(false)

        // Fetch bakery products
        const bakery = await getBakeryProducts()
        if (bakery.length > 0) {
          setBakeryProducts(bakery)
        }
        setLoadingBakery(false)
      } catch (err) {
        console.error("[v0] Failed to fetch products:", err)
        setLoadingProducts(false)
        setLoadingBakery(false)
      }
    }

    fetchData()
  }, [])

  const filteredFlavors = FLAVORS.filter((f) => {
    const matchesCategory = activeCategory === "All" || f.category === activeCategory
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredProducts = mixProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION 1: Mix Builder Products (12 Products from Database) */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brandPeach/20 text-brandPeach px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Sparkles size={16} />
              Build Your Own
            </div>
            <h2 className="text-4xl font-serif font-bold text-brandBlue mb-4">Mix Builder Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create your perfect ice cream experience with our 12 customizable products. Choose your base, flavors, toppings, and more!
            </p>
          </div>

          {loadingProducts ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandBlue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mixProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-cream rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-transparent hover:border-brandPeach/30"
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-brandPeach/20 to-brandBlue/10">
                    <img
                      src={product.image || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 p-4"
                    />
                    <div className="absolute top-3 right-3 bg-brandPeach text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                      {(Number(product.price) / 1000).toFixed(0)}k UGX
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-serif font-bold text-xl text-brandCocoa mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description || "Customize this delicious treat!"}
                    </p>
                    <div className="mt-auto">
                      <Link
                        href={`/mix-builder?product=${product.id}`}
                        className="block w-full bg-brandBlue text-white text-center font-bold py-2.5 px-4 rounded-full hover:bg-brandBlue/90 transition-colors shadow-md text-sm"
                      >
                        Customize Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingProducts && mixProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No products available at the moment.</p>
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px bg-border"></div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <IceCream size={20} />
            <span className="font-medium">Or explore our flavors</span>
          </div>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* SECTION 2: Ice Cream Flavors (24 Flavors from Constants) */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brandBlue/10 text-brandBlue px-4 py-2 rounded-full text-sm font-bold mb-4">
              <IceCream size={16} />
              24 Premium Flavors
            </div>
            <h2 className="text-4xl font-serif font-bold text-brandBlue mb-4">Our Flavors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore 24 handcrafted flavors made with premium ingredients. Available in cups, cones, and take-home tubs.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 sticky top-24 bg-background/95 backdrop-blur z-20 p-4 rounded-xl border border-border shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                      ? "bg-brandBlue text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search flavors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-full focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFlavors.map((flavor) => (
              <div
                key={flavor.id}
                className="group bg-cream rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-transparent hover:border-brandPeach/30"
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={flavor.image || "/placeholder.svg"}
                    alt={flavor.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 p-4"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-brandBlue uppercase tracking-wider">
                    {flavor.category}
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => onAddQuick(flavor)}
                      className="bg-white text-brandBlue font-bold py-3 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 shadow-lg"
                    >
                      <Plus size={18} /> Quick Add
                    </button>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif font-bold text-xl text-brandCocoa leading-tight">{flavor.name}</h3>
                    <span className="font-bold text-brandBlue text-lg">{(flavor.price / 1000).toFixed(1)}k</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{flavor.description}</p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {flavor.notes.split(", ").map((note) => (
                        <span
                          key={note}
                          className="text-[10px] px-2 py-1 bg-brandBlue/5 text-brandBlue rounded-full uppercase tracking-wider font-semibold"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                    {flavor.allergens.length > 0 && (
                      <p className="text-xs text-muted-foreground/60 italic">Allergens: {flavor.allergens.join(", ")}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFlavors.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No flavors found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearch("")
                  setActiveCategory("All")
                }}
                className="mt-4 text-brandBlue font-semibold underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Divider for Bakery */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-border"></div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Croissant size={20} />
            <span className="font-medium">Fresh from our bakery</span>
          </div>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* SECTION 3: Bakery Products */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Croissant size={16} />
              Fresh Bakery
            </div>
            <h2 className="text-4xl font-serif font-bold text-brandBlue mb-4">Bakery Delights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enjoy our freshly made crepes, waffles, and pancakes with delicious toppings like Nutella, honey, strawberry, banana, and more!
            </p>
          </div>

          {loadingBakery ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bakeryProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-cream rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-transparent hover:border-amber-300/50"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                    <img
                      src={product.image || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md uppercase tracking-wider">
                      Bakery
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-amber-700 px-3 py-1 rounded-full text-sm font-bold shadow-md">
                      {(Number(product.price) / 1000).toFixed(0)}k UGX
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif font-bold text-2xl text-brandCocoa mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description || "Delicious bakery treat with your choice of toppings!"}
                    </p>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {["Nutella", "Honey", "Strawberry", "Banana"].map((topping) => (
                          <span
                            key={topping}
                            className="text-[10px] px-2 py-1 bg-amber-100 text-amber-700 rounded-full uppercase tracking-wider font-semibold"
                          >
                            {topping}
                          </span>
                        ))}
                        <span className="text-[10px] px-2 py-1 bg-amber-100 text-amber-700 rounded-full uppercase tracking-wider font-semibold">
                          +4 more
                        </span>
                      </div>
                      <Link
                        href={`/bakery/${product.id}`}
                        className="block w-full bg-amber-500 text-white text-center font-bold py-3 px-6 rounded-full hover:bg-amber-600 transition-colors shadow-md"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loadingBakery && bakeryProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No bakery products available at the moment.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
