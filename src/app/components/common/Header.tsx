'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Cart from './Cart';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const pathname = usePathname();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isActive = useCallback((path: string) => { return pathname === path }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-100 shadow z-[9999] py-4 md:px-6 px-3 sticky top-0">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image src="/leaf-icon.svg" alt='logo' width={24} height={24} className='w-6 h-6' />
          <span className="text-xl font-bold text-[#4d7c0f]">Botanic Blend</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`font-medium hover:text-[#4d7c0f] transition-colors ${isActive('/') ? 'text-[#4d7c0f] font-bold' : 'text-gray-600'}`}
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`font-medium hover:text-[#4d7c0f] transition-colors ${isActive('/products') ? 'text-[#4d7c0f] font-bold' : 'text-gray-600'}`}
            prefetch={false}
          >
            Products
          </Link>
          <Link
            href="/about"
            className={`font-medium hover:text-[#4d7c0f] transition-colors ${isActive('/about') ? 'text-[#4d7c0f] font-bold' : 'text-gray-600'}`}
            prefetch={false}
          >
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleCart}
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#4d7c0f] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full hover:bg-[#E5E5E5] transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-4">
          <Link
            href="/"
            className={`font-medium hover:text-[#4d7c0f] transition-colors ${isActive('/') ? 'text-[#4d7c0f] font-bold' : 'text-gray-600'}`}
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`font-medium hover:text-[#4d7c0f] transition-colors ${isActive('/products') ? 'text-[#4d7c0f] font-bold' : 'text-gray-600'}`}
            prefetch={false}
          >
            Products
          </Link>
          <Link
            href="/about"
            className={`font-medium hover:text-[#4d7c0f] transition-colors ${isActive('/about') ? 'text-[#4d7c0f] font-bold' : 'text-gray-600'}`}
            prefetch={false}
          >
            About
          </Link>
        </nav>
      )}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}