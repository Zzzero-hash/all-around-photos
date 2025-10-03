'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Download, Calendar, Tag, MapPin } from 'lucide-react';
import { Photo } from '@/types/database';
import { getImageUrl } from '@/lib/image-utils';

interface ImageModalProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

function renderMetadataSection(metadata: Record<string, unknown> | null) {
  if (!metadata) return null;

  return (
    <>
      {/* Date */}
      {metadata.capturedAt && typeof metadata.capturedAt === 'string' && (
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary-600" />
          <div>
            <p className="text-sm font-medium text-neutral-900">Date Captured</p>
            <p className="text-sm text-neutral-600">
              {new Date(metadata.capturedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      )}

      {/* Location */}
      {metadata.location && typeof metadata.location === 'string' && (
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary-600" />
          <div>
            <p className="text-sm font-medium text-neutral-900">Location</p>
            <p className="text-sm text-neutral-600">
              {metadata.location}
            </p>
          </div>
        </div>
      )}

      {/* Equipment */}
      {metadata.equipment && typeof metadata.equipment === 'object' && metadata.equipment !== null && (
        <div>
          <p className="text-sm font-medium text-neutral-900 mb-2">Equipment Used</p>
          <div className="space-y-1">
            {(() => {
              const equipment = metadata.equipment as Record<string, unknown>;
              return (
                <>
                  {equipment.drone && (
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">Drone:</span> {String(equipment.drone)}
                    </p>
                  )}
                  {equipment.camera && (
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">Camera:</span> {String(equipment.camera)}
                    </p>
                  )}
                  {equipment.lens && (
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">Lens:</span> {String(equipment.lens)}
                    </p>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Technical details */}
      {metadata.technical && typeof metadata.technical === 'object' && metadata.technical !== null && (
        <div>
          <p className="text-sm font-medium text-neutral-900 mb-2">Technical Details</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600">
            {(() => {
              const technical = metadata.technical as Record<string, unknown>;
              return (
                <>
                  {technical.altitude && (
                    <div>
                      <span className="font-medium">Altitude:</span>
                      <br />
                      {String(technical.altitude)}
                    </div>
                  )}
                  {technical.resolution && (
                    <div>
                      <span className="font-medium">Resolution:</span>
                      <br />
                      {String(technical.resolution)}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}

export function ImageModal({
  photo,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) onPrevious();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious]);

  if (!isOpen) return null;

  const metadata = photo.metadata as Record<string, unknown> | null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative z-10 max-w-7xl max-h-[90vh] mx-4 bg-white rounded-lg overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-neutral-900 truncate">
              {photo.title || photo.filename}
            </h2>
            {photo.description && (
              <p className="text-sm text-neutral-600 mt-1">
                {photo.description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Image container */}
          <div className="flex-1 relative bg-neutral-100">
            <div className="relative aspect-video lg:aspect-auto lg:h-[70vh]">
              <Image
                src={getImageUrl(photo)}
                alt={photo.title || photo.filename}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
              />
            </div>

            {/* Navigation arrows */}
            {hasPrevious && onPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {hasNext && onNext && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Metadata sidebar */}
          <div className="lg:w-80 p-6 bg-neutral-50 border-t lg:border-t-0 lg:border-l border-neutral-200">
            <div className="space-y-6">
              {/* Category */}
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-neutral-900">Category</p>
                  <p className="text-sm text-neutral-600 capitalize">
                    {photo.category.toLowerCase().replace('_', ' ')}
                  </p>
                </div>
              </div>

              {renderMetadataSection(metadata)}



              {/* Download button (for demo purposes) */}
              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                onClick={() => {
                  // In a real app, this would trigger a download or show pricing
                  alert('Contact us for high-resolution downloads and licensing options.');
                }}
              >
                <Download className="w-4 h-4" />
                Request High-Res
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
