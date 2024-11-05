import { Injectable } from '@nestjs/common';

import { ProfessionalServicesRepository } from '@/domain/platform/application/repositories/professional-services-repository';
import { ProfessionalServices } from '@/domain/platform/enterprise/entities/professional-services';

import { PrismaProfessionalServicesMapper } from '../mappers/prisma-professional-services-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProfessionalServicesRepository
  implements ProfessionalServicesRepository {
  constructor(private prisma: PrismaService) { }

  async findByID(id: string): Promise<ProfessionalServices | null> {
    const ProfessionalServices =
      await this.prisma.professionalService.findUnique({
        where: {
          id,
        },
      });

    if (!ProfessionalServices) {
      return null;
    }

    return PrismaProfessionalServicesMapper.toDomain(ProfessionalServices);
  }

  async create(ProfessionalServices: ProfessionalServices): Promise<void> {
    const data =
      PrismaProfessionalServicesMapper.toPrisma(ProfessionalServices);

    await this.prisma.professionalService.create({
      data,
    });
  }
}
