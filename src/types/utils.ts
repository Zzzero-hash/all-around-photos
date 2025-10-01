// Utility types for better type safety and reusability

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Database operation types
export type CreateInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateInput<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;

// API types
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Component prop utilities
export type WithClassName<T = {}> = T & {
  className?: string;
};

export type WithChildren<T = {}> = T & {
  children: React.ReactNode;
};

// Form types
export type FormState<T> = {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
};

// Selection types for galleries
export type SelectionMode = 'single' | 'multiple' | 'none';

export interface SelectionState<T> {
  selectedItems: T[];
  mode: SelectionMode;
  isAllSelected: boolean;
}

// File upload types
export interface FileUploadState {
  file: File | null;
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
  error?: string;
}

// Search and filter types
export interface SearchParams {
  query?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface FilterOption<T = string> {
  label: string;
  value: T;
  count?: number;
}