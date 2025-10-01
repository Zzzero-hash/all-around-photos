// Main database configuration and exports
export { prisma } from './prisma';
export * from './db-utils';
export * from './validations';
export * from './repositories';

// Re-export Prisma types for convenience
export type {
  User,
  Photo,
  ClientGallery,
  Order,
  Service,
  Role,
  PhotoCategory,
  OrderStatus,
  ServiceCategory
} from '@prisma/client';

// Re-export our custom types
export type {
  UserWithRelations,
  PhotoWithRelations,
  ClientGalleryWithRelations,
  OrderWithRelations,
  PhotoMetadata
} from '@/types/database';