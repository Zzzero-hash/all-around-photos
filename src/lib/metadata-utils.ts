import type { PhotoMetadata, MetadataParseResult, JsonValue } from '@/types/database';

// Validation error types for better error handling
interface ValidationError {
  field: string;
  expected: string;
  received: string;
}

/**
 * Validates a nested object structure with detailed error reporting
 */
function validateNestedObject(
  obj: Record<string, unknown>,
  field: string,
  validators: Record<string, (value: unknown) => boolean>
): ValidationError[] {
  const errors: ValidationError[] = [];
  
  if (typeof obj[field] !== 'object' || Array.isArray(obj[field]) || obj[field] === null) {
    errors.push({
      field,
      expected: 'object',
      received: Array.isArray(obj[field]) ? 'array' : typeof obj[field]
    });
    return errors;
  }

  const nested = obj[field] as Record<string, unknown>;
  for (const [key, validator] of Object.entries(validators)) {
    if (nested[key] !== undefined && !validator(nested[key])) {
      errors.push({
        field: `${field}.${key}`,
        expected: 'valid type',
        received: typeof nested[key]
      });
    }
  }

  return errors;
}

/**
 * Type guard to check if a JsonValue is valid PhotoMetadata with detailed validation
 */
export function isPhotoMetadata(value: unknown): value is PhotoMetadata {
  const errors = validatePhotoMetadata(value);
  return errors.length === 0;
}

/**
 * Validates PhotoMetadata structure and returns detailed errors
 */
export function validatePhotoMetadata(value: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    errors.push({
      field: 'root',
      expected: 'object',
      received: Array.isArray(value) ? 'array' : typeof value
    });
    return errors;
  }

  const obj = value as Record<string, unknown>;
  
  // Validate optional string properties
  const stringFields = ['location', 'equipment', 'shootDate', 'format'] as const;
  for (const field of stringFields) {
    if (obj[field] !== undefined && typeof obj[field] !== 'string') {
      errors.push({
        field,
        expected: 'string',
        received: typeof obj[field]
      });
    }
  }

  // Validate optional number properties
  if (obj.fileSize !== undefined && typeof obj.fileSize !== 'number') {
    errors.push({
      field: 'fileSize',
      expected: 'number',
      received: typeof obj.fileSize
    });
  }
  
  // Validate nested objects
  if (obj.settings !== undefined) {
    errors.push(...validateNestedObject(obj, 'settings', {
      iso: (v) => typeof v === 'number' && v > 0,
      aperture: (v) => typeof v === 'string' && v.length > 0,
      shutterSpeed: (v) => typeof v === 'string' && v.length > 0,
      focalLength: (v) => typeof v === 'string' && v.length > 0
    }));
  }

  if (obj.gps !== undefined) {
    errors.push(...validateNestedObject(obj, 'gps', {
      latitude: (v) => typeof v === 'number' && v >= -90 && v <= 90,
      longitude: (v) => typeof v === 'number' && v >= -180 && v <= 180
    }));
  }

  if (obj.dimensions !== undefined) {
    errors.push(...validateNestedObject(obj, 'dimensions', {
      width: (v) => typeof v === 'number' && v > 0,
      height: (v) => typeof v === 'number' && v > 0
    }));
  }

  if (obj.camera !== undefined) {
    errors.push(...validateNestedObject(obj, 'camera', {
      make: (v) => typeof v === 'string',
      model: (v) => typeof v === 'string',
      lens: (v) => typeof v === 'string'
    }));
  }

  if (obj.processing !== undefined) {
    errors.push(...validateNestedObject(obj, 'processing', {
      software: (v) => typeof v === 'string',
      version: (v) => typeof v === 'string',
      colorSpace: (v) => typeof v === 'string'
    }));
  }

  // Validate tags array
  if (obj.tags !== undefined) {
    if (!Array.isArray(obj.tags)) {
      errors.push({
        field: 'tags',
        expected: 'array',
        received: typeof obj.tags
      });
    } else if (!obj.tags.every(tag => typeof tag === 'string')) {
      errors.push({
        field: 'tags',
        expected: 'array of strings',
        received: 'array with non-string elements'
      });
    }
  }

  return errors;
}

/**
 * Safely parse JsonValue to PhotoMetadata
 */
export function parsePhotoMetadata(value: unknown): PhotoMetadata | null {
  if (!value) return null;
  
  if (isPhotoMetadata(value)) {
    return value;
  }
  
  console.warn('Invalid photo metadata format:', value);
  return null;
}

/**
 * Parse metadata with detailed error information
 */
