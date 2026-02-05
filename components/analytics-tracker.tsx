
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function AnalyticsTracker() {
    const pathname = usePathname()

    useEffect(() => {
        const trackVisit = async () => {
            // Don't track admin pages to keep data clean
            if (pathname?.startsWith('/admin')) return

            try {
                // Fetch location data
                let locationData = { city: 'Unknown', country: 'Unknown' }
                try {
                    const res = await fetch('https://ipapi.co/json/')
                    if (res.ok) {
                        const data = await res.json()
                        locationData = {
                            city: data.city || 'Unknown',
                            country: data.country_name || 'Unknown'
                        }
                    }
                } catch (e) {
                    console.warn("Failed to fetch location", e)
                }

                await addDoc(collection(db, 'analytics_visits'), {
                    path: pathname,
                    user_agent: navigator.userAgent,
                    visited_at: serverTimestamp(),
                    location: locationData
                })
            } catch (error) {
                // Silently fail for analytics to not disturb user
                console.warn("Analytics tracking failed", error)
            }
        }

        if (pathname) {
            trackVisit()
        }
    }, [pathname])

    return null
}
