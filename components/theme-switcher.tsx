"use client"

import { useState, useEffect } from "react"
import { Palette } from "lucide-react"

const THEMES = [
    {
        name: "Classic",
        colors: {
            bg: "#800080", // Purple
            highlight: "#FFC0CB", // Pink
        },
        label: "💜"
    },
    {
        name: "Ocean",
        colors: {
            bg: "#006994", // Sea Blue
            highlight: "#7FFFD4", // Aquamarine
        },
        label: "🌊"
    },
    {
        name: "Sunset",
        colors: {
            bg: "#FF4500", // Orange
            highlight: "#FFD700", // Gold
        },
        label: "🌅"
    },
    {
        name: "Nature",
        colors: {
            bg: "#228B22", // Forest Green
            highlight: "#90EE90", // Light Green
        },
        label: "🌿"
    }
]

export function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeTheme, setActiveTheme] = useState("Classic")

    const changeTheme = (theme: typeof THEMES[0]) => {
        document.documentElement.style.setProperty("--purple-bg", theme.colors.bg)
        document.documentElement.style.setProperty("--pink-highlight", theme.colors.highlight)
        setActiveTheme(theme.name)
        setIsOpen(false)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className={`flex flex-col gap-2 mb-4 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                {THEMES.map((theme) => (
                    <button
                        key={theme.name}
                        onClick={() => changeTheme(theme)}
                        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xl bg-white hover:scale-110 transition-transform ${activeTheme === theme.name ? "ring-4 ring-brandBlue" : ""}`}
                        title={theme.name}
                        style={{ border: `2px solid ${theme.colors.bg}` }}
                    >
                        {theme.label}
                    </button>
                ))}
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-white text-gray-800 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform ring-2 ring-gray-200"
                title="Change Theme"
            >
                <Palette size={24} className={isOpen ? "text-purple-600" : "text-gray-600"} />
            </button>
        </div>
    )
}
