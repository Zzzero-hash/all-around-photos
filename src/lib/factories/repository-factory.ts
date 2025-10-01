// Factory for choosing between stub and real repository implementations
import { developmentConfig } from '@/lib/config/development';

// Type-only imports to avoid loading implementations unnecessarily
import type { PhotoRepositoryStub } from '@/lib/repositories/photo-repository-stub';

/**
 * Factory function to get the appropriate photo repository implementation
 * Returns stub version during development without database
 */
export async function createPhotoRepository() {
  if (developmentConfig.useStubRepositories) {
    const { photoRepository } = await import('@/lib/repositories/photo-repository-stub');
    return photoRepository;
  }
  
  // When database is available, use the real implementation
  const { photoRepository } = await import('@/lib/repositories/photo-repository');
  return photoRepository;
}

/**
 * Type for photo repository interface (works with both stub and real implementations)
 */
export type PhotoRepositoryInterface = PhotoRepositoryStub;