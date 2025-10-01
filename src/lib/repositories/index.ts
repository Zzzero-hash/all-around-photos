import { UserRepository } from './user-repository';
import { PhotoRepository } from './photo-repository';
import { ServiceRepository } from './service-repository';

// Export classes
export { UserRepository, PhotoRepository, ServiceRepository };

// Create singleton instances
export const userRepository = new UserRepository();
export const photoRepository = new PhotoRepository();
export const serviceRepository = new ServiceRepository();