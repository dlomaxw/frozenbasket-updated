
'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Pencil, FileText } from 'lucide-react'
import Link from 'next/link'

export default function AdminPagesList() {
    const [pages, setPages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPages = async () => {
            const snapshot = await getDocs(collection(db, 'pages'))
            const fetchedPages = snapshot.docs.map(doc => doc.data())
            setPages(fetchedPages)
            setLoading(false)
        }
        fetchPages()
    }, [])

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Page Content</h2>
                <p className="text-gray-500">Manage content for static pages</p>
            </div>

            {loading ? (
                <div>Loading pages...</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pages.map((page) => (
                        <Card key={page.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-bold">{page.title}</CardTitle>
                                <FileText className="h-5 w-5 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4">Last updated: {new Date(page.updated_at).toLocaleDateString()}</p>
                                <Link href={`/admin/pages/${page.id}`}>
                                    <Button className="w-full flex items-center gap-2">
                                        <Pencil className="h-4 w-4" /> Edit Content
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
