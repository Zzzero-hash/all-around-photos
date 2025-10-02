import { UserRepository } from './user-repository';
import { MockPhotoRepository } from './photo-repository';
import { ServiceRepository } from './service-repository';

// Export types
export type { PhotoRepository } from './photo-repository';
export { UserRepository, ServiceRepository };

// Create singleton instances
export const userRepository = new UserRepository();
export const photoRepository = new MockPhotoRepository();
export const serviceRepository = new ServiceRepository();