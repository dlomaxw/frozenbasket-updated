
'use client'

import { useEffect, useState } from 'react'
import MenuForm from '@/components/admin/menu-form'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function NewMenuItemPage() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const snapshot = await getDocs(collection(db, 'categories'))
            const cats = snapshot.docs.map(doc => doc.data())
            // Sort client side
            cats.sort((a: any, b: any) => a.title.localeCompare(b.title))
            setCategories(cats as any)
        }
        fetchCategories()
    }, [])

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Add New Item</h2>
            <MenuForm categories={categories} />
        </div>
    )
}
