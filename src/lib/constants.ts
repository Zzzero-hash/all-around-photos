// Application constants

export const SITE_CONFIG = {
  name: 'All Around Photos LLC',
  description: 'Professional drone photography and inspection services',
  url: 'https://allaroundphotos.com',
  ogImage: '/og-image.svg',
} as const;

export const CONTACT_INFO = {
  phone: '(555) 123-4567',
  email: 'info@allaroundphotos.com',
  address: '123 Main St, City, State 12345',
} as const;

export const SERVICE_CATEGORIES = {
  COMMERCIAL: 'commercial',
  RESIDENTIAL: 'residential',
  REAL_ESTATE: 'real_estate',
  EVENT: 'event',
  OTHER: 'other',
} as const;

export const PHOTO_FORMATS = {
  JPEG: 'jpeg',
  PNG: 'png',
  RAW: 'raw',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  DELIVERED: 'delivered',
} as const;

export const USER_ROLES = {
  CLIENT: 'client',
  ADMIN: 'admin',
} as const;

export const PRICING = {
  INDIVIDUAL_PHOTO: 25,
  PACKAGE_DISCOUNT: 0.15, // 15% discount for packages
  MINIMUM_PACKAGE_SIZE: 5,
} as const;
