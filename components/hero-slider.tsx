"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Phone, Sparkles, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function HeroSlider() {
    const plugin = React.useRef(
        // @ts-ignore
        Autoplay({ delay: 5000, stopOnInteraction: false })
    )

    const slides = [
        {
            id: 1,
            title: (
                <>
                    Believe In Love
                    <span className="block text-brandPeach">at First Bite</span>
                </>
            ),
            description:
                "Handcrafted premium ice cream made with 100% milk cream. Experience enchanting flavors that will delight your taste buds.",
            image: "/images/hero-new/slide1.png",
            ctaPrimary: { text: "View Our Menu", href: "/menu" },
            ctaSecondary: { text: "Call Us", href: "tel:+256753522992", icon: Phone },
            bg: "bg-[#a54c9d]",
            textColor: "text-white",
            descColor: "text-white/90"
        },

        {
            id: 3,
            title: (
                <>
                    Layers of
                    <span className="block text-brandPeach">Happiness</span>
                </>
            ),
            description:
                "From our famous Jar Sundaes to our loaded Triple Sundaes. Every layer is packed with joy.",
            image: "/images/hero-new/slide3.png",
            ctaPrimary: { text: "View Sundaes", href: "/menu" },
            bg: "bg-[#a54c9d]",
            textColor: "text-white",
            descColor: "text-white/90"
        },
        {
            id: 4,
            title: (
                <>
                    Sip on
                    <span className="block text-brandPeach">Pure Delight</span>
                </>
            ),
            description:
                "Refreshing milkshakes and thick shakes made from our premium ice cream. The perfect treat for any day.",
            image: "/images/hero-new/slide4.png",
            ctaPrimary: { text: "View Shakes", href: "/menu" },
            bg: "bg-[#a54c9d]",
            textColor: "text-white",
            descColor: "text-white/90"
        },
        {
            id: 5,
            title: (
                <>
                    Cone or Cup?
                    <span className="block text-brandPeach">Your Choice!</span>
                </>
            ),
            description:
                "Enjoy our rich, creamy scoops in a crispy waffle cone or a classic cup. Happiness in every serving.",
            image: "/images/hero-new/slide5.png",
            ctaPrimary: { text: "View Flavors", href: "/menu" },
            bg: "bg-[#a54c9d]",
            textColor: "text-white",
            descColor: "text-white/90"
        },
    ]

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full relative overflow-hidden"
            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent>
                {slides.map((slide) => (
                    <CarouselItem key={slide.id} className="pl-0">
                        <section className={`relative py-12 md:py-20 px-4 overflow-hidden ${slide.bg} min-h-[600px] flex items-center`}>
                            <div className="max-w-6xl mx-auto w-full">
                                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

                                    {/* Text Content */}
                                    <div className="flex-1 text-center md:text-left z-10">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold ${
                                                // @ts-ignore
                                                slide.textColor || "text-brandCocoa"} mb-4 leading-tight`}>
                                                {slide.title}
                                            </h1>
                                            <p className={`text-lg md:text-xl ${
                                                // @ts-ignore
                                                slide.descColor || "text-gray-600"} mb-8 max-w-lg mx-auto md:mx-0`}>
                                                {slide.description}
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                                <Link
                                                    href={slide.ctaPrimary.href}
                                                    className="inline-flex items-center justify-center bg-brandBlue text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-brandBlue/90 transition-all shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1"
                                                >
                                                    {slide.ctaPrimary.text}
                                                </Link>

                                                {slide.ctaSecondary && (
                                                    <a
                                                        href={slide.ctaSecondary.href}
                                                        className="inline-flex items-center justify-center bg-brandBlue text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-brandBlue/90 transition-all hover:scale-105 shadow-lg"
                                                    >
                                                        {slide.ctaSecondary.icon && <slide.ctaSecondary.icon size={20} className="mr-2 animate-pulse" />}
                                                        {slide.ctaSecondary.text}
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Hero Image */}
                                    <div className="flex-1 relative animate-float w-full flex justify-center z-10">
                                        <motion.div
                                            className="relative w-full max-w-md aspect-square flex items-center justify-center"
                                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                            transition={{ duration: 0.8 }}
                                        >
                                            {/* Decorative Circle Background */}
                                            <div className="absolute w-[90%] h-[90%] bg-white/50 rounded-full blur-xl" />

                                            <div className="relative w-full h-full z-10">
                                                <Image
                                                    src={slide.image}
                                                    alt="Hero Slide"
                                                    fill
                                                    className="object-contain drop-shadow-2xl"
                                                    priority={slide.id === 1}
                                                />
                                            </div>
                                        </motion.div>
                                    </div>

                                </div>
                            </div>

                            {/* Decorative floating elements (Global) */}
                            <div className="absolute top-20 left-10 w-4 h-4 bg-brandPeach/40 rounded-full animate-float delay-100 hidden md:block" />
                            <div className="absolute top-40 right-20 w-6 h-6 bg-brandBlue/30 rounded-full animate-float-delayed hidden md:block" />
                            <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-pink-300/50 rounded-full animate-bounce-slow hidden md:block" />
                        </section>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* Optional: Add navigation buttons or dots here if desired, but user just asked for slider panel */}
        </Carousel>
    )
}
