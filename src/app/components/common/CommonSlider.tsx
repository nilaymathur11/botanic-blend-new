"use client";
import { useEffect, useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CommonSliderProps<T> {
    items: T[]; // Array of items to display
    interval?: number; // Interval in milliseconds for auto-slide
    renderItem: (item: T) => ReactNode; // Function to render each item
    title?: string; // Optional title for the section
}

export default function CommonSlider<T>({
    items,
    interval = 5000,
    renderItem,
    title,
}: CommonSliderProps<T>) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, interval);

        return () => clearInterval(timer);
    }, [items.length, interval]);

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                {title && <div className="text-3xl font-bold text-center text-[#4d7c0f] mb-12">{title}</div>}
                <div className="flex gap-4 items-center justify-between max-w-2xl mx-auto text-center">
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
                        className="bg-white p-2 h-max rounded-full shadow-md text-[#4d7c0f] hover:bg-[#F5F5F5]"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div>{renderItem(items[currentIndex])}</div>
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
                        className="bg-white p-2 h-max rounded-full shadow-md text-[#4d7c0f] hover:bg-[#F5F5F5]"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
