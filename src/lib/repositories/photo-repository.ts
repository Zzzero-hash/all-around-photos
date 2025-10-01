import { prisma } from '@/lib/prisma';
import { parsePhotoMetadata, serializePhotoMetadata } from '@/lib/metadata-utils';
import type { 
  Photo, 
  PhotoWithRelations, 
  PhotoMetadata 
} from '@/types/database';
import type { 
  CreatePhotoInput, 
  UpdatePhotoInput, 
  PhotoFilterInput 
} from '@/lib/validations';
import { Prisma, PhotoCategory } from '@prisma/client';

export class PhotoRepository {
  /**
   * Create a new photo with type-safe metadata handling
   */
  async create(data: CreatePhotoInput): Promise<Photo> {
    try {
      const photoData: Prisma.PhotoCreateInput = {
        ...data,
        metadata: data.metadata as any,
      };

      const photo = await prisma.photo.create({
        data: photoData,
      });

      return this.transformPhoto(photo);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('metadata') || error.message.includes('serialization')) {
          throw new Error(`Failed to create photo: Invalid metadata format - ${error.message}`);
        }
        if (error.message.includes('Unique constraint')) {
          throw new Error('Photo with this filename already exists');
        }
      }
      throw error;
    }
  }

  /**
   * Update an existing photo
   */
  async update(id: string, data: Partial<UpdatePhotoInput>): Promise<Photo | null> {
    try {
      const updateData: Prisma.PhotoUpdateInput = {
        ...data,
        metadata: data.metadata as any,
      };

      const photo = await prisma.photo.update({
        where: { id },
        data: updateData,
      });

      return this.transformPhoto(photo);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return null; // Photo not found
        }
        if (error.code === 'P2002') {
          throw new Error('Photo with this filename already exists');
        }
      }
      if (error instanceof Error && (error.message.includes('metadata') || error.message.includes('serialization'))) {
        throw new Error(`Failed to update photo: Invalid metadata format - ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Find photo by ID with relations
   */
  async findById(id: string, includeRelations = false): Promise<PhotoWithRelations | null> {
    const photo = await prisma.photo.findUnique({
      where: { id },
      include: includeRelations ? {
        clientGalleries: {
          include: {
            gallery: true,
          },
        },
        orderPhotos: {
          include: {
            order: true,
          },
        },
      } : undefined,
    });

    if (!photo) return null;

    return this.transformPhoto(photo) as PhotoWithRelations;
  }

  /**
   * Find photos with filtering and pagination
   */
  async findMany(query: PhotoFilterInput): Promise<Photo[]> {
    const where: Prisma.PhotoWhereInput = {
      ...(query.category && { category: query.category }),
      ...(query.isPublic !== undefined && { isPublic: query.isPublic }),
      ...(query.search && {
        OR: [
          { title: { contains: query.search, mode: 'insensitive' } },
          { description: { contains: query.search, mode: 'insensitive' } },
          { filename: { contains: query.search, mode: 'insensitive' } }
        ]
      }),
    };

    const skip = (query.page - 1) * query.limit;

    const photos = await prisma.photo.findMany({
      where,
      take: query.limit,
      skip,
      orderBy: { createdAt: 'desc' },
    });

    return photos.map(photo => this.transformPhoto(photo));
  }

  /**
   * Get public photos for gallery display
   */
  async findPublicPhotos(category?: PhotoCategory, limit = 20): Promise<Photo[]> {
    const where: Prisma.PhotoWhereInput = {
      isPublic: true,
      ...(category && { category }),
    };

    const photos = await prisma.photo.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return photos.map(photo => this.transformPhoto(photo));
  }

  /**
   * Delete a photo
   */
  async delete(id: string): Promise<boolean> {
    try {
      await prisma.photo.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  }

  /**
   * Transform Prisma photo to our Photo type with parsed metadata
   */
  private transformPhoto(photo: Prisma.PhotoGetPayload<{}>): Photo {
    return {
      ...photo,
      metadata: parsePhotoMetadata(photo.metadata),
    };
  }

  /**
   * Get photo statistics
   */
  async getStats() {
    const [total, publicCount, categories] = await Promise.all([
      prisma.photo.count(),
      prisma.photo.count({ where: { isPublic: true } }),
      prisma.photo.groupBy({
        by: ['category'],
        _count: { category: true },
      }),
    ]);

    return {
      total,
      publicCount,
      privateCount: total - publicCount,
      byCategory: categories.reduce((acc, item) => {
        acc[item.category] = item._count.category;
        return acc;
      }, {} as Record<string, number>),
    };
  }
}

// Export singleton instance
export const photoRepository = new PhotoRepository();