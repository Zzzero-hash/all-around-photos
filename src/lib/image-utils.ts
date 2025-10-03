// Utility functions for handling images in the application
import { Photo } from '@/types/database';

/**
 * Generate a proper image URL for a photo
 * Uses the storageUrl from the photo object, with fallback to placeholder
 */
export function getImageUrl(photo: Photo): string {
  // If the photo has a storageUrl (from database), use it
  if (photo.storageUrl) {
    return photo.storageUrl;
  }
  
  // If no storageUrl, try thumbnailUrl
  if (photo.thumbnailUrl) {
    return photo.thumbnailUrl;
  }
  
  // Fallback to a placeholder based on category
  return getPlaceholderImageUrl(photo.category);
}

/**
 * Generate a thumbnail URL for a photo
 * Uses the thumbnailUrl from the photo object, with fallback to main image
 */
export function getThumbnailUrl(photo: Photo): string {
  // If the photo has a thumbnailUrl, use it
  if (photo.thumbnailUrl) {
    return photo.thumbnailUrl;
  }
  
  // Fallback to main storageUrl
  if (photo.storageUrl) {
    return photo.storageUrl;
  }
  
  // Final fallback to placeholder
 return getPlaceholderImageUrl(photo.category);
}

/**
 * Generate a placeholder image URL based on category
 * This creates a data URL with a colored background and category text
 */
export function getPlaceholderImageUrl(category: string): string {
  const colors = {
    COMMERCIAL: '#1e40af', // primary-600
    RESIDENTIAL: '#0ea5e9', // secondary-500
    REAL_ESTATE: '#f97316', // accent-500
    EVENT: '#10b981', // success-500
    OTHER: '#64748b', // neutral-500
    COMMERCIAL_INSPECTION: '#8b5cf6', // purple-500
    RESIDENTIAL_INSPECTION: '#ec4899', // pink-500
  };

  const color = colors[category as keyof typeof colors] || colors.OTHER;
  
  // Create SVG placeholder
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dy=".3em">
        ${category.replace('_', ' ').toUpperCase()}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Check if an image URL is a placeholder
 */
export function isPlaceholderImage(url: string): boolean {
  return url.startsWith('data:image/svg+xml;base64,');
}

/**
 * Get image dimensions from photo metadata or return defaults
 */
export function getImageDimensions(photo: Photo): { width: number; height: number } {
   // Try to get dimensions from metadata
  if (photo.metadata && typeof photo.metadata === 'object') {
    const metadata = photo.metadata as Record<string, unknown>;
    if (metadata.technical && typeof metadata.technical === 'object' && metadata.technical !== null) {
      const technical = metadata.technical as Record<string, unknown>;
      if (technical.resolution && typeof technical.resolution === 'string') {
        // Parse resolution like "5472x3648"
        const [width, height] = technical.resolution.split('x').map(Number);
        if (width && height) {
          return { width, height };
        }
      }
    }
  }
  
 // Return default dimensions based on category
 const defaults = {
    COMMERCIAL: { width: 1920, height: 1080 },
    RESIDENTIAL: { width: 1200, height: 800 },
    REAL_ESTATE: { width: 1600, height: 1200 },
    EVENT: { width: 140, height: 1050 },
    OTHER: { width: 800, height: 600 },
    COMMERCIAL_INSPECTION: { width: 1920, height: 1080 },
    RESIDENTIAL_INSPECTION: { width: 1200, height: 800 },
  };

  return defaults[photo.category as keyof typeof defaults] || { width: 800, height: 600 };
}
