"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const products = [
  {
    id: 1,
    image: "/images/products/sundae-bowl.png",
    name: "Classic Sundae Bowl",
    description: "Creamy ice cream with your favorite toppings"
  },
  {
    id: 2,
    image: "/images/products/chocolate-bar.png",
    name: "Chocolate Happy Bar",
    description: "Rich chocolate coating on premium ice cream"
  },
  {
    id: 3,
    image: "/images/products/parfait-sundae.png",
    name: "Parfait Sundae",
    description: "Layered perfection in every bite"
  },
  {
    id: 4,
    image: "/images/products/vanilla-bar.png",
    name: "Vanilla Happy Bar",
    description: "Classic vanilla dipped in white chocolate"
  },
  {
    id: 5,
    image: "/images/products/ice-cream-boat.png",
    name: "Ice Cream Boat",
    description: "A boat full of ice cream goodness"
  },
  {
    id: 6,
    image: "/images/products/caramel-bar.png",
    name: "Caramel Drizzle Bar",
    description: "Sweet caramel on creamy ice cream"
  },
  {
    id: 7,
    image: "/images/products/pistachio-bar.png",
    name: "Pistachio Happy Bar",
    description: "Nutty pistachio flavor delight"
  },
  {
    id: 8,
    image: "/images/products/mango-bar.png",
    name: "Mango Happy Bar",
    description: "Tropical mango burst of flavor"
  },
]

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [slidesToShow, setSlidesToShow] = useState(4)

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3)
      } else {
        setSlidesToShow(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, products.length - slidesToShow)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110 hover:shadow-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-brandCocoa" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110 hover:shadow-xl"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-brandCocoa" />
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden mx-8">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-2">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-cream">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-semibold text-brandCocoa text-center mb-1 group-hover:text-brandBlue transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 hover:bg-brandPeach/70 ${
              index === currentIndex ? "bg-brandPeach w-6" : "bg-gray-300 w-2 hover:w-4"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
