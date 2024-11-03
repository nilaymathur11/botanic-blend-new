import React from 'react';
import { Leaf } from 'lucide-react'
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-[#F5F5F5] py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-4xl md:text-5xl font-bold text-[#4d7c0f]">{"Discover Nature's Beauty Secret"}</div>
          <p className="text-xl mt-4 mb-6 text-[#666666]">Unlock the power of botanical ingredients for radiant, healthy skin.</p>
          <Link href="/products" className="bg-[#4d7c0f] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3d6c0f] transition-colors">
            Shop Now
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Leaf className="w-full h-full text-[#4d7c0f]" />
      </div>
    </section>
  );
}