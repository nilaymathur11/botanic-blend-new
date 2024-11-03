"use client";
import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import CartItem from '../components/common/CartItem';

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Revitalizing Rosehip Serum", price: 39.99, quantity: 2, image: "/placeholder.svg" },
    { id: 2, name: "Soothing Lavender Night Cream", price: 29.99, quantity: 1, image: "/placeholder.svg" },
    { id: 3, name: "Hydrating Aloe Vera Gel", price: 19.99, quantity: 3, image: "/placeholder.svg" },
  ])

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
      ).filter(item => item.quantity > 0)
    )
  }

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const total = subtotal + shipping

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 bg-[#F5F5F5] py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-3xl md:text-4xl font-bold text-[#4d7c0f] mb-8">Your Cart</div>
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-[#4d7c0f] mx-auto mb-4" />
              <p className="text-xl text-[#666666]">Your cart is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} handleQuantityChange={() => handleQuantityChange(item.id, item.price)} handleRemoveItem={() => handleRemoveItem(item.id)} />
                ))}
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow space-y-4">
                  <div className="text-2xl font-semibold text-[#4d7c0f]">Order Summary</div>
                  <div className="flex justify-between text-[#666666]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#666666]">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#4d7c0f] text-white px-6 py-3 rounded-md hover:bg-[#3d6c0f] transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}