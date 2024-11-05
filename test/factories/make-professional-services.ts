import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  ProfessionalServices,
  ProfessionalServicesProps,
} from '@/domain/platform/enterprise/entities/professional-services';
import { PrismaProfessionalServicesMapper } from '@/infra/database/prisma/mappers/prisma-professional-services-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeProfessionalServices(
  override: Partial<ProfessionalServicesProps> = {},
  id?: UniqueEntityID,
) {
  const professionalServices = ProfessionalServices.create(
    {
      professionalId: new UniqueEntityID(),
      serviceId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return professionalServices;
}

@Injectable()
export class ProfessionalServicesFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaProfessionalServices(
    data: Partial<ProfessionalServicesProps> = {},
  ): Promise<ProfessionalServices> {
    const ProfessionalServices = makeProfessionalServices(data);

    await this.prisma.professionalService.create({
      data: PrismaProfessionalServicesMapper.toPrisma(ProfessionalServices),
    });

    return ProfessionalServices;
  }
}
