import { prisma } from '../prisma';
import { Role } from '@prisma/client';
import type { UserWithRelations } from '@/types/database';

export class UserRepository {
  async create(data: {
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

  async findByEmail(email: string): Promise<UserWithRelations | null> {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        clientGalleries: true,
        orders: true
      }
    }) as UserWithRelations | null;
  }

  async findById(id: string): Promise<UserWithRelations | null> {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        clientGalleries: true,
        orders: true
      }
    }) as UserWithRelations | null;
  }

  async update(id: string, data: {
    email?: string;
    name?: string;
    role?: Role;
  }) {
    return await prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return await prisma.user.delete({
      where: { id }
    });
  }

  async findAll(options?: {
    role?: Role;
    skip?: number;
    take?: number;
  }) {
    return await prisma.user.findMany({
      where: options?.role ? { role: options.role } : undefined,
      skip: options?.skip,
      take: options?.take,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}