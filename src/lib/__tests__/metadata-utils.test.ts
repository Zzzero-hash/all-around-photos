import {
  isPhotoMetadata,
  validatePhotoMetadata,
  parsePhotoMetadata,
  parsePhotoMetadataWithResult,
  serializePhotoMetadata,
  createDefaultPhotoMetadata,
  extractDisplayMetadata
} from '../metadata-utils';
import type { PhotoMetadata } from '@/types/database';

describe('metadata-utils', () => {
  const validMetadata: PhotoMetadata = {
    location: 'Downtown Office Building',
    equipment: 'DJI Mavic 3',
    shootDate: '2024-01-15T10:30:00Z',
    settings: {
      iso: 200,
      aperture: 'f/2.8',
      shutterSpeed: '1/120',
      focalLength: '24mm'
    },
    gps: {
      latitude: 40.7128,
      longitude: -74.0060
    },
    dimensions: {
      width: 4000,
      height: 3000
    },
    fileSize: 2048000,
    format: 'jpeg',
    tags: ['commercial', 'inspection', 'roof']
  };

  describe('isPhotoMetadata', () => {
    it('should validate correct metadata', () => {
      expect(isPhotoMetadata(validMetadata)).toBe(true);
    });

    it('should reject invalid metadata', () => {
      expect(isPhotoMetadata(null)).toBe(false);
      expect(isPhotoMetadata('string')).toBe(false);
      expect(isPhotoMetadata([])).toBe(false);
      expect(isPhotoMetadata({ location: 123 })).toBe(false);
    });
  });

  describe('validatePhotoMetadata', () => {
    it('should return no errors for valid metadata', () => {
      const errors = validatePhotoMetadata(validMetadata);
      expect(errors).toHaveLength(0);
    });

    it('should return detailed errors for invalid metadata', () => {
      const invalidMetadata = {
        location: 123, // should be string
        settings: {
          iso: 'invalid' // should be number
        }
      };

      const errors = validatePhotoMetadata(invalidMetadata);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'location')).toBe(true);
      expect(errors.some(e => e.field === 'settings.iso')).toBe(true);
    });
  });

  describe('parsePhotoMetadataWithResult', () => {
    it('should parse valid metadata successfully', () => {
      const result = parsePhotoMetadataWithResult(validMetadata);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.metadata).toEqual(validMetadata);
      }
    });

    it('should provide detailed error messages', () => {
      const result = parsePhotoMetadataWithResult({ location: 123 });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('location: expected string, got number');
      }
    });
  });

  describe('createDefaultPhotoMetadata', () => {
    it('should create valid default metadata', () => {
      const defaults = createDefaultPhotoMetadata();
      expect(isPhotoMetadata(defaults)).toBe(true);
      expect(defaults.settings?.iso).toBe(100);
    });

    it('should merge overrides correctly', () => {
      const overrides = {
        location: 'Test Location',
        settings: { iso: 400 }
      };
      const result = createDefaultPhotoMetadata(overrides);
      
      expect(result.location).toBe('Test Location');
      expect(result.settings?.iso).toBe(400);
      expect(result.settings?.aperture).toBe('f/2.8'); // Should keep default
    });
  });

  describe('extractDisplayMetadata', () => {
    it('should extract display-friendly metadata', () => {
      const display = extractDisplayMetadata(validMetadata);
      
      expect(display['Location']).toBe('Downtown Office Building');
      expect(display['Equipment']).toBe('DJI Mavic 3');
      expect(display['ISO']).toBe('200');
      expect(display['Dimensions']).toBe('4000 × 3000');
      expect(display['File Size']).toBe('2.0 MB');
      expect(display['Format']).toBe('JPEG');
    });

    it('should handle null metadata', () => {
      const display = extractDisplayMetadata(null);
      expect(display).toEqual({});
    });
  });

  describe('serializePhotoMetadata', () => {
    it('should serialize metadata for database storage', () => {
      const serialized = serializePhotoMetadata(validMetadata);
      expect(typeof serialized).toBe('object');
      expect(serialized).not.toBe(validMetadata); // Should be a copy
    });
  });
});