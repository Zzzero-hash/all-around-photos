'use client';

import { useState, useMemo, useCallback } from 'react';
import { PhotoCategory } from '@prisma/client';
import { CategoryFilter } from './CategoryFilter';
import { PhotoGrid } from './PhotoGrid';
import { mockPhotos } from '@/lib/mock-data';

export function PublicGallery() {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | 'ALL'>('ALL');

  // Memoize category change handler to prevent unnecessary re-renders
  const handleCategoryChange = useCallback((category: PhotoCategory | 'ALL') => {
    setSelectedCategory(category);
  }, []);

  // Filter photos based on selected category
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'ALL') {
      return mockPhotos.filter(photo => photo.isPublic);
    }
    return mockPhotos.filter(photo => 
      photo.isPublic && photo.category === selectedCategory
    );
  }, [selectedCategory]);

  // Calculate photo counts for each category
  const photoCounts = useMemo(() => {
    const counts: Record<PhotoCategory | 'ALL', number> = {
      ALL: mockPhotos.filter(photo => photo.isPublic).length,
      COMMERCIAL: 0,
      RESIDENTIAL: 0,
      REAL_ESTATE: 0,
      EVENT: 0,
      OTHER: 0,
      COMMERCIAL_INSPECTION: 0,
      RESIDENTIAL_INSPECTION: 0,
    };

    mockPhotos.forEach(photo => {
      if (photo.isPublic) {
        counts[photo.category]++;
      }
    });

    return counts;
  }, []);

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        photoCounts={photoCounts}
      />

      {/* Photo Grid */}
      <PhotoGrid photos={filteredPhotos} />
    </div>
  );
}