'use client';

import { PhotoCategory } from '@prisma/client';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory: PhotoCategory | 'ALL';
  onCategoryChange: (category: PhotoCategory | 'ALL') => void;
  photoCounts: Record<PhotoCategory | 'ALL', number>;
}

const CATEGORY_LABELS: Record<PhotoCategory | 'ALL', string> = {
  ALL: 'All Work',
  COMMERCIAL: 'Commercial',
  RESIDENTIAL: 'Residential',
  REAL_ESTATE: 'Real Estate',
  EVENT: 'Events',
  OTHER: 'Other',
  COMMERCIAL_INSPECTION: 'Commercial Inspections',
  RESIDENTIAL_INSPECTION: 'Residential Inspections',
};

const CATEGORY_DESCRIPTIONS: Record<PhotoCategory | 'ALL', string> = {
  ALL: 'View all our professional drone photography work',
  COMMERCIAL: 'Commercial property inspections and aerial surveys',
  RESIDENTIAL: 'Residential property photography and inspections',
  REAL_ESTATE: 'Real estate listing photography and virtual tours',
  EVENT: 'Event coverage and special occasion photography',
  OTHER: 'Additional photography services and creative projects',
  COMMERCIAL_INSPECTION: 'Professional commercial property inspections with detailed technical analysis and equipment documentation',
  RESIDENTIAL_INSPECTION: 'Comprehensive residential property inspections including roof assessments, structural analysis, and before/after comparisons',
};

export function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange, 
  photoCounts 
}: CategoryFilterProps) {
  const categories = ['ALL', ...Object.values(PhotoCategory)] as const;

  return (
    <div className="space-y-6">
      {/* Category buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const count = photoCounts[category] || 0;
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              disabled={count === 0}
              className={cn(
                'px-6 py-3 rounded-full font-medium transition-all duration-200',
                'flex items-center gap-2 min-w-0',
                isSelected
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : count > 0
                  ? 'bg-white text-neutral-700 border border-neutral-300 hover:border-primary-300 hover:text-primary-600 hover:shadow-md'
                  : 'bg-neutral-100 text-neutral-400 cursor-not-allowed',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              )}
              aria-label={`Filter by ${CATEGORY_LABELS[category]} (${count} photos)`}
            >
              <span className="truncate">{CATEGORY_LABELS[category]}</span>
              <span className={cn(
                'text-xs px-2 py-1 rounded-full',
                isSelected
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-200 text-neutral-600'
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category description */}
      <div className="text-center">
        <p className="text-neutral-600 max-w-2xl mx-auto">
          {CATEGORY_DESCRIPTIONS[selectedCategory]}
        </p>
      </div>
    </div>
  );
}