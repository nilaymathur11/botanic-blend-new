import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#4d7c0f] py-6 px-4 md:px-6 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; 2024 Botanic Blend. All rights reserved.</p>
        <nav className="flex items-center gap-6 mt-4 md:mt-0">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
}