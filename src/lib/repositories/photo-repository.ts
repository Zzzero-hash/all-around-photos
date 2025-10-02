import { Photo, PhotoCategory } from '@prisma/client';
import { mockPhotos } from '@/lib/mock-data';

export interface PhotoFilters {
  category?: PhotoCategory | 'ALL';
  isPublic?: boolean;
  limit?: number;
  offset?: number;
}

export interface PhotoRepository {
  getPhotos(filters?: PhotoFilters): Promise<Photo[]>;
  getPhotoById(id: string): Promise<Photo | null>;
  getPhotoCounts(): Promise<Record<PhotoCategory | 'ALL', number>>;
}

// Mock implementation - replace with real database calls later
export class MockPhotoRepository implements PhotoRepository {
  async getPhotos(filters: PhotoFilters = {}): Promise<Photo[]> {
    let photos = mockPhotos;

    // Apply filters
    if (filters.isPublic !== undefined) {
      photos = photos.filter(photo => photo.isPublic === filters.isPublic);
    }

    if (filters.category && filters.category !== 'ALL') {
      photos = photos.filter(photo => photo.category === filters.category);
    }

    // Apply pagination
    if (filters.offset) {
      photos = photos.slice(filters.offset);
    }

    if (filters.limit) {
      photos = photos.slice(0, filters.limit);
    }

    // Simulate async operation
    return new Promise(resolve => {
      setTimeout(() => resolve(photos), 100);
    });
  }

  async getPhotoById(id: string): Promise<Photo | null> {
    const photo = mockPhotos.find(p => p.id === id);
    return new Promise(resolve => {
      setTimeout(() => resolve(photo || null), 50);
    });
  }

  async getPhotoCounts(): Promise<Record<PhotoCategory | 'ALL', number>> {
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

    return new Promise(resolve => {
      setTimeout(() => resolve(counts), 50);
    });
  }
}

// Export singleton instance
export const photoRepository = new MockPhotoRepository();