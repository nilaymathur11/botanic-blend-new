'use client'

import React, { useState } from 'react'
import {
    BarChart,
    Users,
    Package,
    ShoppingCart,
    Plus,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Search
} from 'lucide-react'

// Mock data
const products = [
    { id: 1, name: "Revitalizing Rosehip Serum", price: 39.99, stock: 100 },
    { id: 2, name: "Soothing Lavender Night Cream", price: 29.99, stock: 75 },
    { id: 3, name: "Hydrating Aloe Vera Gel", price: 19.99, stock: 150 },
]

const orders = [
    { id: 1, customer: "John Doe", total: 89.97, status: "Shipped" },
    { id: 2, customer: "Jane Smith", total: 59.98, status: "Processing" },
    { id: 3, customer: "Bob Johnson", total: 39.99, status: "Delivered" },
]

const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", orders: 3 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 2 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", orders: 1 },
]

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [searchTerm, setSearchTerm] = useState('')

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredOrders = orders.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-[#4d7c0f] text-white p-6">
                <div className="text-2xl font-bold mb-8">Botanic Blend Admin</div>
                <nav>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`flex items-center w-full mb-4 p-2 rounded ${activeTab === 'dashboard' ? 'bg-[#3d6c0f]' : 'hover:bg-[#3d6c0f]'}`}
                    >
                        <BarChart className="mr-2" /> Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex items-center w-full mb-4 p-2 rounded ${activeTab === 'products' ? 'bg-[#3d6c0f]' : 'hover:bg-[#3d6c0f]'}`}
                    >
                        <Package className="mr-2" /> Products
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center w-full mb-4 p-2 rounded ${activeTab === 'orders' ? 'bg-[#3d6c0f]' : 'hover:bg-[#3d6c0f]'}`}
                    >
                        <ShoppingCart className="mr-2" /> Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('customers')}
                        className={`flex items-center w-full mb-4 p-2 rounded ${activeTab === 'customers' ? 'bg-[#3d6c0f]' : 'hover:bg-[#3d6c0f]'}`}
                    >
                        <Users className="mr-2" /> Customers
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div className="text-3xl font-bold text-[#4d7c0f]">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4d7c0f]"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-xl font-semibold mb-2">Total Products</div>
                            <p className="text-3xl font-bold text-[#4d7c0f]">{products.length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-xl font-semibold mb-2">Total Orders</div>
                            <p className="text-3xl font-bold text-[#4d7c0f]">{orders.length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-xl font-semibold mb-2">Total Customers</div>
                            <p className="text-3xl font-bold text-[#4d7c0f]">{customers.length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-xl font-semibold mb-2">Total Revenue</div>
                            <p className="text-3xl font-bold text-[#4d7c0f]">
                                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div>
                        <button className="mb-4 bg-[#4d7c0f] text-white px-4 py-2 rounded-md hover:bg-[#3d6c0f] transition-colors flex items-center">
                            <Plus className="mr-2" /> Add New Product
                        </button>
                        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Price</th>
                                    <th className="px-4 py-2 text-left">Stock</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product.id} className="border-t">
                                        <td className="px-4 py-2">{product.name}</td>
                                        <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                                        <td className="px-4 py-2">{product.stock}</td>
                                        <td className="px-4 py-2">
                                            <button className="mr-2 text-blue-500 hover:text-blue-700">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Order ID</th>
                                <th className="px-4 py-2 text-left">Customer</th>
                                <th className="px-4 py-2 text-left">Total</th>
                                <th className="px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id} className="border-t">
                                    <td className="px-4 py-2">#{order.id}</td>
                                    <td className="px-4 py-2">{order.customer}</td>
                                    <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' :
                                            order.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' :
                                                'bg-green-200 text-green-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === 'customers' && (
                    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Orders</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map(customer => (
                                <tr key={customer.id} className="border-t">
                                    <td className="px-4 py-2">{customer.name}</td>
                                    <td className="px-4 py-2">{customer.email}</td>
                                    <td className="px-4 py-2">{customer.orders}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <nav className="flex items-center space-x-2">
                        <button className="p-2 rounded-md bg-white text-[#4d7c0f] border border-[#4d7c0f] hover:bg-[#4d7c0f] hover:text-white transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="px-4 py-2 rounded-md bg-[#4d7c0f] text-white">1</button>
                        <button className="px-4 py-2 rounded-md bg-white text-[#4d7c0f] border border-[#4d7c0f] hover:bg-[#4d7c0f] hover:text-white transition-colors">2</button>
                        <button className="px-4 py-2 rounded-md bg-white text-[#4d7c0f] border border-[#4d7c0f] hover:bg-[#4d7c0f] hover:text-white transition-colors">3</button>
                        <button className="p-2 rounded-md bg-white text-[#4d7c0f] border border-[#4d7c0f] hover:bg-[#4d7c0f] hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </nav>
                </div>
            </main>
        </div>
    )
}