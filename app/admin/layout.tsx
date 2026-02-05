'use client'

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Shield, LayoutDashboard, Menu as MenuIcon, FileText, BarChart3, LogOut, IceCream } from 'lucide-react'
import { Button } from "@/components/ui/button"
import AdminAuthProvider from "@/components/admin/auth-provider"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = async () => {
        try {
            await signOut(auth)
            toast.success("Logged out successfully")
            router.push("/admin/login")
        } catch (error) {
            console.error("Logout error", error)
            toast.error("Failed to log out")
        }
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Menu Management', href: '/admin/menu', icon: MenuIcon },
        { name: 'Page Content', href: '/admin/pages', icon: FileText },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ]

    return (
        <AdminAuthProvider>
            <div className="flex h-screen bg-[#fff8f0]"> {/* brandCream background */}
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-xl flex flex-col border-r border-brandPeach/20">
                    <div className="p-6 border-b border-brandPeach/10 flex items-center gap-3">
                        <div className="bg-brandBlue/10 p-2 rounded-lg">
                            <IceCream className="h-6 w-6 text-brandBlue" />
                        </div>
                        <h1 className="text-2xl font-bold text-brandBlue font-[family-name:var(--font-logo)]">
                            Frozen Basket
                        </h1>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Overview
                        </p>
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            const Icon = item.icon
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                        isActive
                                            ? "bg-brandBlue text-white shadow-md shadow-brandBlue/20"
                                            : "text-brandCocoa/70 hover:bg-brandBlue/5 hover:text-brandBlue"
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-400 group-hover:text-brandBlue")} />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="p-4 border-t border-brandPeach/10 bg-gray-50/50">
                        <div className="mb-4 px-2">
                            <p className="text-xs text-gray-400 font-medium">Signed in as Admin</p>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full flex items-center justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-8 bg-[#fff8f0]">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </AdminAuthProvider>
    )
}
