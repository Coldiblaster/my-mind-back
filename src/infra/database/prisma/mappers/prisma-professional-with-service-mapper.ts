import {
  ProfessionalService as PrismaProfessionalService,
  Service as PrismaService,
} from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ProfessionalWithService } from '@/domain/platform/enterprise/entities/value-objects/professional-with-service';

type PrismaProfessionalWithService = PrismaProfessionalService & {
  service: PrismaService;
};

export class PrismaProfessionalWithServiceMapper {
  static toDomain(raw: PrismaProfessionalWithService): ProfessionalWithService {
    return ProfessionalWithService.create({
      professionalId: new UniqueEntityID(raw.id),
      serviceId: new UniqueEntityID(raw.serviceId),
      description: raw.service.description,
      time: raw.service.time,
      value: raw.service.value,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
