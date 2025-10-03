import { Suspense } from 'react';
import { Metadata } from 'next';
import { PublicGallery } from '@/components/gallery/PublicGallery';
import { GalleryLoading } from '@/components/gallery/GalleryLoading';
import { GalleryErrorBoundary } from '@/components/gallery/GalleryErrorBoundary';

export const metadata: Metadata = {
  title: 'Gallery | All Around Photos LLC',
  description: 'Browse our portfolio of professional drone photography including commercial inspections, residential photography, real estate, and event coverage.',
  keywords: ['drone photography', 'aerial photography', 'commercial inspection', 'residential photography', 'real estate photography', 'event photography'],
  openGraph: {
    title: 'Professional Drone Photography Gallery | All Around Photos LLC',
    description: 'Explore our portfolio of aerial photography and commercial inspections. High-quality drone photography for real estate, events, and property inspections.',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'All Around Photos LLC Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Drone Photography Gallery',
    description: 'Explore our portfolio of aerial photography and commercial inspections.',
    images: ['/og-image.svg'],
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Our Work
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Explore our portfolio of professional drone photography and aerial cinematography. 
            From commercial property inspections to stunning real estate photography, 
            see the quality and expertise that sets All Around Photos LLC apart.
          </p>
        </header>

        <GalleryErrorBoundary>
          <Suspense fallback={<GalleryLoading />}>
            <PublicGallery />
          </Suspense>
        </GalleryErrorBoundary>
      </div>
    </div>
  );
}