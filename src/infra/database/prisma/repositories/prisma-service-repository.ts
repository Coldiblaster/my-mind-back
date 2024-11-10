import { Injectable } from '@nestjs/common';

import { PaginationParams } from '@/core/repositories/pagination-params';
import { ServiceRepository } from '@/domain/platform/application/repositories/service-repository';
import { Service } from '@/domain/platform/enterprise/entities/service.entity';
import { ProfessionalWithService } from '@/domain/platform/enterprise/entities/value-objects/professional-with-service';

import { PrismaProfessionalWithServiceMapper } from '../mappers/prisma-professional-with-service-mapper';
import { PrismaServiceMapper } from '../mappers/prisma-service-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaServiceRepository implements ServiceRepository {
  constructor(private prisma: PrismaService) { }

  async create(service: Service): Promise<void> {
    const data = PrismaServiceMapper.toPrisma(service);

    await this.prisma.service.create({
      data,
    });
  }

  async save(service: Service): Promise<void> {
    const data = PrismaServiceMapper.toPrisma(service);

    await this.prisma.service.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findServicesByProfessionalId(
    professionalId: string,
    { page }: PaginationParams,
  ): Promise<ProfessionalWithService[]> {
    const professionalServices = await this.prisma.professionalService.findMany(
      {
        where: {
          professionalId,
          service: {
            isActive: true,
          },
        },
        include: {
          service: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 20,
        skip: (page - 1) * 20,
      },
    );

    return professionalServices.map(
      PrismaProfessionalWithServiceMapper.toDomain,
    );
  }

  async findByID(id: string): Promise<Service | null> {
    const service = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!service) {
      return null;
    }

    return PrismaServiceMapper.toDomain(service);
  }

  async delete(service: Service): Promise<void> {
    const data = PrismaServiceMapper.toPrisma(service);

    await this.prisma.service.update({
      where: {
        id: service.id.toString(),
      },
      data,
    });
  }
}
