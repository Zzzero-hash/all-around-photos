import { z } from 'zod';
import { PhotoCategory } from '@prisma/client';

// Photo metadata validation schema
export const photoMetadataSchema = z.object({
  location: z.string().optional(),
  equipment: z.string().optional(),
  shootDate: z.string().datetime().optional(),
  settings: z.object({
    iso: z.number().int().min(50).max(25600).optional(),
    aperture: z.string().regex(/^f\/\d+(\.\d+)?$/).optional(),
    shutterSpeed: z.string().regex(/^1\/\d+$|^\d+(\.\d+)?s?$/).optional(),
    focalLength: z.string().regex(/^\d+(\.\d+)?mm$/).optional(),
  }).optional(),
  gps: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }).optional(),
  dimensions: z.object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }).optional(),
  fileSize: z.number().int().positive().optional(),
  format: z.enum(['JPEG', 'PNG', 'RAW', 'TIFF', 'WebP']).optional(),
  tags: z.array(z.string().min(1).max(50)).max(20).optional(),
}).strict();

// Photo creation/update schemas
export const createPhotoSchema = z.object({
  filename: z.string().min(1).max(255),
  title: z.string().max(255).optional(),
  description: z.string().max(1000).optional(),
  category: z.nativeEnum(PhotoCategory),
  isPublic: z.boolean().default(false),
  storageUrl: z.string().url(),
  thumbnailUrl: z.string().url(),
  watermarkUrl: z.string().url().optional(),
  price: z.number().min(0).max(10000),
  metadata: photoMetadataSchema.optional(),
});

export const updatePhotoSchema = createPhotoSchema.partial().extend({
  id: z.string().cuid(),
});

// Photo query schemas
export const photoQuerySchema = z.object({
  category: z.nativeEnum(PhotoCategory).optional(),
  isPublic: z.boolean().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

export type PhotoMetadataInput = z.infer<typeof photoMetadataSchema>;
export type CreatePhotoInput = z.infer<typeof createPhotoSchema>;
export type UpdatePhotoInput = z.infer<typeof updatePhotoSchema>;
export type PhotoQueryInput = z.infer<typeof photoQuerySchema>;