import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from '@/redux/StoreProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Botanic Blend",
  description: "Home Crafted Skincare Products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StoreProvider>
          <div className="min-h-[86dvh] bg-[#F5F5F5] text-slate-800">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
