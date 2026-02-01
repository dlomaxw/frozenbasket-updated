"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCartStore } from "@/lib/cart-store"
import { Award, Heart, Leaf, Truck } from "lucide-react"
import { useEffect, useState } from "react"

interface AboutContent {
  title: string
  subtitle: string
  cards: Array<{ title: string; icon: string; description: string }>
  mission_title: string
  mission_text: string
}

export default function AboutPage() {
  const itemCount = useCartStore((state) => state.getItemCount())
  const [content, setContent] = useState<AboutContent>({
    title: "About Frozen Basket",
    subtitle:
      "Crafting moments of pure joy, one scoop at a time. We believe ice cream should be an experience, not just a dessert.",
    cards: [
      {
        title: "Handcrafted with Love",
        icon: "heart",
        description:
          "Every batch is made fresh daily using traditional techniques and premium ingredients sourced from local suppliers.",
      },
      {
        title: "Natural Ingredients",
        icon: "leaf",
        description:
          "No artificial flavors or preservatives. We use real fruits, nuts, and premium chocolate in all our creations.",
      },
      {
        title: "Award Winning",
        icon: "award",
        description:
          "Recognized as Kampala's best artisan ice cream, with awards for innovation and quality excellence.",
      },
      {
        title: "Fast Delivery",
        icon: "truck",
        description:
          "We deliver your ice cream frozen solid within 15 minutes, ensuring perfect quality when it arrives.",
      },
    ],
    mission_title: "Our Mission",
    mission_text:
      "To bring people together through exceptional ice cream experiences. We're not just selling dessert - we're creating memories, celebrating moments, and spreading happiness one delicious scoop at a time.",
  })

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/website-content")
        const data = await response.json()
        if (data.about_page) {
          setContent(data.about_page)
        }
      } catch (error) {
        console.error("Error fetching about content:", error)
      }
    }
    fetchContent()
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "heart":
        return <Heart className="text-white" size={24} />
      case "leaf":
        return <Leaf className="text-white" size={24} />
      case "award":
        return <Award className="text-white" size={24} />
      case "truck":
        return <Truck className="text-white" size={24} />
      default:
        return <Heart className="text-white" size={24} />
    }
  }

  const getCardBg = (iconName: string) => {
    switch (iconName) {
      case "heart":
        return "bg-brandBlue"
      case "leaf":
        return "bg-brandPeach"
      case "award":
        return "bg-brandLilac"
      case "truck":
        return "bg-brandBlue"
      default:
        return "bg-brandBlue"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader cartCount={itemCount} />
      <main className="flex-grow bg-cream overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-5xl font-serif font-bold text-brandBlue mb-6 text-center animate-fade-in-up">{content.title}</h1>
          <p className="text-xl text-brandCocoa/80 text-center mb-16 leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-100">
            {content.subtitle}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {content.cards.map((card, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-brandPeach/20 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up group"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className={`w-12 h-12 ${getCardBg(card.icon)} rounded-full flex items-center justify-center mb-4 group-hover:animate-bounce-slow transition-transform`}>
                  {getIcon(card.icon)}
                </div>
                <h3 className="text-2xl font-bold text-brandCocoa mb-3">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-brandBlue text-white p-12 rounded-2xl text-center hover:shadow-2xl transition-all duration-500 animate-fade-in-scale delay-500">
            <h2 className="text-3xl font-serif font-bold mb-4 animate-fade-in-up delay-600">{content.mission_title}</h2>
            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-600">{content.mission_text}</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
