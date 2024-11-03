"use client"
import { Leaf, Droplet, Sun } from 'lucide-react'
import ProductCard from './components/common/ProductCard'
import Hero from './components/home/Hero'
import Link from 'next/link';
import Image from 'next/image';
import CommonSlider from './components/common/CommonSlider';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const testimonials = [
  { name: "Sarah L.", content: "Botanic Blend's products have transformed my skincare routine. My skin has never looked better!" },
  { name: "Michael R.", content: "I love how these products are all-natural and environmentally friendly. Great for my skin and the planet!" },
  { name: "Emma T.", content: "The Revitalizing Rosehip Serum is a game-changer. I've noticed a significant improvement in my skin's texture." }
]

const products = [
  { id: 1, name: "Revitalizing Rosehip Serum", price: 39.99, image: "/aloe-cream.jpeg" },
  { id: 2, name: "Soothing Lavender Night Cream", price: 29.99, image: "/aloe-cream.jpeg" },
  { id: 3, name: "Hydrating Aloe Vera Gel", price: 19.99, image: "/aloe-cream.jpeg" },
  { id: 4, name: "Nourishing Avocado Face Mask", price: 24.99, image: "/aloe-cream.jpeg" }
]

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-[86dvh] bg-[#F5F5F5] text-slate-800">
        <main className="flex-1">
          <Hero />
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-3xl font-bold text-center text-[#4d7c0f] mb-12">Our Bestsellers</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} type={"view"} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-[#F5F5F5]">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <Image
                    unoptimized={true}
                    width={0}
                    height={0}
                    src="/aloe-cream.jpeg"
                    alt="Botanic Blend Story"
                    className="rounded-xl shadow-lg w-full h-[400px] object-cover"
                  />
                </div>
                <div className="md:w-1/2 flex flex-col gap-4">
                  <div className="text-3xl font-bold text-[#4d7c0f]">Our Story</div>
                  <p className="text-[#666666]">
                    Botanic Blend was founded with a mission to provide high-quality, natural skincare products that nourish
                    and revitalize the skin. Our team of passionate herbalists and skincare experts carefully curate each
                    product using only the finest botanical ingredients, ensuring that every formula is effective,
                    sustainable, and environmentally friendly.
                  </p>
                  <p className="text-[#666666]">
                    We believe in the power of nature to heal and transform, and we are committed to creating products that
                    not only improve the health of your skin, but also support the well-being of our planet.
                  </p>
                  <Link href="/about" className="bg-[#4d7c0f] text-white px-6 py-2 rounded-md hover:bg-[#3d6c0f] transition-colors w-max">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-[#4d7c0f] text-white">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <div className="text-3xl font-bold mb-8">Why Choose Botanic Blend?</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <Leaf className="w-12 h-12 mb-4" />
                  <div className="text-xl font-semibold mb-2">100% Natural</div>
                  <p>All our products are made with pure, natural ingredients</p>
                </div>
                <div className="flex flex-col items-center">
                  <Droplet className="w-12 h-12 mb-4" />
                  <div className="text-xl font-semibold mb-2">Cruelty-Free</div>
                  <p>We never test on animals and use only ethical practices</p>
                </div>
                <div className="flex flex-col items-center">
                  <Sun className="w-12 h-12 mb-4" />
                  <div className="text-xl font-semibold mb-2">Eco-Friendly</div>
                  <p>Sustainable packaging and environmentally conscious production</p>
                </div>
              </div>
            </div>
          </section>

          <CommonSlider
            items={testimonials}
            title="What Our Customers Say"
            renderItem={(testimonial) => (
              <>
                <p className="text-lg text-[#666666] mb-4">{`"${testimonial.content}"`}</p>
                <div className="font-semibold text-[#4d7c0f]">{testimonial.name}</div>
              </>
            )}
          />
        </main>
      </div>
      <Footer />
    </>
  )
}