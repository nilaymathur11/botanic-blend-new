"use client";

import { useState } from 'react'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { redirectToWhatsApp } from '@/utils/whatsappRedirect';
import Image from 'next/image';
import Header from '@/app/components/common/Header';
import Footer from '@/app/components/common/Footer';

export default function SingleProductPage() {
  const [currentImage, setCurrentImage] = useState(0)

  const product = {
    name: "Revitalizing Rosehip Serum",
    price: 39.99,
    description: "Our Revitalizing Rosehip Serum is a powerful blend of natural ingredients designed to nourish and rejuvenate your skin. Rich in vitamins and essential fatty acids, this serum helps to reduce the appearance of fine lines, even skin tone, and promote a healthy, radiant complexion.",
    images: [
      "/aloe-cream.jpeg",
      "/aloe-cream.jpeg",
      "/aloe-cream.jpeg",
      "/aloe-cream.jpeg"
    ],
    features: [
      "Rich in Vitamin C and E",
      "Promotes collagen production",
      "Suitable for all skin types",
      "Cruelty-free and vegan"
    ]
  }

  const handleImageChange = (direction: 'next' | 'prev') => {
    setCurrentImage(prev => {
      if (direction === 'next') {
        return (prev + 1) % product.images.length
      } else {
        return prev === 0 ? product.images.length - 1 : prev - 1
      }
    })
  }

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-[86dvh] bg-[#F5F5F5] text-slate-800">
        <main className="flex-1 bg-[#F5F5F5] py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <div className="relative">
                  <Image
                    unoptimized={true}
                    width={0}
                    height={0}
                    src={product.images[currentImage]}
                    alt={product.name}
                    className="w-full h-[400px] object-cover rounded-xl"
                  />
                  <button
                    onClick={() => handleImageChange('prev')}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#4d7c0f]" />
                  </button>
                  <button
                    onClick={() => handleImageChange('next')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  >
                    <ChevronRight className="w-6 h-6 text-[#4d7c0f]" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, index) => (
                    <Image
                      unoptimized={true}
                      width={0}
                      height={0}
                      key={index}
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className={`w-full h-28 object-cover rounded-md cursor-pointer ${currentImage === index ? 'border-2 border-[#4d7c0f]' : ''
                        }`}
                      onClick={() => setCurrentImage(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="text-3xl md:text-4xl font-bold text-[#4d7c0f]">{product.name}</div>
                <p className="text-2xl font-semibold text-[#666666]">${product.price.toFixed(2)}</p>
                <p className="text-lg text-[#666666]">{product.description}</p>
                <div className="space-y-2">
                  <div className="text-xl font-semibold text-[#4d7c0f]">Key Features:</div>
                  <ul className="list-disc list-inside text-[#666666]">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <button className="mt-4 w-max px-6 bg-[#4d7c0f] text-white py-2 rounded-md hover:bg-[#3d6c0f] transition-colors flex items-center justify-center" onClick={() => redirectToWhatsApp(product.name)}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}