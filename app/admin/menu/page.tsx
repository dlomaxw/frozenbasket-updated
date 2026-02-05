
'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'

export default function AdminMenuPage() {
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<any>({})

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            // Fetch categories for mapping names
            const catSnapshot = await getDocs(collection(db, 'categories'))
            const catMap: any = {}
            catSnapshot.forEach(doc => {
                const data = doc.data()
                catMap[data.id] = data.title
            })
            setCategories(catMap)

            // Fetch items
            const itemsSnapshot = await getDocs(collection(db, 'menu_items'))
            const fetchedItems = itemsSnapshot.docs.map(doc => doc.data())
            // Simple sort by name
            fetchedItems.sort((a: any, b: any) => a.name.localeCompare(b.name))

            setItems(fetchedItems)
        } catch (error) {
            console.error(error)
            toast.error("Failed to load menu items")
        } finally {
            setLoading(false)
        }
    }

    const deleteItem = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            await deleteDoc(doc(db, 'menu_items', id))
            toast.success("Item deleted")
            fetchData()
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete item")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Menu Items</h2>
                    <p className="text-gray-500">Manage your ice cream flavors and products</p>
                </div>
                <Link href="/admin/menu/new">
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add New Item
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div>Loading items...</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-48 w-full bg-gray-100">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                )}
                                {!item.is_available && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                        Sold Out
                                    </div>
                                )}
                            </div>
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className="text-lg truncate" title={item.name}>{item.name}</CardTitle>
                                <CardDescription className="text-xs">{categories[item.category_id] || 'Uncategorized'}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-bold text-primary">{parseInt(item.price).toLocaleString()} UGX</span>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <Link href={`/admin/menu/${item.id}`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full flex items-center gap-1">
                                            <Pencil className="h-3 w-3" /> Edit
                                        </Button>
                                    </Link>
                                    <Button variant="destructive" size="sm" onClick={() => deleteItem(item.id)}>
                                        <Trash className="h-3 w-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
