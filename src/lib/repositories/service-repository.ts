import { prisma } from '../prisma';
import { ServiceCategory } from '@prisma/client';
import type { Service } from '@/types/database';

export class ServiceRepository {
  async create(data: {
    name: string;
    description: string;
    category: ServiceCategory;
    basePrice: number;
    features: string[];
    isActive?: boolean;
  }) {
    return await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        basePrice: data.basePrice,
        features: data.features,
        isActive: data.isActive ?? true
      }
    });
  }

  async findById(id: string): Promise<Service | null> {
    return await prisma.service.findUnique({
      where: { id }
    }) as Service | null;
  }

  async findAll(options?: {
    activeOnly?: boolean;
    category?: ServiceCategory;
    skip?: number;
    take?: number;
  }): Promise<Service[]> {
    return await prisma.service.findMany({
      where: {
        ...(options?.activeOnly !== false && { isActive: true }),
        ...(options?.category && { category: options.category })
      },
      skip: options?.skip,
      take: options?.take,
      orderBy: {
        name: 'asc'
      }
    }) as Service[];
  }

  async findByCategory(category: ServiceCategory, activeOnly: boolean = true): Promise<Service[]> {
    return await prisma.service.findMany({
      where: {
        category,
        ...(activeOnly && { isActive: true })
      },
      orderBy: {
        name: 'asc'
      }
    }) as Service[];
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    category?: ServiceCategory;
    basePrice?: number;
    features?: string[];
    isActive?: boolean;
  }) {
    return await prisma.service.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return await prisma.service.delete({
      where: { id }
    });
  }

  async toggleActive(id: string) {
    const service = await this.findById(id);
    if (!service) {
      throw new Error('Service not found');
    }

    return await this.update(id, {
      isActive: !service.isActive
    });
  }

  async count(options?: {
    activeOnly?: boolean;
    category?: ServiceCategory;
  }) {
    return await prisma.service.count({
      where: {
        ...(options?.activeOnly !== false && { isActive: true }),
        ...(options?.category && { category: options.category })
      }
    });
  }
}