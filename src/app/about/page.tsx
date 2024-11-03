"use client";
import Image from 'next/image';
import { Leaf, Droplet, Sun, Users, MessageCircle } from 'lucide-react';
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { redirectToWhatsApp } from '@/utils/whatsappRedirect';

export default function About() {
    const handleContactClick = () => {
        const message = "Hello, I'd like to learn more about Botanic Blend products!";
        redirectToWhatsApp(message);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col min-h-[86dvh] bg-[#F5F5F5] text-slate-800">
                <main className="flex-grow py-12">
                    <div className="container mx-auto px-4">
                        <div className="text-4xl font-bold text-[#4d7c0f] mb-8 text-center">About Botanic Blend</div>

                        <section className="mb-16">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="md:flex">
                                    <div className="md:flex-shrink-0">
                                        <Image
                                            src="/aloe-cream.jpeg"
                                            alt="Botanic Blend team"
                                            width={0}
                                            height={0}
                                            className="md:h-full h-52 w-full object-cover md:w-60"
                                            unoptimized={true}
                                        />
                                    </div>
                                    <div className="p-8">
                                        <div className="block mt-1 text-2xl leading-tight font-semibold text-[#4d7c0f] mb-2">Our Story</div>
                                        <p className="mt-2 text-gray-600">
                                            Founded in 2010, Botanic Blend sprouted from a passion for natural skincare and a commitment to environmental sustainability. Our journey began in a small herb garden and has blossomed into a global brand, always rooted in our love for botanical ingredients and their transformative power for skin health.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-16">
                            <div className="text-3xl font-semibold text-[#4d7c0f] mb-6 text-center">Our Values</div>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <Leaf className="w-12 h-12 text-[#4d7c0f] mb-4 mx-auto" />
                                    <div className="text-xl font-semibold mb-2 text-center">Natural Ingredients</div>
                                    <p className="text-gray-600 text-center">We harness the power of nature, using only the finest botanical ingredients in our products.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <Droplet className="w-12 h-12 text-[#4d7c0f] mb-4 mx-auto" />
                                    <div className="text-xl font-semibold mb-2 text-center">Sustainability</div>
                                    <p className="text-gray-600 text-center">Our commitment to the environment is reflected in every aspect of our business, from sourcing to packaging.</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <Sun className="w-12 h-12 text-[#4d7c0f] mb-4 mx-auto" />
                                    <div className="text-xl font-semibold mb-2 text-center">Radiant Results</div>
                                    <p className="text-gray-600 text-center">{"We're dedicated to creating products that reveal your skin's natural, healthy glow."}</p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-16">
                            <div className="text-3xl font-semibold text-[#4d7c0f] mb-6 text-center">Meet Our Team</div>
                            <div className="grid md:grid-cols-4 gap-8">
                                {['Emma Green', 'Liam Botanist', 'Sophia Herbalist', 'Noah Sustainability'].map((name, index) => (
                                    <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                                        <div className="w-24 h-24 bg-[#e0e7d7] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Users className="w-12 h-12 text-[#4d7c0f]" />
                                        </div>
                                        <div className="text-xl font-semibold mb-2">{name}</div>
                                        <p className="text-gray-600">{"Passionate about bringing nature's best to your skincare routine."}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="bg-[#4d7c0f] text-white p-8 rounded-lg shadow-lg">
                                <div className="text-3xl font-semibold mb-4 text-center">Contact Us</div>
                                <p className="text-center mb-6">
                                    {"Have questions about our products or want to learn more about Botanic Blend? We're just a message away!"}
                                </p>
                                <div className="flex justify-center">
                                    <button
                                        onClick={handleContactClick}
                                        className="bg-white text-[#4d7c0f] px-6 py-3 rounded-md hover:bg-[#e0e7d7] transition-colors flex items-center"
                                    >
                                        <MessageCircle className="mr-2" />
                                        Chat with Us on WhatsApp
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}