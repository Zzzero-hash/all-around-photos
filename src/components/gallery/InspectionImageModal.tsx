'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Photo } from '@prisma/client';
import { cn } from '@/lib/utils';
import { mockPhotos } from '@/lib/mock-data';

interface InspectionImageModalProps {
  photo: Photo;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function InspectionImageModal({
  photo,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: InspectionImageModalProps) {

  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

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
    technicalDetails?: {
      altitude?: string;
      resolution?: string;
      weatherConditions?: string;
      inspectionDate?: string;
    };
  }
  
  const metadata = photo.metadata as InspectionMetadata | null;
  const inspectionType = metadata?.inspectionType || 'general';
  const findings = metadata?.findings || 'unknown';
  const beforeAfter = metadata?.beforeAfter;
  const equipment = metadata?.equipment || {};
  const technicalDetails = metadata?.technicalDetails || {};
  const inspectionTools = equipment?.inspectionTools || [];

  // Find related before/after photo
  const relatedPhoto = beforeAfter?.relatedPhotoId 
    ? mockPhotos.find(p => p.id === beforeAfter.relatedPhotoId)
    : null;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (onPrevious && hasPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (onNext && hasNext) onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious, hasNext, hasPrevious]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Get inspection type details
  const getInspectionTypeInfo = (type: string) => {
    switch (type) {
      case 'roof':
        return {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21l18-18M3 3l18 18M12 3v18" />
            </svg>
          ),
          name: 'Roof Inspection',
          description: 'Comprehensive roof condition assessment'
        };
      case 'structural':
        return {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
          name: 'Structural Assessment',
          description: 'Foundation and structural integrity evaluation'
        };
      case 'hvac':
        return {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          ),
          name: 'HVAC System Inspection',
          description: 'Heating, ventilation, and air conditioning assessment'
        };
      default:
        return {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
          name: 'General Inspection',
          description: 'Comprehensive property assessment'
        };
    }
  };

  // Get findings details
  const getFindingsInfo = (findings: string) => {
    switch (findings) {
      case 'good':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          text: 'Good Condition',
          description: 'No significant issues identified'
        };
      case 'minor_issues':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          text: 'Minor Issues',
          description: 'Some maintenance recommended'
        };
      case 'major_issues':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          text: 'Major Issues',
          description: 'Immediate attention required'
        };
      default:
        return {
          color: 'text-neutral-600',
          bgColor: 'bg-neutral-100',
          text: 'Assessment Pending',
          description: 'Evaluation in progress'
        };
    }
  };

  const inspectionInfo = getInspectionTypeInfo(inspectionType);
  const findingsInfo = getFindingsInfo(findings);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full h-full max-w-7xl mx-auto flex">
        {/* Main Image Section */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Before/After Toggle */}
            {relatedPhoto && (
              <div className="absolute top-4 left-4 z-10">
                <button
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className="bg-white/90 hover:bg-white text-neutral-900 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {showBeforeAfter ? 'Show Current' : 'Show Comparison'}
                </button>
              </div>
            )}

            {/* Image Display */}
            {showBeforeAfter && relatedPhoto ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before Image */}
                <div className="relative">
                  <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    BEFORE
                  </div>
                  <Image
                    src={beforeAfter?.type === 'before' ? photo.storageUrl : relatedPhoto.storageUrl}
                    alt="Before inspection"
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                    priority
                  />
                </div>
                
                {/* After Image */}
                <div className="relative">
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    AFTER
                  </div>
                  <Image
                    src={beforeAfter?.type === 'after' ? photo.storageUrl : relatedPhoto.storageUrl}
                    alt="After inspection"
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                    priority
                  />
                </div>
              </div>
            ) : (
              <Image
                src={photo.storageUrl}
                alt={photo.title || photo.filename}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"

                priority
              />
            )}
          </div>
        </div>

        {/* Inspection Details Sidebar */}
        <div className="w-80 bg-white h-full overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-2">
                  {photo.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  {inspectionInfo.icon}
                  <span>{inspectionInfo.name}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Close inspection details"
                title="Close inspection details"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Findings Status */}
            <div className={cn('p-4 rounded-lg', findingsInfo.bgColor)}>
              <div className="flex items-center gap-2 mb-2">
                <div className={cn('w-3 h-3 rounded-full', 
                  findings === 'good' ? 'bg-green-500' :
                  findings === 'minor_issues' ? 'bg-yellow-500' :
                  findings === 'major_issues' ? 'bg-red-500' : 'bg-neutral-500'
                )} />
                <span className={cn('font-semibold', findingsInfo.color)}>
                  {findingsInfo.text}
                </span>
              </div>
              <p className="text-sm text-neutral-700">
                {findingsInfo.description}
              </p>
            </div>

            {/* Description */}
            {photo.description && (
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Description</h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {photo.description}
                </p>
              </div>
            )}

            {/* Equipment Used */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Equipment Used</h3>
              <div className="space-y-3">
                {equipment.drone && (
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-neutral-900">Drone</div>
                      <div className="text-xs text-neutral-600">{equipment.drone}</div>
                    </div>
                  </div>
                )}
                
                {equipment.camera && (
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-neutral-900">Camera</div>
                      <div className="text-xs text-neutral-600">{equipment.camera}</div>
                    </div>
                  </div>
                )}

                {equipment.thermalCamera && (
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-neutral-900">Thermal Imaging</div>
                      <div className="text-xs text-neutral-600">Infrared temperature analysis</div>
                    </div>
                  </div>
                )}

                {inspectionTools.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-neutral-900 mb-2">Inspection Tools</div>
                    <div className="flex flex-wrap gap-1">
                      {inspectionTools.map((tool: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Details */}
            {Object.keys(technicalDetails).length > 0 && (
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Technical Details</h3>
                <div className="space-y-2 text-sm">
                  {technicalDetails.altitude && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Altitude:</span>
                      <span className="text-neutral-900">{technicalDetails.altitude}</span>
                    </div>
                  )}
                  {technicalDetails.resolution && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Resolution:</span>
                      <span className="text-neutral-900">{technicalDetails.resolution}</span>
                    </div>
                  )}
                  {technicalDetails.weatherConditions && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Weather:</span>
                      <span className="text-neutral-900">{technicalDetails.weatherConditions}</span>
                    </div>
                  )}
                  {technicalDetails.inspectionDate && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Date:</span>
                      <span className="text-neutral-900">
                        {new Date(technicalDetails.inspectionDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4 border-t">
              <button
                onClick={onPrevious}
                disabled={!hasPrevious}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  hasPrevious
                    ? 'text-primary-600 hover:bg-primary-50'
                    : 'text-neutral-400 cursor-not-allowed'
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <button
                onClick={onNext}
                disabled={!hasNext}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  hasNext
                    ? 'text-primary-600 hover:bg-primary-50'
                    : 'text-neutral-400 cursor-not-allowed'
                )}
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}