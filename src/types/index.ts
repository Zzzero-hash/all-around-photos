// Core application types - simplified interfaces for UI components and API responses
// For database operations, use types from @/types/database

// Import enums from database types for consistency
import type { Role, PhotoCategory, OrderStatus, ServiceCategory } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Photo {
  id: string;
  filename: string;
  title?: string;
  description?: string;
  category: PhotoCategory;
  isPublic: boolean;
  metadata?: PhotoMetadata | null;
  storageUrl: string;
  thumbnailUrl: string;
  watermarkUrl?: string;
  price: number;
  createdAt: Date;
}

// Import the complete PhotoMetadata from database types
import type { PhotoMetadata } from '@/types/database';

// Display-specific metadata type for UI components
export interface PhotoMetadataDisplay {
  location?: string;
  equipment?: string;
  shootDate?: string; // ISO string for display
  tags?: string[];
  dimensions?: string; // Formatted as "width × height"
  fileSize?: string; // Formatted as "1.2 MB"
  format?: string;
}

export interface ClientGallery {
  id: string;
  name: string;
  accessCode: string;
  expiresAt?: Date;
  isActive: boolean;
  clientId: string;
  photos: Photo[];
  createdAt: Date;
}

// Order interface moved to database.ts to avoid duplication
// Import Order types from database.ts when needed:
// import type { Order, OrderWithRelations } from '@/types/database';

export interface DownloadLink {
  id: string;
  photoId: string;
  url: string;
  expiresAt: Date;
  downloadCount: number;
  maxDownloads: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  basePrice: number;
  features: string[];
  isActive: boolean;
}

// Quote request status enum
export enum QuoteStatus {
  NEW = 'NEW',
  REVIEWED = 'REVIEWED',
  QUOTED = 'QUOTED',
  CLOSED = 'CLOSED'
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  projectDescription: string;
  location: string;
  timeline: string;
  budget?: string;
  createdAt: Date;
  status: QuoteStatus;
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface GalleryFilterProps {
  categories: PhotoCategory[];
  selectedCategory: PhotoCategory | 'ALL';
  onCategoryChange: (category: PhotoCategory | 'ALL') => void;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
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

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}
