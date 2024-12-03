'use client'

import React, { useState, useEffect } from 'react'
import { X, Upload, Loader2, Plus, Minus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { NewProductFormProps } from '@/utils/interfaces/CommonInterfaces'
import { uploadToCloudinary } from '@/utils/functions/clientFunctions'
import Image from 'next/image'

export default function NewProductForm({ onSubmit, onCancel, initialData }: NewProductFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [price, setPrice] = useState(initialData?.price?.toString() || "");
    const [original_price, setOriginal_price] = useState(initialData?.original_price?.toString() || "");
    const [stock, setStock] = useState(initialData?.stock?.toString() || "");
    const [images, setImages] = useState<(File | string)[]>(initialData?.images || []);
    const [previewUrls, setPreviewUrls] = useState<string[]>(initialData?.images || []);
    const [video, setVideo] = useState<File | string | null>(initialData?.video || null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(
        (typeof initialData?.video === "string" && initialData?.video) || null
    );
    const [category, setCategory] = useState(initialData?.category || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [uses, setUses] = useState(initialData?.uses?.length ? initialData.uses : [""]);
    const [ingredients, setIngredients] = useState(
        initialData?.ingredients?.length ? initialData.ingredients : [""]
    );
    const [steps_to_use, setSteps_to_use] = useState(
        initialData?.steps_to_use?.length ? initialData.steps_to_use : [""]
    );
    const [isTrending, setIsTrending] = useState(initialData?.is_trending || false);
    const [isNew, setIsNew] = useState(initialData?.is_new || false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const newImages = Array.from(files)
            setImages(prevImages => [...prevImages, ...newImages])
            const newPreviewUrls = newImages.map(file => URL.createObjectURL(file))
            setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls])
        }
    }

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setVideo(file)
            setVideoPreviewUrl(URL.createObjectURL(file))
        }
    }

    const removeImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
        setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index))
    }

    const removeVideo = () => {
        setVideo(null)
        setVideoPreviewUrl(null)
    }

    const handleArrayInputChange = (
        index: number,
        value: string,
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        remove: boolean = false
    ) => {
        setter(prev => {
            if (remove) {
                return prev.filter((_, i) => i !== index);
            }
            return prev.map((item, i) => (i === index ? value : item));
        });
    }

    const addArrayInput = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter(prev => [...prev, ''])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const imageUrls = await Promise.all(images.map(image =>
                typeof image === 'string' ? image : uploadToCloudinary(image, 'product-images')
            ))

            let videoUrl = video
            if (video instanceof File) {
                videoUrl = await uploadToCloudinary(video, 'product-videos')
            }

            await onSubmit({
                ...(initialData && { id: initialData.id }),
                name,
                price: parseFloat(price),
                stock: parseInt(stock),
                images: imageUrls,
                video: videoUrl,
                original_price: parseFloat(original_price),
                category,
                description,
                uses: uses.filter(Boolean),
                ingredients: ingredients.filter(Boolean),
                steps_to_use: steps_to_use.filter(Boolean),
                is_new: isNew,
                is_trending: isTrending
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-3xl my-8 mx-4 md:mx-auto max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
                    <Button variant="ghost" size="icon" onClick={onCancel}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full"
                                required
                                step="1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Original Price (₹)</Label>
                            <Input
                                type="number"
                                id="original_price"
                                value={original_price}
                                onChange={(e) => setOriginal_price(e.target.value)}
                                className="w-full"
                                required
                                step="1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                type="number"
                                id="stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="skincare">Skincare</SelectItem>
                                <SelectItem value="haircare">Haircare</SelectItem>
                                <SelectItem value="bodycare">Bodycare</SelectItem>
                                <SelectItem value="wellness">Wellness</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full"
                            rows={4}
                        />
                    </div>
                    {['uses', 'ingredients', 'steps_to_use'].map((field) => (
                        <div key={field} className="space-y-2">
                            <Label className="text-lg font-medium">{field === "steps_to_use" ? "Steps To Use" : field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                            {(field === 'uses' ? uses : field === 'ingredients' ? ingredients : steps_to_use).map((item, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Input
                                        value={item}
                                        onChange={(e) => handleArrayInputChange(index, e.target.value, field === 'uses' ? setUses : field === 'ingredients' ? setIngredients : setSteps_to_use)}
                                        className="flex-grow"
                                        placeholder={`${field === "steps_to_use" ? "Steps To Use" : field} ${index + 1}`}
                                    />
                                    {index === (field === 'uses' ? uses : field === 'ingredients' ? ingredients : steps_to_use).length - 1 && (
                                        <Button type="button" onClick={() => addArrayInput(field === 'uses' ? setUses : field === 'ingredients' ? setIngredients : setSteps_to_use)} size="icon">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    )}
                                    {index > 0 && (
                                        <Button
                                            type="button"
                                            onClick={() => handleArrayInputChange(index, '', field === 'uses' ? setUses : field === 'ingredients' ? setIngredients : setSteps_to_use, true)}
                                            size="icon"
                                            variant="destructive"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_trending"
                                checked={isTrending}
                                onCheckedChange={(checked: boolean) => setIsTrending(checked)}
                            />
                            <Label htmlFor="is_trending">Trending</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_new"
                                checked={isNew}
                                onCheckedChange={(checked: boolean) => setIsNew(checked)}
                            />
                            <Label htmlFor="is_new">New</Label>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="images">Product Images</Label>
                        <div className="flex flex-wrap items-center gap-4">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative">
                                    <Image
                                        width={0}
                                        height={0}
                                        alt={"img"}
                                        src={url}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
                                        onClick={() => removeImage(index)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="w-24 h-24 border-dashed"
                                onClick={() => document.getElementById('image-upload')?.click()}
                            >
                                <Upload className="h-6 w-6" />
                            </Button>
                            <Input
                                id="image-upload"
                                type="file"
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                                multiple
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="video">Product Video</Label>
                        <div className="flex items-center space-x-4">
                            {videoPreviewUrl ? (
                                <div className="relative">
                                    <video src={videoPreviewUrl} className="w-48 h-48 object-cover rounded" controls />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
                                        onClick={removeVideo}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="w-48 h-48 border-dashed"
                                    onClick={() => document.getElementById('video-upload')?.click()}
                                >
                                    <Upload className="h-6 w-6" />
                                </Button>
                            )}
                            <Input
                                id="video-upload"
                                type="file"
                                onChange={handleVideoChange}
                                className="hidden"
                                accept="video/*"
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mt-2">{error}</div>
                    )}
                    <div className="flex justify-end space-x-4">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-[#4d7c0f] hover:bg-[#3d6c0f] text-white" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {initialData ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                initialData ? 'Update' : 'Create'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}