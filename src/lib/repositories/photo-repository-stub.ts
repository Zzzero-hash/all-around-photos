// Stub version of photo repository for development without database
import type { Photo, PhotoCategory } from '@/types/database';
import { createDefaultPhotoMetadata } from '../metadata-utils-stub';

/**
 * Mock photo data for development
 */
const mockPhotos: Photo[] = [
  {
    id: '1',
    filename: 'commercial-building-001.jpg',
    title: 'Downtown Office Complex',
    description: 'Aerial view of modern office building',
    category: 'COMMERCIAL' as PhotoCategory,
    isPublic: true,
    storageUrl: 'https://images.unsplash.com/photo-156051883-ce09059eeffa?w=1200&h=800&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&q=50',
    watermarkUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop&q=80',
    price: 25.00,
    metadata: createDefaultPhotoMetadata({
      location: 'Downtown Business District',
      equipment: 'DJI Mavic 3',
      dimensions: { width: 4000, height: 3000 },
      tags: ['commercial', 'office', 'aerial']
    }),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    filename: 'residential-home-001.jpg',
    title: 'Luxury Home Inspection',
    description: 'Comprehensive roof and property inspection',
    category: 'RESIDENTIAL' as PhotoCategory,
    isPublic: true,
    storageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&q=50',
    watermarkUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=80',
    price: 15.00,
    metadata: createDefaultPhotoMetadata({
      location: 'Suburban Neighborhood',
      equipment: 'DJI Mini 3 Pro',
      dimensions: { width: 3840, height: 2160 },
      tags: ['residential', 'inspection', 'roof']
    }),
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
];

/**
 * Development photo repository stub
 */
export class PhotoRepositoryStub {
  async getAllPublicPhotos(): Promise<Photo[]> {
    return mockPhotos.filter(photo => photo.isPublic);
  }

  async getPhotosByCategory(category: PhotoCategory): Promise<Photo[]> {
    return mockPhotos.filter(photo => photo.category === category && photo.isPublic);
  }

  async getPhotoById(id: string): Promise<Photo | null> {
    return mockPhotos.find(photo => photo.id === id) || null;
  }

  async searchPhotos(query: string): Promise<Photo[]> {
    const searchTerm = query.toLowerCase();
    return mockPhotos.filter(photo => 
      photo.title?.toLowerCase().includes(searchTerm) ||
      photo.description?.toLowerCase().includes(searchTerm) ||
      photo.metadata?.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
}

// Export singleton instance for development
export const photoRepository = new PhotoRepositoryStub();