export function parsePhotoMetadataWithResult(value: unknown): MetadataParseResult {
  if (!value) {
    return { success: false, error: 'No metadata provided', rawData: value };
  }
  
  const validationErrors = validatePhotoMetadata(value);
  if (validationErrors.length === 0) {
    return { success: true, metadata: value as PhotoMetadata };
  }
  
  const errorMessage = validationErrors
    .map(err => `${err.field}: expected ${err.expected}, got ${err.received}`)
    .join('; ');
  
  return { 
    success: false, 
    error: `Invalid metadata format: ${errorMessage}`, 
    rawData: value 
  };
}

/**
 * Convert PhotoMetadata to JsonValue for database storage
 * Uses structuredClone for better performance when available, falls back to JSON methods
 */
export function serializePhotoMetadata(metadata: PhotoMetadata): JsonValue {
  try {
    // Use structuredClone if available (Node 17+, modern browsers)
    if (typeof structuredClone !== 'undefined') {
      return structuredClone(metadata as Record<string, unknown>) as JsonValue;
    }
    
    // Fallback to JSON serialization
    return JSON.parse(JSON.stringify(metadata)) as JsonValue;
  } catch (error) {
    console.error('Failed to serialize photo metadata:', error);
    throw new Error('Invalid metadata structure for serialization');
  }
}

/**
 * Create default PhotoMetadata structure
 */
export function createDefaultPhotoMetadata(overrides: Partial<PhotoMetadata> = {}): PhotoMetadata {
  const defaults: PhotoMetadata = {
    shootDate: new Date().toISOString(),
    tags: []
  };

  // Simple merge for development - can be enhanced later
  return { ...defaults, ...overrides };
}

/**
 * Deep merge two PhotoMetadata objects, handling nested structures
 */
function deepMergeMetadata(target: PhotoMetadata, source: Partial<PhotoMetadata>): PhotoMetadata {
  const result = { ...target };

  for (const key in source) {
    const sourceValue = source[key as keyof PhotoMetadata];
    if (sourceValue === undefined) continue;

    // Handle nested objects with proper type safety
    if (key === 'settings' && sourceValue && typeof sourceValue === 'object') {
      result.settings = { ...target.settings, ...sourceValue };
    } else if (key === 'gps' && sourceValue && typeof sourceValue === 'object') {
      result.gps = { ...target.gps, ...sourceValue } as any;
    } else if (key === 'dimensions' && sourceValue && typeof sourceValue === 'object') {
      result.dimensions = { ...target.dimensions, ...sourceValue } as any;
    } else if (key === 'camera' && sourceValue && typeof sourceValue === 'object') {
      result.camera = { ...target.camera, ...sourceValue };
    } else if (key === 'processing' && sourceValue && typeof sourceValue === 'object') {
      result.processing = { ...target.processing, ...sourceValue };
    } else {
      // Type-safe assignment for primitive values
      (result as Record<string, unknown>)[key] = sourceValue;
    }
  }

  return result;
}

/**
 * Extract EXIF-like data from PhotoMetadata for display
 */
export function extractDisplayMetadata(metadata: PhotoMetadata | null): Record<string, string> {
  if (!metadata) return {};

  const display: Record<string, string> = {};

  // Basic information
  if (metadata.location) display['Location'] = metadata.location;
  if (metadata.equipment) display['Equipment'] = metadata.equipment;
  if (metadata.shootDate) {
    const date = new Date(metadata.shootDate);
    display['Date'] = date.toLocaleDateString();
  }

  // Camera settings
  if (metadata.settings) {
    const { iso, aperture, shutterSpeed, focalLength } = metadata.settings;
    if (iso) display['ISO'] = iso.toString();
    if (aperture) display['Aperture'] = aperture;
    if (shutterSpeed) display['Shutter Speed'] = shutterSpeed;
    if (focalLength) display['Focal Length'] = focalLength;
  }

  // Camera information
  if (metadata.camera) {
    const { make, model, lens } = metadata.camera;
    if (make && model) display['Camera'] = `${make} ${model}`;
    if (lens) display['Lens'] = lens;
  }

  // Image properties
  if (metadata.dimensions) {
    const { width, height } = metadata.dimensions;
    if (width && height) {
      display['Dimensions'] = `${width} × ${height}`;
      display['Megapixels'] = ((width * height) / 1000000).toFixed(1) + ' MP';
    }
  }

  if (metadata.fileSize) {
    display['File Size'] = formatFileSize(metadata.fileSize);
  }

  if (metadata.format) display['Format'] = metadata.format.toUpperCase();

  // GPS coordinates (formatted for privacy)
  if (metadata.gps) {
    const { latitude, longitude } = metadata.gps;
    display['Coordinates'] = `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
  }

  return display;
}

/**
 * Format file size in human-readable format
 */
function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}