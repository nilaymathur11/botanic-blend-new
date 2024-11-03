import React from 'react';
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link';
import { redirectToWhatsApp } from '@/utils/whatsappRedirect';
import Image from 'next/image';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ product, type }: { product: ProductCardProps; type: string }) {
  return (
    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
      <Link href={`/products/${product.id}`}>
        <Image unoptimized={true} width={0} height={0} src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <div className="font-semibold text-[#4d7c0f]">{product.name}</div>
        <p className="text-[#666666] mt-2">${product.price.toFixed(2)}</p>
        {
          type === "buy" ?
            <button className="mt-4 w-full bg-[#4d7c0f] text-white py-2 rounded-md hover:bg-[#3d6c0f] transition-colors flex items-center justify-center" onClick={() => redirectToWhatsApp(product.name)}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Buy Now
            </button>
            :
            <Link href={`/products/${product.id}`} className="mt-4 w-full bg-[#4d7c0f] text-white py-2 rounded-md hover:bg-[#3d6c0f] transition-colors flex items-center justify-center">
              View Product
            </Link>
        }
      </div>
    </div>
  );
}