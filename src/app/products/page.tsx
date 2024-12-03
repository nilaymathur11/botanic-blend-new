'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { IProduct } from '@/utils/interfaces/CommonInterfaces'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import ProductCard from '../components/common/ProductCard'

export default function ProductListingPage() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [sortBy, setSortBy] = useState<string>('name')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products')
                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }
                const data = await response.json()
                setProducts(data)
                setFilteredProducts(data)
                const uniqueCategories: string[] = Array.from(new Set(data.map((product: IProduct) => product.category)))
                setCategories(['all', ...uniqueCategories])
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        let result = [...products]

        if (selectedCategory !== 'all') {
            result = result.filter(product => product.category === selectedCategory)
        }

        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        result.sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name)
            } else if (sortBy === 'price_asc') {
                return a.price - b.price
            } else {
                return b.price - a.price
            }
        })

        setFilteredProducts(result)
    }, [products, selectedCategory, sortBy, searchTerm])

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="container mx-auto px-4 py-8 min-h-[87vh]">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <Skeleton key={index} className="h-[300px] w-full rounded-xl" />
                        ))}
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8 min-h-[87vh]">
                <h1 className="text-3xl font-bold mb-8 text-center text-[#4d7c0f]">Our Products</h1>
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64"
                    />
                    <div className="flex space-x-4">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {filteredProducts.length === 0 ? (
                    <p className="text-center text-gray-500">No products found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} type="buy" />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </>
    )
}