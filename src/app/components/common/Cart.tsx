'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { removeFromCart, updateQuantity, loadCart } from '@/redux/slices/cartSlice'
import { redirectToWhatsApp } from '@/utils/whatsappRedirect'
import { CartProps } from '@/utils/interfaces/CommonInterfaces'

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const cartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        dispatch(loadCart())
    }, [dispatch])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, onClose])

    const handleUpdateQuantity = (id: string, change: number) => {
        const item = cartItems.find(item => item.id === id)
        if (item) {
            const newQuantity = Math.max(1, item.quantity + change)
            dispatch(updateQuantity({ id, quantity: newQuantity }))
        }
    }

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id))
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    const handleBuyNow = () => {
        const message = cartItems
            .map(item => `${item.name} (Quantity: ${item.quantity})`)
            .join('\n')
        redirectToWhatsApp(`I'd like to purchase:\n${message}\nTotal: ₹${getTotalPrice().toFixed(2)}`)
    }

    return (
        <>
            {isOpen && (
                <div className="fixed w-screen inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out">
                    <div
                        ref={cartRef}
                        className={`fixed inset-y-0 right-0 w-screen sm:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                            } flex flex-col`}
                    >
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Your Cart</h2>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        <div className="p-4">
                            {cartItems.length === 0 ? (
                                <p className="text-center text-gray-500">Your cart is empty</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 mb-4 pb-4 border-b">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="rounded-md object-cover"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(item.id, -1)}>
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span>{item.quantity}</span>
                                                <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(item.id, 1)}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(item.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="p-4 border-t bg-white fixed w-screen md:w-full bottom-0 left-0">
                            <p className="text-lg font-semibold mb-4">Total: ₹{getTotalPrice().toFixed(2)}</p>
                            <Button className="w-full" onClick={handleBuyNow} disabled={cartItems.length === 0}>
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart