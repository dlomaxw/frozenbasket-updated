"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, X, MessageCircle, Volume2, VolumeX, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Scoopy3D } from "./scoopy-3d"
import { usePathname } from "next/navigation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function MascotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [mood, setMood] = useState<"idle" | "happy" | "excited" | "thinking">("idle")
  const [showWelcome, setShowWelcome] = useState(true)
  const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null)

  const pathname = usePathname()
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const getResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hey there! 👋 I'm Scoopy! Ready to explore some delicious ice cream flavors?"
    }

    if (input.includes("flavor") || input.includes("recommend")) {
      return "Ooh, I love talking about flavors! 🍦 Our Chocolate Fudge Brownie is super popular, or if you're feeling adventurous, try our Mango Tango! What mood are you in today?"
    }

    if (input.includes("chocolate")) {
      return "Chocolate lover! 🍫 You can't go wrong with our Double Chocolate Dream or Chocolate Fudge Brownie. They're absolutely divine!"
    }

    if (input.includes("fruit") || input.includes("strawberry") || input.includes("berry")) {
      return "Fresh and fruity! 🍓 Check out our Strawberry Cheesecake, Berry Blast, or Tropical Paradise. Perfect for a refreshing treat!"
    }

    if (input.includes("price") || input.includes("cost") || input.includes("how much")) {
      return "Great question! 💰 Our scoops start at $4.99, and you can build custom mixes too! Check out our menu for all the details."
    }

    if (input.includes("mix") || input.includes("build") || input.includes("custom")) {
      return "Love the creativity! 🎨 Head to our Mix Builder to create your perfect combination of flavors, toppings, and sauces!"
    }

    if (input.includes("order") || input.includes("delivery") || input.includes("pickup")) {
      return "Ready to order? 🛒 Add items to your cart and we'll get your ice cream ready for pickup or delivery!"
    }

    if (input.includes("location") || input.includes("where") || input.includes("address")) {
      return "We're here to serve you! 📍 Check our About page for our location and hours!"
    }

    if (input.includes("favorite") || input.includes("best")) {
      return "Oh, that's tough! 😊 I personally love the Caramel Sea Salt - it's the perfect sweet and salty combo! But everyone has their own favorite. What do you usually go for?"
    }

    if (input.includes("vegan") || input.includes("dairy free")) {
      return "We have options for everyone! 🌱 Check our menu for vegan and dairy-free flavors - they're just as delicious!"
    }

    if (input.includes("thanks") || input.includes("thank you")) {
      return "You're so welcome! 🤗 Enjoy your ice cream adventure! Come chat with me anytime!"
    }

    // Default responses
    const defaultResponses = [
      "That's interesting! 🍦 Tell me more about what kind of ice cream you're craving!",
      "I'm all ears! Want to hear about our special flavors or need help with something else?",
      "Hmm, I'm not sure I understand, but I'm here to help! Ask me about flavors, our menu, or how to order!",
      "Great question! I love chatting about ice cream! What would you like to know?",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  // Automatic greetings disabled - mascot only speaks when user interacts
  // To re-enable, uncomment the code below
  /*
  useEffect(() => {
    const greetings: Record<string, string> = {
      "/": "Hey there! Welcome to Frozen Basket! I'm Scoopy, your ice cream buddy!",
      "/menu": "Wow, checking out our flavors? I can help you find the perfect one!",
      "/mix-builder": "Building a custom mix? How exciting! Let me help you create something amazing!",
      "/cart": "Ready to checkout? I'm here if you need any last-minute recommendations!",
      "/about": "Want to know about us? I'm full of sweet stories!",
    }

    if (showWelcome && pathname && greetings[pathname]) {
      const timer = setTimeout(() => {
        setMood("excited")
        if (voiceEnabled) {
          speakText(greetings[pathname])
        }
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [pathname, showWelcome, voiceEnabled])
  */

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
        handleSendMessage(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()

      // Priority list of smooth, realistic female voices
      const preferredVoiceNames = [
        // Premium female voices (most realistic)
        "Microsoft Zira",
        "Microsoft Jenny",
        "Google US English Female",
        "Google UK English Female",
        "Samantha", // macOS
        "Karen", // macOS Australian
        "Moira", // macOS Irish
        "Tessa", // macOS South African
        "Fiona", // macOS Scottish
        "Victoria", // macOS
        "Allison", // macOS
        "Susan", // macOS
        "Ava", // iOS
        "Nicky", // iOS
        // Fallback female voices
        "female",
        "woman",
        "en-US-Standard-C",
        "en-US-Standard-E",
        "en-US-Standard-F",
        "en-US-Standard-G",
        "en-US-Standard-H",
        "en-US-Wavenet-C",
        "en-US-Wavenet-E",
        "en-US-Wavenet-F",
        "en-US-Wavenet-G",
        "en-US-Wavenet-H",
      ]

      // Find the best available female voice
      let selectedVoice: SpeechSynthesisVoice | null = null

      // First, try to find a voice by exact name match
      for (const voiceName of preferredVoiceNames) {
        const found = voices.find((v) => v.name.toLowerCase().includes(voiceName.toLowerCase()))
        if (found) {
          selectedVoice = found
          break
        }
      }

      // If no preferred voice found, look for any English female voice
      if (!selectedVoice) {
        selectedVoice =
          voices.find(
            (v) =>
              v.lang.startsWith("en") &&
              (v.name.toLowerCase().includes("female") ||
                v.name.toLowerCase().includes("woman") ||
                v.name.toLowerCase().includes("zira") ||
                v.name.toLowerCase().includes("samantha") ||
                v.name.toLowerCase().includes("karen") ||
                v.name.toLowerCase().includes("victoria") ||
                v.name.toLowerCase().includes("ava")),
          ) || null
      }

      // Last resort: any English voice
      if (!selectedVoice) {
        selectedVoice = voices.find((v) => v.lang.startsWith("en")) || null
      }

      if (selectedVoice) {
        setPreferredVoice(selectedVoice)
        console.log("[v0] Selected voice:", selectedVoice.name)
      }
    }

    // Load voices - they may not be available immediately
    loadVoices()

    // Chrome requires waiting for voiceschanged event
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      setMood("thinking")
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false)
      recognitionRef.current.stop()
      setMood("idle")
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()

      synthesisRef.current = new SpeechSynthesisUtterance(text)

      // Use the preferred female voice if available
      if (preferredVoice) {
        synthesisRef.current.voice = preferredVoice
      }

      synthesisRef.current.rate = 0.95 // Slightly slower for more natural speech
      synthesisRef.current.pitch = 1.1 // Slightly higher pitch for feminine tone
      synthesisRef.current.volume = 0.85 // Comfortable volume level

      synthesisRef.current.onstart = () => {
        setIsSpeaking(true)
        setMood("excited")
      }

      synthesisRef.current.onend = () => {
        setIsSpeaking(false)
        setMood("happy")
      }

      window.speechSynthesis.speak(synthesisRef.current)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setMood("idle")
    }
  }

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setMood("thinking")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(text)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
      setMood("happy")

      if (voiceEnabled) {
        speakText(response)
      }
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input && input.trim()) {
      handleSendMessage(input)
      setInput("")
      setShowWelcome(false)
    }
  }

  const handleQuickAction = (text: string) => {
    setInput(text)
    handleSendMessage(text)
    setShowWelcome(false)
  }

  return (
    <>
      {/* Floating mascot button with enhanced animations */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? "scale-0" : "scale-100"}`}>
        <div className="relative">
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full bg-pink-400 opacity-75 animate-pulse-ring" />
          <div
            className="absolute inset-0 rounded-full bg-orange-400 opacity-75 animate-pulse-ring"
            style={{ animationDelay: "0.5s" }}
          />

          <button
            onClick={() => {
              setIsOpen(true)
              setMood("excited")
            }}
            className="relative w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 via-orange-400 to-red-400 shadow-2xl hover:shadow-pink-400/50 hover:scale-110 transition-all duration-300 group overflow-hidden animate-mascot-bounce-in"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-gradient" />
            <div className="w-full h-full flex items-center justify-center">
              <Scoopy3D mood="idle" isListening={false} isSpeaking={false} />
            </div>

            {/* Sparkles */}
            <Sparkles className="absolute top-0 right-0 w-4 h-4 text-yellow-300 animate-sparkle" />
            <Sparkles
              className="absolute bottom-1 left-1 w-3 h-3 text-yellow-300 animate-sparkle"
              style={{ animationDelay: "0.5s" }}
            />

            {/* Status indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white" />
          </button>
        </div>
      </div>

      {/* Chat widget with enhanced design */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="w-96 h-[600px] bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col border-4 border-white backdrop-blur-sm">
          {/* Header with 3D mascot */}
          <div className="relative h-48 bg-gradient-to-br from-orange-400 via-pink-400 to-red-400 p-4 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-transparent animate-gradient" />

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4 text-white" />
            </Button>

            <div className="absolute inset-0">
              <Scoopy3D mood={mood} isListening={isListening} isSpeaking={isSpeaking} />
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <h3 className="font-bold text-orange-600 flex items-center gap-1">
                    Scoopy
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                  </h3>
                  <p className="text-xs text-gray-600">Your Ice Cream Assistant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-8 animate-fade-in">
                <div className="mb-2 text-4xl animate-bounce-slow">🍦</div>
                <p className="font-medium bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                  Hey there! I'm Scoopy!
                </p>
                <p className="text-xs mt-2">Ask me about flavors, get recommendations, or just chat about ice cream!</p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => handleQuickAction("What flavors do you recommend?")}
                    className="px-3 py-1 bg-white rounded-full text-xs hover:bg-orange-100 transition-colors shadow-sm"
                  >
                    Recommend flavors
                  </button>
                  <button
                    onClick={() => handleQuickAction("Tell me about chocolate flavors")}
                    className="px-3 py-1 bg-white rounded-full text-xs hover:bg-pink-100 transition-colors shadow-sm"
                  >
                    Chocolate options
                  </button>
                  <button
                    onClick={() => handleQuickAction("How do I build a custom mix?")}
                    className="px-3 py-1 bg-white rounded-full text-xs hover:bg-purple-100 transition-colors shadow-sm"
                  >
                    Custom mix
                  </button>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-lg ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white"
                      : "bg-white text-gray-800 border-2 border-orange-200"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-slide-up">
                <div className="bg-white shadow-lg rounded-2xl px-4 py-2 border-2 border-orange-200">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    />
                    <div
                      className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-orange-200">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={isListening ? stopListening : startListening}
                className={`shrink-0 border-2 ${
                  isListening
                    ? "bg-red-500 text-white hover:bg-red-600 border-red-500 animate-pulse"
                    : "hover:bg-orange-100 border-orange-300"
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or speak your message..."
                className="flex-1 border-2 border-orange-300 focus:border-pink-400"
                disabled={isTyping || isListening}
              />

              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled)
                  if (isSpeaking) stopSpeaking()
                }}
                className={`border-2 ${
                  voiceEnabled ? "hover:bg-orange-100 border-orange-300" : "bg-gray-200 border-gray-300"
                }`}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>

              <Button
                type="submit"
                size="icon"
                disabled={!input || !input.trim() || isTyping}
                className="shrink-0 bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 border-0 shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
