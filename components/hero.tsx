"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeroContent {
  badge_text: string
  main_title: string
  subtitle: string
  hero_image: string
  stat_flavors: string
  stat_delivery: string
  stat_rating: string
}

export function Hero() {
  const router = useRouter()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [content, setContent] = useState<HeroContent>({
    badge_text: "New Seasonal Flavor: Caramelised Fig",
    main_title: "Create Your Dream Scoop",
    subtitle:
      "Experience the joy of handcrafted ice cream. Choose from 24 premium flavors or build your own custom mix with our interactive builder.",
    hero_image: "/images/products/sundae-bowl.png",
    stat_flavors: "24+",
    stat_delivery: "15min",
    stat_rating: "4.9",
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePos({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/website-content")
        const data = await response.json()
        if (data.home_hero) {
          setContent(data.home_hero)
        }
      } catch (error) {
        console.error("Error fetching hero content:", error)
      }
    }
    fetchContent()
  }, [])

  return (
    <div className="relative overflow-hidden bg-cream pt-10 pb-20 md:pt-20 md:pb-32 min-h-[90vh] flex items-center">
      <div
        className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brandPeach/20 blur-3xl opacity-50 transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
      />
      <div
        className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brandLilac/20 blur-3xl opacity-50 transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-brandBlue text-sm font-semibold border border-brandBlue/10 animate-pulse">
              <Sparkles size={16} className="text-brandPeach" />
              <span>{content.badge_text}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brandBlue leading-tight">
              {content.main_title.split(" ").slice(0, -2).join(" ")} <br />
              <span className="text-brandPeach relative inline-block">
                {content.main_title.split(" ").slice(-2).join(" ")}
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-brandPeach/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-brandCocoa/80 max-w-lg leading-relaxed">{content.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/mix-builder")}
                className="px-8 py-4 bg-brandBlue text-white rounded-full font-bold text-lg hover:bg-brandBlue/90 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group transform hover:scale-105"
              >
                Start Mixing
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => router.push("/menu")}
                className="px-8 py-4 bg-white text-brandBlue border-2 border-brandBlue/10 rounded-full font-bold text-lg hover:bg-brandBlue/5 transition flex items-center justify-center transform hover:scale-105"
              >
                View Menu
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="transform hover:scale-110 transition-transform cursor-default">
                <p className="font-serif text-3xl font-bold text-brandBlue">{content.stat_flavors}</p>
                <p className="text-sm text-brandCocoa/60 uppercase tracking-wider">Flavors</p>
              </div>
              <div className="w-px h-12 bg-brandCocoa/10"></div>
              <div className="transform hover:scale-110 transition-transform cursor-default">
                <p className="font-serif text-3xl font-bold text-brandBlue">{content.stat_delivery}</p>
                <p className="text-sm text-brandCocoa/60 uppercase tracking-wider">Delivery</p>
              </div>
              <div className="w-px h-12 bg-brandCocoa/10"></div>
              <div className="transform hover:scale-110 transition-transform cursor-default">
                <p className="font-serif text-3xl font-bold text-brandBlue">{content.stat_rating}</p>
                <p className="text-sm text-brandCocoa/60 uppercase tracking-wider">Rating</p>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center perspective-1000">
            <div
              className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] transition-transform duration-100 ease-out preserve-3d"
              style={{
                transform: `rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg) translateZ(20px)`,
              }}
            >
              <div className="absolute inset-0 bg-white rounded-full shadow-2xl opacity-40 animate-float-delayed backdrop-blur-sm border border-white/50"></div>

              <img
                src={content.hero_image || "/images/products/sundae-bowl.png"}
                alt="Delicious Ice Cream Bowl"
                className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl animate-float p-8"
                style={{
                  transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
                }}
              />

              <div
                className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow"
                style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)` }}
              >
                <span className="text-4xl">🍓</span>
              </div>
              <div
                className="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow delay-75"
                style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -10}px)` }}
              >
                <span className="text-4xl">🍫</span>
              </div>
              <div
                className="absolute top-1/2 -right-16 bg-white p-3 rounded-2xl shadow-xl animate-bounce-slow delay-150"
                style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -30}px)` }}
              >
                <span className="text-3xl">🥜</span>
              </div>

              <div className="absolute -bottom-10 right-10 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl max-w-xs transform hover:scale-105 transition-transform cursor-pointer border border-brandBlue/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brandPeach rounded-full flex items-center justify-center text-white font-bold text-xl">
                    🎉
                  </div>
                  <div>
                    <p className="font-bold text-brandBlue">Free Toppings</p>
                    <p className="text-xs text-brandCocoa/70">On all large orders today!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
