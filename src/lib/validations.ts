import { z } from 'zod';
import { Role, PhotoCategory, OrderStatus, ServiceCategory } from '@prisma/client';

// User validation schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  role: z.nativeEnum(Role).optional().default(Role.CLIENT)
});

export const updateUserSchema = createUserSchema.partial();

// Photo validation schemas
export const photoMetadataSchema = z.object({
  location: z.string().optional(),
  equipment: z.string().optional(),
  settings: z.object({
    iso: z.number().optional(),
    aperture: z.string().optional(),
    shutterSpeed: z.string().optional(),
    focalLength: z.string().optional()
  }).optional(),
  gps: z.object({
    latitude: z.number(),
    longitude: z.number()
  }).optional(),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive()
  }).optional(),
  fileSize: z.number().positive().optional(),
  format: z.string().optional()
}).optional();

export const createPhotoSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  title: z.string().max(200, 'Title too long').optional(),
  description: z.string().max(1000, 'Description too long').optional(),
  category: z.nativeEnum(PhotoCategory),
  isPublic: z.boolean().optional().default(false),
  storageUrl: z.string().url('Invalid storage URL'),
  thumbnailUrl: z.string().url('Invalid thumbnail URL'),
  watermarkUrl: z.string().url('Invalid watermark URL').optional(),
  price: z.number().min(0, 'Price cannot be negative').optional().default(0),
  metadata: photoMetadataSchema
});

export const updatePhotoSchema = createPhotoSchema.partial();

// Client Gallery validation schemas
export const createClientGallerySchema = z.object({
  name: z.string().min(1, 'Gallery name is required').max(100, 'Name too long'),
  accessCode: z.string().min(6, 'Access code must be at least 6 characters').max(20, 'Access code too long'),
  clientId: z.string().cuid('Invalid client ID'),
  expiresAt: z.date().optional(),
  photoIds: z.array(z.string().cuid('Invalid photo ID')).optional()
});

export const accessGallerySchema = z.object({
  accessCode: z.string().min(6, 'Access code must be at least 6 characters')
});

// Order validation schemas
export const createOrderSchema = z.object({
  clientId: z.string().cuid('Invalid client ID'),
  galleryId: z.string().cuid('Invalid gallery ID'),
  photoIds: z.array(z.string().cuid('Invalid photo ID')).min(1, 'At least one photo must be selected'),
  totalAmount: z.number().positive('Total amount must be positive'),
  stripePaymentId: z.string().optional()
});

export const updateOrderStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  stripePaymentId: z.string().optional()
});

// Service validation schemas
export const createServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required').max(100, 'Name too long'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description too long'),
  category: z.nativeEnum(ServiceCategory),
  basePrice: z.number().min(0, 'Price cannot be negative'),
  features: z.array(z.string().min(1, 'Feature cannot be empty')).min(1, 'At least one feature is required'),
  isActive: z.boolean().optional().default(true)
});

export const updateServiceSchema = createServiceSchema.partial();

// Download Link validation schemas
export const createDownloadLinkSchema = z.object({
  orderId: z.string().cuid('Invalid order ID'),
  photoId: z.string().cuid('Invalid photo ID'),
  url: z.string().url('Invalid download URL'),
  expiresAt: z.date().min(new Date(), 'Expiration date must be in the future')
});

// Query validation schemas
export const paginationSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20)
});

export const photoFilterSchema = z.object({
  category: z.nativeEnum(PhotoCategory).optional(),
  isPublic: z.boolean().optional(),
  search: z.string().max(100).optional()
}).merge(paginationSchema);

export const serviceFilterSchema = z.object({
  category: z.nativeEnum(ServiceCategory).optional(),
  isActive: z.boolean().optional(),
  search: z.string().max(100).optional()
}).merge(paginationSchema);

// Type exports for use in API routes
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreatePhotoInput = z.infer<typeof createPhotoSchema>;
export type UpdatePhotoInput = z.infer<typeof updatePhotoSchema>;
export type CreateClientGalleryInput = z.infer<typeof createClientGallerySchema>;
export type AccessGalleryInput = z.infer<typeof accessGallerySchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type CreateDownloadLinkInput = z.infer<typeof createDownloadLinkSchema>;
export type PhotoFilterInput = z.infer<typeof photoFilterSchema>;
export type ServiceFilterInput = z.infer<typeof serviceFilterSchema>;