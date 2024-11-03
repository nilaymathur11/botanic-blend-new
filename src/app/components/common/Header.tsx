'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = useCallback((path: string) => { return pathname === path }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-100 shadow z-[9999] py-4 md:px-6 px-3 grid grid-cols-1 md:grid-cols-3 sticky top-0">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image src="/leaf-icon.svg" alt='logo' width={24} height={24} className='w-6 h-6' />
          <span className="text-xl font-bold text-[#4d7c0f]">Botanic Blend</span>
        </Link>
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-[#E5E5E5] transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      <nav
        className={`md:flex md:ms-28 flex-col md:flex-row items-start md:items-center justify-center gap-6 md:gap-12
          ${isMenuOpen ? 'flex' : 'hidden'} 
          absolute md:static right-0 top-[100%] md:top-auto py-4 md:py-0 
          bg-gray-100 md:bg-transparent shadow-md md:shadow-none 
          w-full md:w-auto justify-center items-center 
          rounded-b-lg md:rounded-none md:border-none border-t-2`}
      >
        <Link
          href="/"
          className={`font-medium hover:text-[#4d7c0f] transition-colors ${isActive('/') ? 'text-[#4d7c0f] font-bold' : 'text-gray-600'
            }`}
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`font-medium hover:text-[#4d7c0f] transition-colors ${isActive('/products') ? 'text-[#4d7c0f] font-bold' : 'text-gray-600'
            }`}
          prefetch={false}
        >
          Products
        </Link>
        <Link
          href="/about"
          className={`font-medium hover:text-[#4d7c0f] transition-colors ${isActive('/about') ? 'text-[#4d7c0f] font-bold' : 'text-gray-600'
            }`}
          prefetch={false}
        >
          About
        </Link>
      </nav>
    </header>
  );
}