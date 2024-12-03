'use client'

import React, { useState, useEffect } from 'react'
import { BarChart, Package, Plus, Loader, Leaf, Loader2, LogOut, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IProduct } from '@/utils/interfaces/CommonInterfaces'
import NewProductForm from '../components/admin/NewProductForm'
import { ProductsTable } from '../components/admin/ProductTable'
import { supabase } from '@/utils/supabase/supabaseClient'
import { checkAuth, handleLogin } from '@/utils/functions/clientFunctions'
import PageLoader from '../components/common/PageLoader'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { fetchProducts, selectAllProducts, selectProductsStatus } from '@/redux/slices/productSlice'

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [error, setError] = useState<string | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState(process.env.NEXT_PUBLIC_ADMIN_EMAIL || '')
    const [password, setPassword] = useState('')
    const [loginLoading, setLoginLoading] = useState(false)
    const [pageLoader, setPageLoader] = useState(true);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectAllProducts);
    const productsStatus = useSelector(selectProductsStatus)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const session = await checkAuth()
                setIsAuthenticated(!!session)
                if (session) await dispatch(fetchProducts());
            } catch (error) {
                console.error('Auth check failed:', error)
            } finally {
                setPageLoader(false)
            }
        }
        initAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginLoading(true)
        setLoginError('')
        try {
            await handleLogin(email, password)
            setIsAuthenticated(true)
            await dispatch(fetchProducts());
        } catch (error) {
            setLoginError('Failed to login')
            console.error('Login error:', error)
        } finally {
            setLoginLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoginLoading(true);
        await supabase.auth.signOut()
        setIsAuthenticated(false)
        setLoginLoading(false)
    }

    const handleCreateProduct = async (product: Omit<IProduct, 'id'>) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create product')
            }
            await fetchProducts()
            setIsFormOpen(false)
        } catch (err) {
            if (err instanceof Error) {
                throw err
            } else {
                throw new Error('An unexpected error occurred')
            }
        }
    }

    const handleUpdateProduct = async (product: IProduct) => {
        try {
            const response = await fetch('/api/products', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to update product')
            }
            await dispatch(fetchProducts());
            setEditingProduct(null)
        } catch (err) {
            if (err instanceof Error) {
                throw err
            } else {
                throw new Error('An unexpected error occurred')
            }
        }
    }

    const handleDeleteProduct = async (id?: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return
        try {
            const response = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
            if (!response.ok) throw new Error('Failed to delete product')
            await fetchProducts()
        } catch (err) {
            setError('Failed to delete product')
        }
    }

    if (pageLoader) {
        return (
            <PageLoader />
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-green-300 bg-opacity-75">
                <div className="absolute inset-0 z-0">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#4CAF50" fillOpacity="0.1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
                <div className="w-full max-w-md z-10 px-4">
                    <form onSubmit={onLogin} className="bg-white bg-opacity-90 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 backdrop-blur-sm">
                        <div className="flex items-center justify-center mb-6">
                            <Leaf className="h-12 w-12 text-green-600" />
                            <h2 className="text-3xl font-bold text-green-800 ml-2">Botanic Blend</h2>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="block text-green-700 text-sm font-bold mb-2">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                            />
                        </div>
                        <div className="mb-6">
                            <Label htmlFor="password" className="block text-green-700 text-sm font-bold mb-2">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
                            />
                        </div>
                        {loginError && <p className="text-red-500 text-xs italic mb-4">{loginError}</p>}
                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            disabled={loginLoading}
                        >
                            {loginLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                    <p className="text-center text-green-800 text-xs">
                        &copy;2024 Botanic Blend. All rights reserved.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-[#4d7c0f] text-white p-6 transition-transform duration-150 ease-in-out md:relative md:translate-x-0`}>
                <div className="flex flex-col h-full">
                    <div className='flex justify-between items-start gap-2 md:mb-0 mb-8'>
                        <div className="md:text-xl font-bold md:mb-8">Botanic Blend Admin</div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2 md:hidden"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <X className="!h-6 !w-6 " />
                        </Button>
                    </div>
                    <nav className="flex-grow">
                        <button
                            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false) }}
                            className={`flex items-center w-full mb-4 p-2 rounded ${activeTab === 'dashboard' ? 'bg-[#3d6c0f]' : 'hover:bg-[#3d6c0f]'}`}
                        >
                            <BarChart className="mr-2" /> Dashboard
                        </button>
                        <button
                            onClick={() => { setActiveTab('products'); setIsSidebarOpen(false) }}
                            className={`flex items-center w-full mb-4 p-2 rounded ${activeTab === 'products' ? 'bg-[#3d6c0f]' : 'hover:bg-[#3d6c0f]'}`}
                        >
                            <Package className="mr-2" /> Products
                        </button>
                    </nav>
                    <div className="mt-auto">
                        <Button
                            onClick={handleLogout}
                            className="w-full text-black"
                            variant="outline"
                            disabled={loginLoading}
                        >
                            {loginLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                <>
                                    <LogOut className="h-4 w-4 mr-2" /> Logout
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </aside>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2 md:hidden"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <Menu className="!h-6 !w-6 text-[#4d7c0f]" />
                        </Button>
                        <div className="text-2xl md:text-3xl font-bold text-[#4d7c0f]">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </div>
                    </div>
                </div>

                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-xl font-semibold mb-2">Total Products</div>
                            <p className="text-3xl font-bold text-[#4d7c0f]">{
                                productsStatus !== "succeeded" ? (
                                    <Loader className="animate-spin h-8 w-8 text-[#4d7c0f]" />
                                ) : (products?.length ?? 0)
                            }</p>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div>
                        <button
                            className="mb-4 bg-[#4d7c0f] text-white px-4 py-2 rounded-md hover:bg-[#3d6c0f] transition-colors flex items-center"
                            onClick={() => setIsFormOpen(true)}
                        >
                            <Plus className="mr-2" /> Add New Product
                        </button>
                        {error ? (
                            <div className="text-red-500">{error}</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <ProductsTable products={products ?? []} setEditingProduct={setEditingProduct} handleDeleteProduct={handleDeleteProduct} />
                            </div>
                        )}
                    </div>
                )}

                {(isFormOpen || editingProduct) && (
                    <NewProductForm
                        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                        onCancel={() => {
                            setIsFormOpen(false)
                            setEditingProduct(null)
                        }}
                        initialData={editingProduct}
                    />
                )}
            </main>
        </div>
    )
}