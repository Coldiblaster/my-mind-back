import {
  Prisma,
  ProfessionalService as PrismaProfessionalServices,
} from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ProfessionalServices } from '@/domain/platform/enterprise/entities/professional-services.entity';

export class PrismaProfessionalServicesMapper {
  static toDomain(raw: PrismaProfessionalServices): ProfessionalServices {
    if (!raw.professionalId || !raw.serviceId) {
      throw new Error('Invalid professional services type.');
    }

    return ProfessionalServices.create(
      {
        professionalId: new UniqueEntityID(raw.professionalId),
        serviceId: new UniqueEntityID(raw.serviceId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    ProfessionalServices: ProfessionalServices,
  ): Prisma.ProfessionalServiceUncheckedCreateInput {
    return {
      id: ProfessionalServices.id.toString(),
      professionalId: ProfessionalServices.professionalId.toString(),
      serviceId: ProfessionalServices.serviceId.toString(),
      createdAt: ProfessionalServices.createdAt,
      updatedAt: ProfessionalServices.updatedAt,
    };
  }
}
