/**
 * @fileoverview Stub version of metadata utilities for development without database
 * 
 * This module provides development-friendly implementations of photo metadata
 * utilities that can work without a full database setup. These functions
 * provide realistic behavior for testing and development while maintaining
 * the same API as the production versions.
 * 
 * @author All Around Photos LLC
 * @version 1.0.0
 */

import type { PhotoMetadata, MetadataParseResult } from '@/types/database';

/**
 * Type guard that validates PhotoMetadata structure more thoroughly
 * In development, we still want some validation to catch obvious issues
 */
export function isPhotoMetadata(value: unknown): value is PhotoMetadata {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  
  const obj = value as Record<string, unknown>;
  
  // Validate optional fields have correct types when present
  if (obj.location !== undefined && typeof obj.location !== 'string') return false;
  if (obj.equipment !== undefined && typeof obj.equipment !== 'string') return false;
  if (obj.shootDate !== undefined && typeof obj.shootDate !== 'string') return false;
  if (obj.tags !== undefined && !Array.isArray(obj.tags)) return false;
  
  return true;
}

/**
 * Development stub - parses and validates metadata structure
 * Uses the same validation as the type guard for consistency
 */
export function parsePhotoMetadata(value: unknown): PhotoMetadata | null {
  if (!isPhotoMetadata(value)) {
    return null;
  }
  return value;
}

/**
 * Development stub - creates a complete default metadata structure
 * Provides realistic defaults for development and testing
 */
export function createDefaultPhotoMetadata(overrides: Partial<PhotoMetadata> = {}): PhotoMetadata {
  const defaults: PhotoMetadata = {
    shootDate: new Date().toISOString(),
    tags: [],
    location: 'Development Location',
    equipment: 'DJI Mavic 3 Pro',
    format: 'JPEG',
    dimensions: {
      width: 4000,
      height: 3000
    },
    camera: {
      make: 'DJI',
      model: 'Mavic 3 Pro'
    }
  };
  
  return {
    ...defaults,
    ...overrides
  };
}

/**
 * Development stub - returns formatted display data with comprehensive metadata
 * Handles all common metadata fields that might be displayed in the UI
 */
export function extractDisplayMetadata(metadata: PhotoMetadata | null): Record<string, string> {
  if (!metadata) return {};
  
  const display: Record<string, string> = {};
  
  // Basic information
  if (metadata.location) display['Location'] = metadata.location;
  if (metadata.equipment) display['Equipment'] = metadata.equipment;
  
  // Date formatting with error handling
  if (metadata.shootDate) {
    try {
      const date = new Date(metadata.shootDate);
      display['Date'] = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      display['Date'] = metadata.shootDate;
    }
  }
  
  // Camera information
  if (metadata.camera?.make && metadata.camera?.model) {
    display['Camera'] = `${metadata.camera.make} ${metadata.camera.model}`;
  }
  
  // Image dimensions
  if (metadata.dimensions) {
    display['Dimensions'] = `${metadata.dimensions.width} × ${metadata.dimensions.height}`;
  }
  
  // Camera settings
  if (metadata.settings) {
    const settings = [];
    if (metadata.settings.iso) settings.push(`ISO ${metadata.settings.iso}`);
    if (metadata.settings.aperture) settings.push(`f/${metadata.settings.aperture}`);
    if (metadata.settings.shutterSpeed) settings.push(metadata.settings.shutterSpeed);
    if (settings.length > 0) {
      display['Settings'] = settings.join(', ');
    }
  }
  
  return display;
}

/**
 * Development stub - serializes metadata for database storage
 * Ensures the metadata is JSON-serializable
 */
export function serializePhotoMetadata(metadata: PhotoMetadata): unknown {
  try {
    // Ensure all dates are ISO strings and remove any undefined values
    const serialized = JSON.parse(JSON.stringify(metadata));
    return serialized;
  } catch (error) {
    console.warn('Failed to serialize photo metadata:', error);
    return null;
  }
}

/**
 * Development stub - validates and parses metadata with detailed error reporting
 * Returns a result object for better error handling
 */
export function validatePhotoMetadata(value: unknown): MetadataParseResult {
  try {
    if (!isPhotoMetadata(value)) {
      return {
        success: false,
        error: 'Invalid metadata structure',
        rawData: value
      };
    }
    
    return {
      success: true,
      metadata: value
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown validation error',
      rawData: value
    };
  }
}