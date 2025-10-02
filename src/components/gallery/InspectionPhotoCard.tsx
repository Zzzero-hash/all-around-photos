'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@prisma/client';
import { cn } from '@/lib/utils';

interface InspectionPhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

export function InspectionPhotoCard({ photo, onClick }: InspectionPhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Extract inspection metadata
  interface InspectionMetadata {
    inspectionType?: string;
    findings?: string;
    beforeAfter?: {
      type: string;
      relatedPhotoId?: string;
    };
    equipment?: {
      drone?: string;
      camera?: string;
      thermalCamera?: boolean;
      inspectionTools?: string[];
    };
  }

  const metadata = photo.metadata as InspectionMetadata | null;
  const inspectionType = metadata?.inspectionType || 'general';
  const findings = metadata?.findings || 'unknown';
  const beforeAfter = metadata?.beforeAfter;
  const equipment = metadata?.equipment;
  const isBeforeAfter = beforeAfter?.type;

  // Get inspection type icon
  const getInspectionIcon = (type: string) => {
    switch (type) {
      case 'roof':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21l18-18M3 3l18 18M12 3v18" />
          </svg>
        );
      case 'structural':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'hvac':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };

  // Get findings color
  const getFindingsColor = (findings: string) => {
    switch (findings) {
      case 'good':
        return 'bg-green-500';
      case 'minor_issues':
        return 'bg-yellow-500';
      case 'major_issues':
        return 'bg-red-500';
      default:
        return 'bg-neutral-500';
    }
  };

  // Get findings text
  const getFindingsText = (findings: string) => {
    switch (findings) {
      case 'good':
        return 'Good Condition';
      case 'minor_issues':
        return 'Minor Issues';
      case 'major_issues':
        return 'Major Issues';
      default:
        return 'Assessment Pending';
    }
  };

  return (
    <div className="break-inside-avoid group cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden rounded-lg bg-neutral-200 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
        {/* Before/After Badge */}
        {isBeforeAfter && (
          <div className="absolute top-3 left-3 z-10">
            <span className={cn(
              'px-2 py-1 text-xs font-semibold rounded-full',
              isBeforeAfter === 'before'
                ? 'bg-blue-500 text-white'
                : 'bg-green-500 text-white'
            )}>
              {isBeforeAfter === 'before' ? 'BEFORE' : 'AFTER'}
            </span>
          </div>
        )}

        {/* Thermal Camera Badge */}
        {equipment?.thermalCamera && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Thermal
            </div>
          </div>
        )}

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

        {/* Inspection-specific overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {photo.title && (
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                {photo.title}
              </h3>
            )}

            {/* Inspection details */}
            <div className="space-y-2">
              {/* Inspection type and findings */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  {getInspectionIcon(inspectionType)}
                  <span className="capitalize">
                    {inspectionType} Inspection
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className={cn('w-2 h-2 rounded-full', getFindingsColor(findings))} />
                  <span>{getFindingsText(findings)}</span>
                </div>
              </div>

              {/* Equipment used */}
              {equipment?.drone && (
                <div className="text-xs text-neutral-300">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {equipment.drone}
                  </span>
                </div>
              )}

              {/* View action */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs bg-white/20 px-2 py-1 rounded capitalize">
                  {photo.category.toLowerCase().replace('_', ' ')}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}