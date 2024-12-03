'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateQuantity } from '@/redux/slices/cartSlice'
import { RootState } from '@/redux/store'
import { redirectToWhatsApp } from '@/utils/whatsappRedirect'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { IProduct } from '@/utils/interfaces/CommonInterfaces'
import Header from '@/app/components/common/Header'
import Footer from '@/app/components/common/Footer'
import { useToast } from '@/hooks/use-toast'

export default function SingleProductPage() {
  const [product, setProduct] = useState<IProduct | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch product')
        }
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleImageChange = (direction: 'next' | 'prev') => {
    if (!product) return
    setCurrentImage(prev => {
      if (direction === 'next') {
        return (prev + 1) % product.images.length
      } else {
        return prev === 0 ? product.images.length - 1 : prev - 1
      }
    })
  }

  const handleAddToCart = () => {
    if (product && product?.id) {
      dispatch(addToCart({
        id: product.id,
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
  }

  const handleUpdateQuantity = (change: number) => {
    if (product && product?.id) {
      const cartItem = cartItems.find(item => item.id === product.id)
      if (cartItem) {
        const newQuantity = Math.max(0, cartItem.quantity + change)
        if (newQuantity === 0) {
          dispatch(updateQuantity({ id: product.id, quantity: 0 }))
        } else {
          dispatch(updateQuantity({ id: product.id, quantity: newQuantity }))
        }
      } else if (change > 0) {
        handleAddToCart()
      }
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    if (product) {
      redirectToWhatsApp(`I'd like to purchase: ${product.name}\nQuantity: 1\nTotal: $${product.price.toFixed(2)}`)
    }
  }

  const getCartQuantity = () => {
    if (product) {
      const cartItem = cartItems.find(item => item.id === product.id)
      return cartItem ? cartItem.quantity : 0
    }
    return 0
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 min-h-[87vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-12 w-1/3" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 min-h-[87vh]">
          <div className="text-2xl font-bold">Something went wrong! Please refresh...</div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-[87vh] bg-gradient-to-b from-[#F5F5F5] to-[#E0E0E0]">
        <main className="container mx-auto px-4 py-12">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div className="relative aspect-square">
                    <Image
                      src={product.images[currentImage]}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleImageChange('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => handleImageChange('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.map((img, index) => (
                      <Image
                        key={index}
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        width={100}
                        height={100}
                        className={`w-full h-24 object-cover rounded-md cursor-pointer ${currentImage === index ? 'ring-2 ring-[#4d7c0f]' : ''
                          }`}
                        onClick={() => setCurrentImage(index)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-stretch gap-4 h-full">
                  <div className='flex flex-col justify-start items-start gap-6'>
                    <div className="text-3xl md:text-4xl font-bold text-[#4d7c0f]">{product.name}</div>
                    <p className="text-2xl font-semibold text-[#666666]">${product.price.toFixed(2)}</p>
                    <p className="text-lg text-[#666666]">{product.description}</p>
                    {product.uses.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xl font-semibold text-[#4d7c0f]">Uses:</div>
                        <ul className="list-disc list-inside text-[#666666]">
                          {product.uses.map((use, index) => (
                            <li key={index}>{use}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.ingredients.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xl font-semibold text-[#4d7c0f]">Ingredients:</div>
                        <p className="text-[#666666]">{product.ingredients.join(', ')}</p>
                      </div>
                    )}
                    {product.steps_to_use.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xl font-semibold text-[#4d7c0f]">How to Use:</div>
                        <ol className="list-decimal list-inside text-[#666666]">
                          {product.steps_to_use.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-4 md:w-1/2 mt-12">
                    {getCartQuantity() > 0 ? (
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(-1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold">{getCartQuantity()}</span>
                        <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button className="flex-1" onClick={handleAddToCart}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    )}
                    <Button className="flex-1" onClick={handleBuyNow}>
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </>
  )
}