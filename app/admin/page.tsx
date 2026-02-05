
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Menu as MenuIcon, FileText, BarChart3, ArrowUpRight, IceCream, Users, TrendingUp } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-brandBlue font-[family-name:var(--font-logo)]">Overview</h2>
                    <p className="text-gray-500 mt-1 text-lg">Good morning! Here's what's happening at Frozen Basket.</p>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-brandBlue text-white hover:bg-brandBlue/90 rounded-full px-6 shadow-lg shadow-brandBlue/20">
                        View Live Site
                    </Button>
                </div>
            </div>

            {/* Stats Grid - Inspired by 'Recent project' / 'Overview' cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {/* Menu Card */}
                <Card className="rounded-[32px] border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-brandBlue/10 transition-all duration-300 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brandPeach/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-lg font-bold text-gray-700">Menu Items</CardTitle>
                        <div className="p-3 bg-brandPeach/20 rounded-2xl text-brandPeach group-hover:bg-brandPeach group-hover:text-white transition-colors">
                            <MenuIcon className="h-6 w-6" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-4xl font-extrabold text-brandCocoa mt-4 mb-2">Manage</div>
                        <p className="text-sm text-gray-500 mb-6 font-medium">Add, edit, or remove ice cream flavors.</p>
                        <Link href="/admin/menu">
                            <Button variant="outline" className="w-full rounded-2xl border-2 hover:border-brandPeach hover:text-brandPeach hover:bg-transparent font-bold">
                                Update Menu <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Pages Card */}
                <Card className="rounded-[32px] border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-brandBlue/10 transition-all duration-300 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brandBlue/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-lg font-bold text-gray-700">Page Content</CardTitle>
                        <div className="p-3 bg-brandBlue/20 rounded-2xl text-brandBlue group-hover:bg-brandBlue group-hover:text-white transition-colors">
                            <FileText className="h-6 w-6" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-4xl font-extrabold text-brandCocoa mt-4 mb-2">Edit</div>
                        <p className="text-sm text-gray-500 mb-6 font-medium">Update Home, About, and Contact pages.</p>
                        <Link href="/admin/pages">
                            <Button variant="outline" className="w-full rounded-2xl border-2 hover:border-brandBlue hover:text-brandBlue hover:bg-transparent font-bold">
                                Edit Content <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Analytics Card */}
                <Card className="rounded-[32px] border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-brandBlue/10 transition-all duration-300 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-lg font-bold text-gray-700">Analytics</CardTitle>
                        <div className="p-3 bg-green-100 rounded-2xl text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <BarChart3 className="h-6 w-6" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-4xl font-extrabold text-brandCocoa mt-4 mb-2">Insights</div>
                        <p className="text-sm text-gray-500 mb-6 font-medium">Check site visitors and trends.</p>
                        <Link href="/admin/analytics">
                            <Button variant="outline" className="w-full rounded-2xl border-2 hover:border-green-500 hover:text-green-600 hover:bg-transparent font-bold">
                                View Data <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions / Recent Activity Placeholder - Mimicking "Recent Project / AI Reports" */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="col-span-2 rounded-[32px] border-none shadow-xl shadow-gray-200/50 p-6 relative overflow-hidden bg-gradient-to-br from-brandBlue/5 to-transparent">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-brandBlue">Quick Actions</h3>
                        <Button variant="ghost" size="sm" className="text-gray-400">View All</Button>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href="/admin/menu/new" className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all gap-3 group cursor-pointer hover:-translate-y-1 duration-300">
                            <div className="w-12 h-12 rounded-full bg-brandPeach/10 flex items-center justify-center text-brandPeach group-hover:scale-110 transition-transform">
                                <IceCream size={24} />
                            </div>
                            <span className="font-semibold text-gray-600 group-hover:text-brandPeach">New Item</span>
                        </Link>
                        <Link href="/admin/pages/home" className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all gap-3 group cursor-pointer hover:-translate-y-1 duration-300">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-brandBlue group-hover:scale-110 transition-transform">
                                <FileText size={24} />
                            </div>
                            <span className="font-semibold text-gray-600 group-hover:text-brandBlue">Edit Home</span>
                        </Link>
                        <Link href="/admin/analytics" className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all gap-3 group cursor-pointer hover:-translate-y-1 duration-300">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                <TrendingUp size={24} />
                            </div>
                            <span className="font-semibold text-gray-600 group-hover:text-green-600">Trends</span>
                        </Link>
                        <Link href="/admin" className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all gap-3 group cursor-pointer hover:-translate-y-1 duration-300">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                <Users size={24} />
                            </div>
                            <span className="font-semibold text-gray-600 group-hover:text-purple-600">Users</span>
                        </Link>
                    </div>
                </Card>

                {/* System Status / Mini Card */}
                <Card className="rounded-[32px] border-none shadow-xl shadow-gray-200/50 bg-brandBlue text-white p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-1">System Status</h3>
                            <p className="text-blue-100 text-sm">Everything is running smoothly.</p>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-blue-100 text-sm">Database</span>
                                <span className="bg-green-400/20 text-green-300 px-2 py-1 rounded-lg text-xs font-bold">ONLINE</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-blue-100 text-sm">Storage</span>
                                <span className="bg-green-400/20 text-green-300 px-2 py-1 rounded-lg text-xs font-bold">ONLINE</span>
                            </div>
                            <div className="p-4 bg-white/10 rounded-2xl mt-4">
                                <div className="text-3xl font-bold">100%</div>
                                <div className="text-xs text-blue-200">Uptime today</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
