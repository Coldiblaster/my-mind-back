import { Injectable } from '@nestjs/common';

import { BusinessTypeRepository } from '@/domain/platform/application/repositories/business-type-repository';
import { BusinessType } from '@/domain/platform/enterprise/entities/business-type.entity';

import { PrismaBusinessTypeMapper } from '../mappers/prisma-business-type-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBusinessTypeRepository implements BusinessTypeRepository {
  constructor(private prisma: PrismaService) { }

  async create(businessType: BusinessType): Promise<void> {
    const data = PrismaBusinessTypeMapper.toPrisma(businessType);

    await this.prisma.businessType.create({
      data,
    });
  }

  async findAll(): Promise<BusinessType[] | null> {
    const businessType = await this.prisma.businessType.findMany();

    if (!businessType) {
      return null;
    }

    return businessType.map(PrismaBusinessTypeMapper.toDomain);
  }

  async findByID(id: number): Promise<BusinessType | null> {
    const businessType = await this.prisma.businessType.findUnique({
      where: {
        id,
      },
    });

    if (!businessType) {
      return null;
    }

    return PrismaBusinessTypeMapper.toDomain(businessType);
  }
}
