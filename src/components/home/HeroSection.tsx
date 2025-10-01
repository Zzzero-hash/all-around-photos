'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop',
    alt: 'Professional drone aerial photography of commercial building',
  },
  {
    src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop', 
    alt: 'Residential property inspection from aerial view',
  },
  {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop',
    alt: 'Real estate photography showcasing property layout',
  },
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Professional{' '}
            <span className="text-accent-400 font-accent">Drone Photography</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-neutral-200 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Capturing stunning aerial perspectives for commercial inspections, 
            residential properties, and special events with certified expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/gallery"
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Our Work
            </Link>
            <Link
              href="/quote"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-neutral-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-neutral-200">
              <div className="w-3 h-3 bg-accent-400 rounded-full" />
              <span className="font-medium">FAA Certified</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-neutral-200">
              <div className="w-3 h-3 bg-accent-400 rounded-full" />
              <span className="font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-neutral-200">
              <div className="w-3 h-3 bg-accent-400 rounded-full" />
              <span className="font-medium">Professional Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}