"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ImageIcon } from "lucide-react"
import { Label } from "@/components/ui/label"

interface ImageUploaderProps {
  currentImage?: string
  onImageChange: (url: string) => void
  label?: string
  maxSize?: number // in MB
}

export function ImageUploader({ currentImage, onImageChange, label = "Image", maxSize = 5 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string>(currentImage || "")
  const [error, setError] = useState<string>("")

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    setError("")
    setUploading(true)

    try {
      // Create FormData
      const formData = new FormData()
      formData.append("file", file)

      // Upload to Vercel Blob via API route
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      const imageUrl = data.url

      setPreview(imageUrl)
      onImageChange(imageUrl)
    } catch (err) {
      console.error("[v0] Image upload error:", err)
      setError("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview("")
    onImageChange("")
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {preview ? (
        <div className="relative group">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brandBlue hover:bg-blue-50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to {maxSize}MB</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileSelect} disabled={uploading} />
        </label>
      )}

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-brandBlue">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brandBlue"></div>
          Uploading...
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
