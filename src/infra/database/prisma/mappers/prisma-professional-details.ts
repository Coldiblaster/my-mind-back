import {
  Professional as PrismaProfessional,
  Service as PrismaServices,
} from '@prisma/client';

import { ProfessionalDetails } from '@/domain/platform/enterprise/entities/value-objects/professional-details';

import { PrismaServiceMapper } from './prisma-service-mapper';

type PrismaProfessionalDetails = {
  professional: PrismaProfessional;
  services: PrismaServices[];
};

export class PrismaProfessionalDetailsMapper {
  static toDomain(raw: PrismaProfessionalDetails): ProfessionalDetails {
    return ProfessionalDetails.create({
      email: raw.professional.email,
      bio: raw.professional.bio,
      name: raw.professional.name,
      occupation: raw.professional.occupation,
      services: raw.services.map(PrismaServiceMapper.toDomain),
    });
  }
}
