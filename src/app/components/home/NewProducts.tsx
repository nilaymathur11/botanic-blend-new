import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '@/redux/slices/productSlice';
import ProductCard from '../common/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NewProducts: React.FC = () => {
  const products = useSelector(selectAllProducts);
  const newProducts = products.filter(product => product.is_new);

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center text-[#4d7c0f] mb-12">New Arrivals</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {newProducts.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                <ProductCard product={product} type="view" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default NewProducts;