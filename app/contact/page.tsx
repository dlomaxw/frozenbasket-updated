"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCartStore } from "@/lib/cart-store"
import { MapPin, Phone, Clock, Mail, MessageCircle, Send, Instagram, Facebook } from "lucide-react"

export default function ContactPage() {
  const { getItemCount } = useCartStore()
  const cartCount = getItemCount()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fff0f5]">
      <SiteHeader cartCount={cartCount} />
      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-12 px-4 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brandCocoa mb-4 animate-fade-in-up">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-100">
              We would love to hear from you! Reach out for orders, inquiries, or just to say hello.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Location */}
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up delay-100 group">
                <div className="w-14 h-14 bg-brandBlue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brandBlue/20 transition-colors">
                  <MapPin size={28} className="text-brandBlue group-hover:animate-bounce-slow" />
                </div>
                <h3 className="font-semibold text-brandCocoa mb-2">Visit Us</h3>
                <p className="text-gray-600">Opp. Lohana Academy</p>
                <p className="text-gray-600">Kisement, Kampala</p>
                <p className="text-gray-600">Uganda</p>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up delay-200 group">
                <div className="w-14 h-14 bg-brandPeach/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brandPeach/20 transition-colors">
                  <Phone size={28} className="text-brandPeach group-hover:animate-bounce-slow" />
                </div>
                <h3 className="font-semibold text-brandCocoa mb-2">Call Us</h3>
                <a href="tel:+256753522992" className="text-brandBlue hover:underline block">
                  +256 753 522 992
                </a>
                <a href="tel:+256759091201" className="text-brandBlue hover:underline block">
                  +256 759 091201
                </a>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up delay-300 group">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Clock size={28} className="text-green-600 group-hover:animate-bounce-slow" />
                </div>
                <h3 className="font-semibold text-brandCocoa mb-2">Opening Hours</h3>
                <p className="text-gray-600">Monday - Sunday</p>
                <p className="text-brandBlue font-medium">10:00 AM - 10:00 PM</p>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up delay-400 group">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <MessageCircle size={28} className="text-green-600 group-hover:animate-bounce-slow" />
                </div>
                <h3 className="font-semibold text-brandCocoa mb-2">WhatsApp</h3>
                <a
                  href="https://wa.me/256753522992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  Chat with us
                </a>
                <p className="text-gray-500 text-sm mt-1">Quick responses!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-200">
                <h2 className="text-2xl font-serif font-bold text-brandCocoa mb-6">
                  Send Us a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-brandCocoa mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-4">Thank you for reaching out. We will get back to you soon.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-brandBlue hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brandCocoa mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brandCocoa mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 outline-none transition"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-brandCocoa mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 outline-none transition"
                        placeholder="+256 700 000 000"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-brandCocoa mb-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 outline-none transition resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brandBlue text-white py-4 rounded-full font-semibold hover:bg-brandBlue/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Map & Social */}
              <div className="space-y-6">
                {/* Map Section */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="aspect-video bg-gradient-to-br from-brandBlue/10 to-pink-50 flex items-center justify-center relative">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-brandBlue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin size={40} className="text-brandBlue" />
                      </div>
                      <h3 className="text-xl font-semibold text-brandCocoa mb-2">Find Us</h3>
                      <p className="text-gray-600 mb-1">Opp. Lohana Academy</p>
                      <p className="text-gray-600 mb-1">Kisement, Kampala</p>
                      <p className="text-gray-600">Uganda</p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <a
                      href="https://maps.google.com/?q=Lohana+Academy+Kisement+Kampala+Uganda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-brandBlue text-white px-6 py-3 rounded-full font-medium hover:bg-brandBlue/90 transition"
                    >
                      <MapPin size={18} />
                      Get Directions
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-400">
                  <h3 className="font-semibold text-brandCocoa mb-4 text-center">Follow Us</h3>
                  <div className="flex justify-center gap-4">
                    <a
                      href="https://www.instagram.com/frozenbasketug"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                      aria-label="Instagram"
                    >
                      <Instagram size={24} />
                    </a>
                    <a
                      href="https://www.tiktok.com/@frozenbasketug"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                      aria-label="TikTok"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@FrozenBasket"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                      aria-label="YouTube"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/256753522992"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle size={24} />
                    </a>
                  </div>
                </div>

                {/* Quick Order CTA */}
                <div className="bg-gradient-to-r from-brandPeach to-pink-400 rounded-2xl p-6 text-white text-center hover:shadow-xl transition-all duration-300 animate-fade-in-up delay-500 group">
                  <h3 className="font-bold text-xl mb-2">Ready to Order?</h3>
                  <p className="mb-4 text-white/90">Call us directly for quick orders!</p>
                  <a
                    href="tel:+256753522992"
                    className="inline-flex items-center gap-2 bg-white text-brandPeach px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105"
                  >
                    <Phone size={20} className="group-hover:animate-bounce-slow" />
                    +256 753 522 992
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
