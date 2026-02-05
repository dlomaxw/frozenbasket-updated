
'use client'

import { useEffect, useState } from 'react'
import MenuForm from '@/components/admin/menu-form'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'

export default function EditMenuItemPage() {
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            // Fetch categories
            const catSnapshot = await getDocs(collection(db, 'categories'))
            const cats = catSnapshot.docs.map(doc => doc.data())
            cats.sort((a: any, b: any) => a.title.localeCompare(b.title))
            setCategories(cats as any)

            // Fetch item
            if (params.id) {
                const docRef = doc(db, 'menu_items', params.id as string)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    setItem(docSnap.data() as any)
                }
            }
            setLoading(false)
        }
        loadData()
    }, [params.id])

    if (loading) return <div>Loading...</div>
    if (!item) return <div>Item not found</div>

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Edit Item</h2>
            <MenuForm categories={categories} initialData={item} />
        </div>
    )
}
