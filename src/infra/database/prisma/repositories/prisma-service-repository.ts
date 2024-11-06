import { Injectable } from '@nestjs/common';

import { ServiceRepository } from '@/domain/platform/application/repositories/service-repository';
import { Service } from '@/domain/platform/enterprise/entities/service';

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
}
