"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface CarouselImage {
  src: string
  alt: string
}

export function BrandCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/website-content")
        const data = await response.json()
        if (data.carousel_images && data.carousel_images.length > 0) {
          setCarouselImages(data.carousel_images)
        }
      } catch (error) {
        console.error("Error fetching carousel images:", error)
      }
    }
    fetchImages()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, carouselImages.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-cream to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-brandCocoa mb-4">Experience Frozen Basket</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Where every scoop is crafted with love and every moment is made memorable
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Images */}
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-brandCocoa rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 group"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:animate-mascot-wave"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-brandCocoa rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 group"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:animate-mascot-wave"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slide Caption */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-center text-lg md:text-xl font-medium animate-fade-in">
                {carouselImages[currentIndex]?.alt || "Loading..."}
              </p>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex ? "w-12 h-3 bg-brandBlue" : "w-3 h-3 bg-gray-300 hover:bg-brandPeach"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/4 w-32 h-32 bg-brandPeach/20 rounded-full blur-3xl animate-float -z-10" />
        <div className="absolute right-0 bottom-1/4 w-40 h-40 bg-brandLilac/20 rounded-full blur-3xl animate-float-delayed -z-10" />
      </div>
    </section>
  )
}
