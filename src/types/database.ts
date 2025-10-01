// Database model interfaces matching Prisma schema
import type { 
  Role as PrismaRole, 
  PhotoCategory as PrismaPhotoCategory, 
  OrderStatus as PrismaOrderStatus, 
  ServiceCategory as PrismaServiceCategory 
} from '@prisma/client';

// JsonValue type for Prisma compatibility
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

export interface User {
  id: string;
  email: string;
  name: string;
  role: PrismaRole;
  createdAt: Date;
  updatedAt: Date;
  clientGalleries?: ClientGallery[];
  orders?: Order[];
}

export interface Photo {
  id: string;
  filename: string;
  title?: string | null;
  description?: string | null;
  category: PrismaPhotoCategory;
  isPublic: boolean;
  storageUrl: string;
  thumbnailUrl: string;
  watermarkUrl?: string | null;
  price: number;
  metadata?: PhotoMetadata | null; // Properly typed metadata with JsonValue compatibility
  createdAt: Date;
  updatedAt: Date;
  clientGalleries?: ClientGalleryPhoto[];
  orderPhotos?: OrderPhoto[];
}

export interface ClientGallery {
  id: string;
  name: string;
  accessCode: string;
  expiresAt?: Date | null;
  isActive: boolean;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
  client?: User;
  photos?: ClientGalleryPhoto[];
  orders?: Order[];
}

export interface ClientGalleryPhoto {
  id: string;
  galleryId: string;
  photoId: string;
  gallery?: ClientGallery;
  photo?: Photo;
}

export interface Order {
  id: string;
  clientId: string;
  galleryId: string;
  totalAmount: number;
  status: PrismaOrderStatus;
  stripePaymentId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  client?: User;
  gallery?: ClientGallery;
  photos?: OrderPhoto[];
  downloadLinks?: DownloadLink[];
}

export interface OrderPhoto {
  id: string;
  orderId: string;
  photoId: string;
  price: number;
  order?: Order;
  photo?: Photo;
}

export interface DownloadLink {
  id: string;
  orderId: string;
  photoId: string;
  url: string;
  expiresAt: Date;
  createdAt: Date;
  order?: Order;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: PrismaServiceCategory;
  basePrice: number;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Re-export Prisma enums for consistency
export { 
  Role, 
  PhotoCategory, 
  OrderStatus, 
  ServiceCategory 
} from '@prisma/client';

// Complete photo metadata structure for database storage
// Must be compatible with Prisma's JsonValue type
export interface PhotoMetadata {
  location?: string;
  equipment?: string;
  shootDate?: string; // Store as ISO string for JSON compatibility
  settings?: {
    iso?: number;
    aperture?: string;
    shutterSpeed?: string;
    focalLength?: string;
  };
  gps?: {
    latitude: number;
    longitude: number;
  };
  dimensions?: {
    width: number;
    height: number;
  };
  fileSize?: number;
  format?: string;
  tags?: string[];
  // Additional EXIF data that might be extracted
  camera?: {
    make?: string;
    model?: string;
    lens?: string;
  };
  processing?: {
    software?: string;
    version?: string;
    colorSpace?: string;
  };
}

// Utility types for API responses
export type UserWithRelations = User & {
  clientGalleries: ClientGallery[];
  orders: Order[];
};

export type PhotoWithRelations = Photo & {
  clientGalleries: ClientGalleryPhoto[];
  orderPhotos: OrderPhoto[];
};

export type ClientGalleryWithRelations = ClientGallery & {
  client: User;
  photos: (ClientGalleryPhoto & { photo: Photo })[];
  orders: Order[];
};

export type OrderWithRelations = Order & {
  client: User;
  gallery: ClientGallery;
  photos: (OrderPhoto & { photo: Photo })[];
  downloadLinks: DownloadLink[];
};

// API Response types for better error handling
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Database operation result types
export type DatabaseResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// Photo metadata parsing result
export type MetadataParseResult = 
  | { success: true; metadata: PhotoMetadata }
  | { success: false; error: string; rawData: unknown };

// Type assertion utilities for JsonValue metadata
export type PhotoMetadataJson = JsonValue & PhotoMetadata;

// Helper to safely cast JsonValue to PhotoMetadata
export function assertPhotoMetadata(value: JsonValue): PhotoMetadata | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  return value as PhotoMetadata;
}

// Helper to safely serialize PhotoMetadata to JsonValue
export function toJsonValue(metadata: PhotoMetadata): JsonValue {
  return metadata as JsonValue;
}