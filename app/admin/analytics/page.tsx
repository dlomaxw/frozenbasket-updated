
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from '@/lib/firebase'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { format, parseISO } from 'date-fns'

export default function AnalyticsPage() {
    const [visits, setVisits] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        setLoading(true)
        try {
            const q = query(
                collection(db, 'analytics_visits'),
                orderBy('visited_at', 'desc'),
                limit(1000)
            )
            const snapshot = await getDocs(q)
            const data = snapshot.docs.map(doc => {
                const d = doc.data()
                return {
                    id: doc.id,
                    ...d,
                    // Handle Firestore Timestamp
                    visited_at: d.visited_at?.toDate ? d.visited_at.toDate().toISOString() : new Date().toISOString()
                }
            })
            setVisits(data)
        } catch (error) {
            console.error("Error fetching analytics:", error)
        } finally {
            setLoading(false)
        }
    }

    // Process data for chart (Visits per day)
    const dataByDay = visits.reduce((acc: any, visit) => {
        const date = format(parseISO(visit.visited_at), 'MMM dd')
        acc[date] = (acc[date] || 0) + 1
        return acc
    }, {})

    const chartData = Object.keys(dataByDay).map(date => ({
        name: date,
        visits: dataByDay[date]
    })).reverse() // Usually we want chronological, but if we process from recent to old...
    // Actually if we want chronological we should sort the keys or the array.
    // The previous code might have been reversing for display preference?
    // Let's ensure chronological order for a chart usually.
    // If visits are DESC, then dataByDay keys built in that order might be reverse chrono.
    // Let's just trust simple reverse for now, or improve later.

    // Most visited pages
    const pagesByCount = visits.reduce((acc: any, visit) => {
        acc[visit.path] = (acc[visit.path] || 0) + 1
        return acc
    }, {})

    // Top Locations
    const locationByCount = visits.reduce((acc: any, visit) => {
        if (visit.location?.city && visit.location?.city !== 'Unknown') {
            const loc = `${visit.location.city}, ${visit.location.country}`
            acc[loc] = (acc[loc] || 0) + 1
        }
        return acc
    }, {})

    const topPages = Object.entries(pagesByCount)
        .sort(([, a]: any, [, b]: any) => b - a)
        .slice(0, 5)

    const topLocations = Object.entries(locationByCount)
        .sort(([, a]: any, [, b]: any) => b - a)
        .slice(0, 5)

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-brandBlue">Analytics Dashboard</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{visits.length}</div>
                        <p className="text-xs text-muted-foreground">Recorded visits</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Visits Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            {loading ? (
                                <div className="flex items-center justify-center h-full">Loading...</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                        <Tooltip />
                                        <Bar dataKey="visits" fill="#2b6f9e" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Pages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topPages.map(([path, count]: any) => (
                                    <div key={path} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{path}</p>
                                        </div>
                                        <div className="ml-auto font-medium">{count} visits</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top Locations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topLocations.length > 0 ? (
                                    topLocations.map(([loc, count]: any) => (
                                        <div key={loc} className="flex items-center">
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">{loc}</p>
                                            </div>
                                            <div className="ml-auto font-medium">{count} visits</div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No location data yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {visits.slice(0, 10).map((visit) => (
                            <div key={visit.id} className="text-sm border-b pb-2">
                                <span className="font-semibold">{visit.path}</span> - {format(parseISO(visit.visited_at), 'PP p')}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
