'use client';

import { useState, useEffect, useCallback } from 'react';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { StarRating } from '@/components/ui/StarRating';
import { testimonials, TESTIMONIAL_ROTATION_INTERVAL, type Testimonial } from '@/lib/constants/testimonials';

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const currentTestimonialData = testimonials[currentTestimonial];

  // Safety check - handle edge cases gracefully
  if (!currentTestimonialData || testimonials.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neutral-600">No testimonials available at this time.</p>
        </div>
      </section>
    );
  }

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, TESTIMONIAL_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const handleIndicatorClick = useCallback((index: number) => {
    setCurrentTestimonial(index);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            Client <span className="text-accent-500 font-accent">Testimonials</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients 
            have to say about our professional drone photography services.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Customer testimonials"
          aria-live="polite"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-accent-500">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Quote Icon */}
              <div className="text-accent-500 mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              {/* Testimonial Content */}
              <div className="mb-8">
                <blockquote className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6 italic">
                  &ldquo;{currentTestimonialData.text}&rdquo;
                </blockquote>

                {/* Rating */}
                <StarRating 
                  rating={currentTestimonialData.rating} 
                  showText 
                  className="mb-6" 
                />
              </div>

              {/* Client Info */}
              <div className="flex items-center">
                <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden">
                  <PlaceholderImage
                    src={currentTestimonialData.image}
                    alt={`${currentTestimonialData.name} profile picture`}
                    fill
                    className="object-cover rounded-full"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-primary-900 text-lg">
                    {currentTestimonialData.name}
                  </h4>
                  <p className="text-neutral-600">
                    {currentTestimonialData.role}
                    {currentTestimonialData.company && (
                      <span className="text-accent-600">
                        {' '}at {currentTestimonialData.company}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Only show if more than one testimonial */}
          {testimonials.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-primary-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                type="button"
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-primary-600 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Testimonial Indicators - Only show if more than one testimonial */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2" role="tablist" aria-label="Testimonial indicators">
            {testimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  index === currentTestimonial 
                    ? 'bg-accent-500 scale-125' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                role="tab"
              />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-900 mb-2" aria-label="500 plus projects completed">500+</div>
            <div className="text-neutral-600 font-medium">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-900 mb-2" aria-label="98 percent client satisfaction">98%</div>
            <div className="text-neutral-600 font-medium">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-900 mb-2" aria-label="5 star average rating">5★</div>
            <div className="text-neutral-600 font-medium">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary-900 mb-2" aria-label="24 hour delivery time">24hr</div>
            <div className="text-neutral-600 font-medium">Delivery Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}