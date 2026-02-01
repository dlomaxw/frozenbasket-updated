"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCartStore } from "@/lib/cart-store"
import { Car, Clock, Phone, MapPin } from "lucide-react"

export default function CarMenuPage() {
    const { getItemCount } = useCartStore()
    const cartCount = getItemCount()

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-cream">
            <SiteHeader cartCount={cartCount} />

            <main className="flex-grow py-12 px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 bg-purple-100 rounded-full mb-6 animate-bounce-slow">
                        <Car size={48} className="text-purple-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brandCocoa mb-4 animate-fade-in-up">
                        Car Menu / Drive-Thru
                    </h1>
                    <p className="text-lg text-gray-600 animate-fade-in-up delay-100">
                        Order from the comfort of your car! Call ahead or park in our designated spots.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border-l-8 border-purple-500 animate-fade-in-up delay-200">
                        <h2 className="text-2xl font-bold text-brandCocoa mb-4 flex items-center gap-2">
                            <Phone className="text-purple-500" />
                            How to Order
                        </h2>
                        <ol className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="bg-purple-100 text-purple-700 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</span>
                                <span> Browse our Simplified Car Menu below.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="bg-purple-100 text-purple-700 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</span>
                                <span> Call <a href="tel:+256753522992" className="font-bold text-purple-600 hover:underline">+256 753 522 992</a> with your order details.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="bg-purple-100 text-purple-700 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</span>
                                <span> Drive to our pickup zone or park in a designated spot.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="bg-purple-100 text-purple-700 w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5">4</span>
                                <span> We'll bring your fresh order right to your window!</span>
                            </li>
                        </ol>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-3xl shadow-xl text-white animate-fade-in-up delay-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Clock className="text-pink-300" />
                            Quick Picks
                        </h2>
                        <p className="mb-6 text-white/90">Perfect for on-the-go enjoyment. Ready in 5 minutes!</p>

                        <div className="space-y-4">
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm flex justify-between items-center hover:bg-white/20 transition cursor-pointer">
                                <div>
                                    <h3 className="font-bold">Milkshake Combo</h3>
                                    <p className="text-sm text-pink-200">Any 2 Large Shakes</p>
                                </div>
                                <span className="font-bold text-xl">25,000/=</span>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm flex justify-between items-center hover:bg-white/20 transition cursor-pointer">
                                <div>
                                    <h3 className="font-bold">Family Box</h3>
                                    <p className="text-sm text-pink-200">4 Classic Scoops</p>
                                </div>
                                <span className="font-bold text-xl">20,000/=</span>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm flex justify-between items-center hover:bg-white/20 transition cursor-pointer">
                                <div>
                                    <h3 className="font-bold">Quick Cone</h3>
                                    <p className="text-sm text-pink-200">Waffle Cone on the go</p>
                                </div>
                                <span className="font-bold text-xl">18,000/=</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="max-w-6xl mx-auto mb-12">
                    <h2 className="text-3xl font-serif font-bold text-center text-brandCocoa mb-8">Drive-Thru Favorites</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Milkshakes', 'Waffles', 'Sundaes', 'Takeaway Tubs'].map((cat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl text-center cursor-pointer transition-transform hover:-translate-y-1 group">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                                    {i === 0 && <span className="text-3xl">🥤</span>}
                                    {i === 1 && <span className="text-3xl">🧇</span>}
                                    {i === 2 && <span className="text-3xl">🍨</span>}
                                    {i === 3 && <span className="text-3xl">🥡</span>}
                                </div>
                                <h3 className="font-bold text-gray-800">{cat}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <a href="tel:+256753522992" className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-green-600 transition-transform hover:scale-105 animate-pulse">
                        <Phone /> Call to Order Now
                    </a>
                </div>

            </main>
            <SiteFooter />
        </div>
    )
}
