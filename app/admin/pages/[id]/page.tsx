
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db, storage } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PageEditor() {
    const params = useParams()
    const router = useRouter()
    const [page, setPage] = useState<any>(null)
    const [content, setContent] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const pageId = params.id as string

    useEffect(() => {
        const fetchPage = async () => {
            const docRef = doc(db, 'pages', pageId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setPage(docSnap.data())
                setContent(docSnap.data().content || {})
            } else {
                toast.error("Page not found")
                router.push("/admin/pages")
            }
            setLoading(false)
        }
        if (pageId) fetchPage()
    }, [pageId, router])

    const handleSave = async () => {
        setSaving(true)
        try {
            const docRef = doc(db, 'pages', pageId)
            await updateDoc(docRef, {
                content,
                updated_at: new Date().toISOString()
            })
            toast.success("Page updated successfully")
        } catch (error) {
            console.error(error)
            toast.error("Failed to update page")
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (key: string, value: string) => {
        setContent((prev: any) => ({ ...prev, [key]: value }))
    }

    if (loading) return <div>Loading...</div>

    // Dynamic Form Fields based on Page ID
    const renderFormFields = () => {
        if (pageId === 'home') {
            return (
                <>
                    <div className="space-y-2">
                        <Label>Hero Title</Label>
                        <Input value={content.heroTitle || ''} onChange={(e) => handleChange('heroTitle', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Hero Subtitle</Label>
                        <Input value={content.heroSubtitle || ''} onChange={(e) => handleChange('heroSubtitle', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Hero Button Text</Label>
                        <Input value={content.heroButtonText || ''} onChange={(e) => handleChange('heroButtonText', e.target.value)} />
                    </div>
                </>
            )
        }
        if (pageId === 'about') {
            return (
                <>
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input value={content.title || ''} onChange={(e) => handleChange('title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea className="min-h-[150px]" value={content.description || ''} onChange={(e) => handleChange('description', e.target.value)} />
                    </div>
                </>
            )
        }
        if (pageId === 'contact') {
            return (
                <>
                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input value={content.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input value={content.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Physical Address</Label>
                        <Textarea value={content.address || ''} onChange={(e) => handleChange('address', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Opening Hours</Label>
                        <Input value={content.openingHours || ''} onChange={(e) => handleChange('openingHours', e.target.value)} />
                    </div>
                </>
            )
        }
        return <div className="text-gray-500">No editable fields configured for this page.</div>
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/pages">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h2 className="text-3xl font-bold tracking-tight">Edit {page?.title}</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Content Editor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {renderFormFields()}

                    <Button onClick={handleSave} className="w-full" disabled={saving}>
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
