"use client"

import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MapPin, Phone, Clock, Sparkles } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { motion } from "framer-motion"
import { HeroSlider } from "@/components/hero-slider"

export default function HomePage() {
  const { getItemCount } = useCartStore()
  const cartCount = getItemCount()

  // Framer motion variants for Hero Text
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader cartCount={cartCount} />
      <main className="flex-grow">
        {/* Hero Slider Section */}
        <HeroSlider />

        {/* Menu Preview */}
        {/* Menu Preview */}
        <section className="py-16 px-4 bg-[#a54c9d]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Weekly Picks - Customer's Recommendations
            </h2>
            <p data-aos="fade-up" data-aos-delay="100" className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Explore our wide range of sundaes, bars, waffle cones, and specialty treats
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { name: "Happy Bars", price: "6,000" },
                { name: "Single Sundae", price: "12,000" },
                { name: "Jar Sundae", price: "20,000" },
                { name: "Triple Sundae", price: "25,000" },
              ].map((item, index) => (
                <div
                  key={item.name}
                  data-aos="fade-up"
                  data-aos-delay={(index + 2) * 100}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                >
                  <h3 className="font-semibold text-brandCocoa mb-1">{item.name}</h3>
                  <p className="text-brandBlue font-bold">{item.price}/=</p>
                </div>
              ))}
            </div>
            <Link
              href="/menu"
              data-aos="zoom-in"
              data-aos-delay="500"
              className="inline-flex items-center justify-center text-brandCocoa px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transform"
              style={{ backgroundColor: 'var(--pink-highlight)' }}
            >
              View Full Menu
            </Link>
          </div>
        </section>



        {/* Location Section - Visit Us */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-cream">
          <div className="max-w-4xl mx-auto">
            <div data-aos="zoom-in-up" className="rounded-3xl p-8 md:p-12 text-white text-center hover:shadow-2xl transition-shadow duration-500" style={{ backgroundColor: 'var(--purple-bg)' }}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-brandPeach">
                Visit Us Today
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center group">
                  <MapPin size={32} className="mb-2 group-hover:animate-bounce-slow transition-transform text-brandPeach" />
                  <p className="font-medium">Opp. Lohana Academy</p>
                  <p className="text-white/80">Kisement, Kampala</p>
                </div>
                <div className="flex flex-col items-center group">
                  <Phone size={32} className="mb-2 group-hover:animate-bounce-slow transition-transform text-brandPeach" />
                  <p className="font-medium">+256 753 522 992</p>
                  <p className="text-white/80">Call or WhatsApp</p>
                </div>
                <div className="flex flex-col items-center group">
                  <Clock size={32} className="mb-2 group-hover:animate-bounce-slow transition-transform text-brandPeach" />
                  <p className="font-medium">Open Daily</p>
                  <p className="text-white/80">10 AM - 10 PM</p>
                </div>
              </div>
              <a
                href="tel:+256753522992"
                className="inline-flex items-center justify-center text-brandCocoa px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:-translate-y-1"
                style={{ backgroundColor: 'var(--pink-highlight)' }}
              >
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
