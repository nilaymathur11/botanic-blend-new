'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import ProductCard from '../components/common/ProductCard'
import CustomSelect from '../components/common/CustomSelect'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

const products = [
    { id: 1, name: "Revitalizing Rosehip Serum", price: 39.99, category: "Serums", image: "/aloe-cream.jpeg" },
    { id: 2, name: "Soothing Lavender Night Cream", price: 29.99, category: "Moisturizers", image: "/aloe-cream.jpeg" },
    { id: 3, name: "Hydrating Aloe Vera Gel", price: 19.99, category: "Gels", image: "/aloe-cream.jpeg" },
    { id: 4, name: "Nourishing Avocado Face Mask", price: 24.99, category: "Masks", image: "/aloe-cream.jpeg" },
    { id: 5, name: "Brightening Vitamin C Toner", price: 34.99, category: "Toners", image: "/aloe-cream.jpeg" },
    { id: 6, name: "Calming Chamomile Cleanser", price: 22.99, category: "Cleansers", image: "/aloe-cream.jpeg" },
    { id: 7, name: "Rejuvenating Green Tea Eye Cream", price: 27.99, category: "Eye Care", image: "/aloe-cream.jpeg" },
    { id: 8, name: "Balancing Tea Tree Oil", price: 18.99, category: "Oils", image: "/aloe-cream.jpeg" },
    { id: 9, name: "Exfoliating Papaya Enzyme Scrub", price: 26.99, category: "Exfoliators", image: "/aloe-cream.jpeg" },
    { id: 10, name: "Firming Collagen Boost Serum", price: 44.99, category: "Serums", image: "/aloe-cream.jpeg" },
    { id: 11, name: "Refreshing Cucumber Mist", price: 16.99, category: "Mists", image: "/aloe-cream.jpeg" },
    { id: 12, name: "Anti-Aging Retinol Night Cream", price: 49.99, category: "Moisturizers", image: "/aloe-cream.jpeg" },
]

const categories = ['All', ...new Set(products.map(product => product.category))]
const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'priceLowToHigh', label: 'Price: Low to High' },
    { value: 'priceHighToLow', label: 'Price: High to Low' },
]

export default function ProductListingPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('name')

    const productsPerPage = 8
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory)

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'priceLowToHigh') return a.price - b.price
        if (sortBy === 'priceHighToLow') return b.price - a.price
        return 0
    })

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <>
            <Header />
            <div className="flex flex-col min-h-[86dvh] bg-[#F5F5F5] text-slate-800">
                <main className="flex-grow py-8">
                    <div className="container mx-auto px-4">
                        <div className="text-3xl font-bold text-[#4d7c0f] mb-8">Our Products</div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div
                                className="mb-4 md:mb-0 flex items-center text-[#4d7c0f] hover:text-[#3d6c0f]"
                            >
                                <Filter className="w-5 h-5 mr-2" />
                                Filter & Sort
                            </div>
                            <div className={`flex gap-4`}>
                                <CustomSelect
                                    options={categories.map(category => ({ value: category, label: category }))}
                                    value={selectedCategory}
                                    onChange={setSelectedCategory}
                                    label="Select Category"
                                />
                                <CustomSelect
                                    options={sortOptions}
                                    value={sortBy}
                                    onChange={setSortBy}
                                    label="Sort by"
                                />
                            </div>
                        </div>
                        <div className='min-h-[68dvh]'>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {currentProducts.map(product => (
                                    <ProductCard key={product.id} product={product} type={"buy"} />
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <nav className="flex items-center space-x-2">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-md bg-white text-[#4d7c0f] disabled:opacity-50"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                {[...Array(Math.ceil(sortedProducts.length / productsPerPage))].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-[#4d7c0f] text-white' : 'bg-white text-[#4d7c0f]'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(sortedProducts.length / productsPerPage)}
                                    className="p-2 rounded-md bg-white text-[#4d7c0f] disabled:opacity-50"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}