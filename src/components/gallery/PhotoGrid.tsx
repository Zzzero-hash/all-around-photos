'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Photo } from '@prisma/client';
import { ImageModal } from './ImageModal';
import { InspectionPhotoCard } from './InspectionPhotoCard';
import { InspectionImageModal } from './InspectionImageModal';
import { cn } from '@/lib/utils';

interface PhotoGridProps {
  photos: Photo[];
  className?: string;
}

export function PhotoGrid({ photos, className }: PhotoGridProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openModal = useCallback((index: number) => {
    setSelectedPhotoIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const goToNext = useCallback(() => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  }, [selectedPhotoIndex, photos.length]);

  const goToPrevious = useCallback(() => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  }, [selectedPhotoIndex]);

  // Check if current photo is an inspection photo
  const isInspectionPhoto = (photo: Photo) => {
    return photo.category === 'COMMERCIAL_INSPECTION' || photo.category === 'RESIDENTIAL_INSPECTION';
  };

  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-neutral-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-neutral-900 mb-2">No photos found</h3>
        <p className="text-neutral-600">
          No photos match the selected category. Try selecting a different category or check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={cn(
        'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6',
        className
      )}>
        {photos.map((photo, index) => {
          // Use InspectionPhotoCard for inspection photos, regular PhotoCard for others
          if (isInspectionPhoto(photo)) {
            return (
              <InspectionPhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => openModal(index)}
              />
            );
          }
          
          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClick={() => openModal(index)}
            />
          );
        })}
      </div>

      {/* Image Modal - Use InspectionImageModal for inspection photos */}
      {selectedPhotoIndex !== null && photos[selectedPhotoIndex] && (
        <>
          {isInspectionPhoto(photos[selectedPhotoIndex]) ? (
            <InspectionImageModal
              photo={photos[selectedPhotoIndex]}
              isOpen={true}
              onClose={closeModal}
              onNext={selectedPhotoIndex < photos.length - 1 ? goToNext : undefined}
              onPrevious={selectedPhotoIndex > 0 ? goToPrevious : undefined}
              hasNext={selectedPhotoIndex < photos.length - 1}
              hasPrevious={selectedPhotoIndex > 0}
            />
          ) : (
            <ImageModal
              photo={photos[selectedPhotoIndex]}
              isOpen={true}
              onClose={closeModal}
              onNext={selectedPhotoIndex < photos.length - 1 ? goToNext : undefined}
              onPrevious={selectedPhotoIndex > 0 ? goToPrevious : undefined}
              hasNext={selectedPhotoIndex < photos.length - 1}
              hasPrevious={selectedPhotoIndex > 0}
            />
          )}
        </>
      )}
    </>
  );
}

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="break-inside-avoid group cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden rounded-lg bg-neutral-200 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
        {!imageError ? (
          <Image
            src={photo.thumbnailUrl || photo.storageUrl}
            alt={photo.title || photo.filename}
            width={400}
            height={300}
            className={cn(
              'w-full h-auto object-cover transition-all duration-300',
              'group-hover:brightness-110',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[4/3] flex items-center justify-center bg-neutral-200">
            <div className="text-center text-neutral-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
        )}

        {/* Overlay with photo info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {photo.title && (
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                {photo.title}
              </h3>
            )}
            <div className="flex items-center justify-between text-xs">
              <span className="capitalize bg-white/20 px-2 py-1 rounded">
                {photo.category.toLowerCase().replace('_', ' ')}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}