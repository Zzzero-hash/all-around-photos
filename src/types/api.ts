// API response types

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

export interface PhotoUploadResponse {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface DownloadLinkResponse {
  downloadUrl: string;
  expiresAt: string;
}
