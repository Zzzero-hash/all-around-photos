import { prisma } from './prisma';
import { PhotoCategory, ServiceCategory, OrderStatus, Role } from '@prisma/client';
import type { 
  User, 
  Photo, 
  ClientGallery, 
  Order, 
  Service,
  UserWithRelations,
  PhotoWithRelations,
  ClientGalleryWithRelations,
  OrderWithRelations
} from '@/types/database';

// User operations
export async function createUser(data: {
  email: string;
  name: string;
  role?: Role;
}) {
  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      role: data.role || Role.CLIENT
    }
  });
}

export async function getUserByEmail(email: string): Promise<UserWithRelations | null> {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      clientGalleries: true,
      orders: true
    }
  }) as UserWithRelations | null;
}

export async function getUserById(id: string): Promise<UserWithRelations | null> {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      clientGalleries: true,
      orders: true
    }
  }) as UserWithRelations | null;
}

// Photo operations
export async function createPhoto(data: {
  filename: string;
  title?: string;
  description?: string;
  category: PhotoCategory;
  isPublic?: boolean;
  storageUrl: string;
  thumbnailUrl: string;
  watermarkUrl?: string;
  price?: number;
  metadata?: any;
}) {
  return await prisma.photo.create({
    data: {
      filename: data.filename,
      title: data.title,
      description: data.description,
      category: data.category,
      isPublic: data.isPublic || false,
      storageUrl: data.storageUrl,
      thumbnailUrl: data.thumbnailUrl,
      watermarkUrl: data.watermarkUrl,
      price: data.price || 0,
      metadata: data.metadata
    }
  });
}

export async function getPublicPhotos(category?: PhotoCategory): Promise<Photo[]> {
  return await prisma.photo.findMany({
    where: {
      isPublic: true,
      ...(category && { category })
    },
    orderBy: {
      createdAt: 'desc'
    }
  }) as Photo[];
}

export async function getPhotoById(id: string): Promise<PhotoWithRelations | null> {
  return await prisma.photo.findUnique({
    where: { id },
    include: {
      clientGalleries: {
        include: {
          gallery: true
        }
      },
      orderPhotos: {
        include: {
          order: true
        }
      }
    }
  }) as PhotoWithRelations | null;
}

// Client Gallery operations
export async function createClientGallery(data: {
  name: string;
  accessCode: string;
  clientId: string;
  expiresAt?: Date;
  photoIds?: string[];
}) {
  const gallery = await prisma.clientGallery.create({
    data: {
      name: data.name,
      accessCode: data.accessCode,
      clientId: data.clientId,
      expiresAt: data.expiresAt
    }
  });

  // Add photos to gallery if provided
  if (data.photoIds && data.photoIds.length > 0) {
    await prisma.clientGalleryPhoto.createMany({
      data: data.photoIds.map(photoId => ({
        galleryId: gallery.id,
        photoId
      }))
    });
  }

  return gallery;
}

export async function getClientGalleryByAccessCode(accessCode: string): Promise<ClientGalleryWithRelations | null> {
  return await prisma.clientGallery.findUnique({
    where: { 
      accessCode,
      isActive: true
    },
    include: {
      client: true,
      photos: {
        include: {
          photo: true
        }
      },
      orders: true
    }
  }) as ClientGalleryWithRelations | null;
}

export async function addPhotosToGallery(galleryId: string, photoIds: string[]) {
  return await prisma.clientGalleryPhoto.createMany({
    data: photoIds.map(photoId => ({
      galleryId,
      photoId
    })),
    skipDuplicates: true
  });
}

// Order operations
export async function createOrder(data: {
  clientId: string;
  galleryId: string;
  photoIds: string[];
  totalAmount: number;
  stripePaymentId?: string;
}) {
  const order = await prisma.order.create({
    data: {
      clientId: data.clientId,
      galleryId: data.galleryId,
      totalAmount: data.totalAmount,
      stripePaymentId: data.stripePaymentId,
      status: OrderStatus.PENDING
    }
  });

  // Add photos to order
  const photos = await prisma.photo.findMany({
    where: {
      id: {
        in: data.photoIds
      }
    }
  });

  await prisma.orderPhoto.createMany({
    data: photos.map(photo => ({
      orderId: order.id,
      photoId: photo.id,
      price: photo.price
    }))
  });

  return order;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus, stripePaymentId?: string) {
  return await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      ...(stripePaymentId && { stripePaymentId })
    }
  });
}

export async function getOrderById(id: string): Promise<OrderWithRelations | null> {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      client: true,
      gallery: true,
      photos: {
        include: {
          photo: true
        }
      },
      downloadLinks: true
    }
  }) as OrderWithRelations | null;
}

// Service operations
export async function getAllServices(activeOnly: boolean = true): Promise<Service[]> {
  return await prisma.service.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: {
      name: 'asc'
    }
  }) as Service[];
}

export async function getServicesByCategory(category: ServiceCategory): Promise<Service[]> {
  return await prisma.service.findMany({
    where: {
      category,
      isActive: true
    },
    orderBy: {
      name: 'asc'
    }
  }) as Service[];
}

export async function getServiceById(id: string): Promise<Service | null> {
  return await prisma.service.findUnique({
    where: { id }
  }) as Service | null;
}

// Download Link operations
export async function createDownloadLink(data: {
  orderId: string;
  photoId: string;
  url: string;
  expiresAt: Date;
}) {
  return await prisma.downloadLink.create({
    data
  });
}

export async function getValidDownloadLink(orderId: string, photoId: string) {
  return await prisma.downloadLink.findFirst({
    where: {
      orderId,
      photoId,
      expiresAt: {
        gt: new Date()
      }
    }
  });
}

// Utility functions
export async function generateUniqueAccessCode(): Promise<string> {
  let accessCode: string;
  let isUnique = false;

  do {
    // Generate a 8-character alphanumeric code
    accessCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const existing = await prisma.clientGallery.findUnique({
      where: { accessCode }
    });
    
    isUnique = !existing;
  } while (!isUnique);

  return accessCode;
}