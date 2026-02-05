
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db, storage } from '@/lib/firebase'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { Loader2, Upload } from 'lucide-react'
import Image from 'next/image'

interface MenuFormProps {
    initialData?: any
    categories: any[]
}

export default function MenuForm({ initialData, categories }: MenuFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
        image: '',
        is_available: true
    })
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price?.toString() || '',
                category_id: initialData.category_id || '',
                image: initialData.image || '',
                is_available: initialData.is_available ?? true
            })
        }
    }, [initialData])

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const storageRef = ref(storage, `menu-items/${fileName}`)

            // Upload the file to Firebase Storage
            await uploadBytes(storageRef, file)

            // Get public URL
            const publicUrl = await getDownloadURL(storageRef)

            setFormData(prev => ({ ...prev, image: publicUrl }))
            toast.success("Image uploaded successfully!")

        }
        catch (error: any) {
            toast.error('Error uploading image: ' + error.message)
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const dataToSave = {
                ...formData,
                price: parseFloat(formData.price) // Ensure price is a number
            }

            if (initialData?.id) {
                // Update existing item
                const docRef = doc(db, 'menu_items', initialData.id)
                await updateDoc(docRef, dataToSave)
                toast.success("Item updated successfully!")
            } else {
                // Create new item
                const id = dataToSave.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000)
                await setDoc(doc(db, 'menu_items', id), { id, ...dataToSave })
                toast.success("Item created successfully!")
            }

            router.push('/admin/menu')
            router.refresh()

        } catch (error: any) {
            toast.error("Failed to save item: " + error.message)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{initialData ? 'Edit Item' : 'Create New Item'}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={formData.category_id}
                            onValueChange={(val) => handleChange('category_id', val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Price (UGX)</Label>
                        <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange('price', e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Image</Label>
                        <div className="flex items-center gap-4">
                            {formData.image && (
                                <div className="relative h-20 w-20 border rounded overflow-hidden">
                                    <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                </div>
                            )}
                            <div className="flex-1">
                                <Label htmlFor="image-upload" className="cursor-pointer">
                                    <div className="flex items-center gap-2 border rounded-md px-3 py-2 hover:bg-gray-50 text-sm text-gray-600">
                                        <Upload className="h-4 w-4" />
                                        {uploading ? "Uploading..." : "Upload Image"}
                                    </div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </Label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border rounded-lg p-4">
                        <div className="space-y-0.5">
                            <Label className="text-base">Available</Label>
                            <div className="text-sm text-gray-500">Show this item on the menu</div>
                        </div>
                        <Switch
                            checked={formData.is_available}
                            onCheckedChange={(checked) => handleChange('is_available', checked)}
                        />
                    </div>

                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading || uploading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
