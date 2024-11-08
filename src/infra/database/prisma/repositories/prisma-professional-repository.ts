import { Injectable } from '@nestjs/common';

import { ProfessionalRepository } from '@/domain/platform/application/repositories/professional-repository';
import { Professional } from '@/domain/platform/enterprise/entities/professional.entity';

import { PrismaProfessionalMapper } from '../mappers/prisma-professional-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProfessionalRepository implements ProfessionalRepository {
  constructor(private prisma: PrismaService) {}

  async save(professional: Professional): Promise<void> {
    const data = PrismaProfessionalMapper.toPrisma(professional);

    await this.prisma.professional.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findByEmail(email: string): Promise<Professional | null> {
    const professional = await this.prisma.professional.findUnique({
      where: {
        email,
      },
    });

    if (!professional) {
      return null;
    }

    return PrismaProfessionalMapper.toDomain(professional);
  }

  async findByID(id: string): Promise<Professional | null> {
    const professional = await this.prisma.professional.findUnique({
      where: {
        id,
      },
    });

    if (!professional) {
      return null;
    }

    return PrismaProfessionalMapper.toDomain(professional);
  }

  async findByProviderID(providerId: string): Promise<Professional | null> {
    const professional = await this.prisma.professional.findUnique({
      where: {
        providerId,
      },
    });

    if (!professional) {
      return null;
    }

    return PrismaProfessionalMapper.toDomain(professional);
  }

  async create(professional: Professional): Promise<void> {
    const data = PrismaProfessionalMapper.toPrisma(professional);

    await this.prisma.professional.create({
      data,
    });
  }
}
