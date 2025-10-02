import { prisma } from '@/lib/prisma';
import type { QuoteRequest, QuoteStatus, QuoteServiceType } from '@prisma/client';
import type { CreateQuoteRequestInput, UpdateQuoteRequestInput } from '@/lib/validations';
import { Decimal } from '@prisma/client/runtime/library';

export class QuoteRequestRepository {
  async create(data: CreateQuoteRequestInput): Promise<QuoteRequest> {
    return prisma.quoteRequest.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType,
        sessionType: data.sessionType,
        projectDescription: data.projectDescription,
        location: data.location,
        preferredDate: data.preferredDate,
        alternateDate: data.alternateDate,
        timeline: data.timeline,
        budget: data.budget,
        specialRequirements: data.specialRequirements,
        petDetails: data.petDetails,
        status: 'NEW'
      }
    });
  }

  async findById(id: string): Promise<QuoteRequest | null> {
    return prisma.quoteRequest.findUnique({
      where: { id }
    });
  }

  async findMany(options: {
    page?: number;
    limit?: number;
    status?: QuoteStatus;
    serviceType?: QuoteServiceType;
  } = {}): Promise<{ data: QuoteRequest[]; total: number }> {
    const { page = 1, limit = 20, status, serviceType } = options;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (serviceType) where.serviceType = serviceType;

    const [data, total] = await Promise.all([
      prisma.quoteRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.quoteRequest.count({ where })
    ]);

    return { data, total };
  }

  async update(id: string, data: UpdateQuoteRequestInput): Promise<QuoteRequest> {
    const updateData = {
      ...data,
      // Convert number to Decimal if quotedAmount is provided
      ...(data.quotedAmount !== undefined && {
        quotedAmount: new Decimal(data.quotedAmount)
      })
    };

    return prisma.quoteRequest.update({
      where: { id },
      data: updateData
    });
  }

  async updateStatus(id: string, status: QuoteStatus, adminNotes?: string): Promise<QuoteRequest> {
    return prisma.quoteRequest.update({
      where: { id },
      data: {
        status,
        adminNotes,
        updatedAt: new Date()
      }
    });
  }

  async delete(id: string): Promise<QuoteRequest> {
    return prisma.quoteRequest.delete({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<QuoteRequest[]> {
    return prisma.quoteRequest.findMany({
      where: { email },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findPendingRequests(): Promise<QuoteRequest[]> {
    return prisma.quoteRequest.findMany({
      where: {
        status: {
          in: ['NEW', 'REVIEWED']
        }
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async getStatistics(): Promise<{
    total: number;
    byStatus: Record<QuoteStatus, number>;
    byServiceType: Record<QuoteServiceType, number>;
    recentCount: number;
  }> {
    const [
      total,
      statusCounts,
      serviceTypeCounts,
      recentCount
    ] = await Promise.all([
      prisma.quoteRequest.count(),
      prisma.quoteRequest.groupBy({
        by: ['status'],
        _count: { status: true }
      }),
      prisma.quoteRequest.groupBy({
        by: ['serviceType'],
        _count: { serviceType: true }
      }),
      prisma.quoteRequest.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      })
    ]);

    const byStatus = statusCounts.reduce((acc, item) => {
      acc[item.status] = item._count.status;
      return acc;
    }, {} as Record<QuoteStatus, number>);

    const byServiceType = serviceTypeCounts.reduce((acc, item) => {
      acc[item.serviceType as QuoteServiceType] = item._count.serviceType;
      return acc;
    }, {} as Record<QuoteServiceType, number>);

    return {
      total,
      byStatus,
      byServiceType,
      recentCount
    };
  }
}