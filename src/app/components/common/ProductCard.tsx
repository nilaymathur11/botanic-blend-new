'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity } from '@/redux/slices/cartSlice'
import { RootState } from '@/redux/store'
import { ProductCardProps } from '@/utils/interfaces/CommonInterfaces'
import { useToast } from '@/hooks/use-toast'

const ProductCard: React.FC<ProductCardProps> = ({ product, type }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const { toast } = useToast()

  const addToCartHandler = () => {
    dispatch(addToCart({
      id: product.id as string,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]
    }))
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleUpdateQuantity = (id: string, change: number) => {
    const item = cartItems.find(item => item.id === id)
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change)
      if (newQuantity === 0) {
        dispatch(removeFromCart(id))
      } else {
        dispatch(updateQuantity({ id, quantity: newQuantity }))
      }
    } else if (change > 0) {
      addToCartHandler()
    }
  }

  const getCartQuantity = (id: string) => {
    const item = cartItems.find(item => item.id === id)
    return item ? item.quantity : 0
  }

  const discountPercentage = Math.round((1 - product.price / product.original_price) * 100)

  const isInCart = cartItems.some(item => item.id === product.id)

  return (
    <div className="bg-white shadow-md overflow-hidden flex flex-col border border-gray-200">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-2 left-2 flex flex-col items-start gap-2">
            {product.is_new && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">New</span>
            )}
            {product.is_trending && (
              <span className="bg-[#4d7c0f] text-white text-xs font-bold px-2 py-1 rounded">Trending</span>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 flex flex-col items-center flex-grow bg-gray-50">
        <h3 className="text-lg font-semibold mb-2 text-center">{product.name}</h3>
        <div className="flex items-baseline mb-4 justify-center">
          <span className="text-lg font-bold text-[#4d7c0f]">₹{product.price.toFixed(2)}</span>
          <span className="ml-2 text-sm text-gray-500 line-through">₹{product.original_price.toFixed(2)}</span>
          <span className="ml-2 text-sm font-semibold text-[#4d7c0f]">{discountPercentage}% off</span>
        </div>
        {type === 'buy' && (
          <>
            {isInCart ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(product?.id as string, -1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold">{getCartQuantity(product?.id as string)}</span>
                <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(product?.id as string, 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                className="w-full mt-auto"
                onClick={addToCartHandler}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </>
        )}
        {type === 'edit' && (
          <Link href={`/admin/products/${product.id}`}>
            <Button className="w-full mt-auto">Edit</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ProductCard