import {
  Prisma,
  ProfessionalSocialMedia as PrismaProfessionalSocialMedia,
} from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ProfessionalSocialMedia } from '@/domain/platform/enterprise/entities/professional-social-media.entity';

export class PrismaProfessionalSocialMediaMapper {
  static toDomain(raw: PrismaProfessionalSocialMedia): ProfessionalSocialMedia {
    return ProfessionalSocialMedia.create(
      {
        professionalId: new UniqueEntityID(raw.professionalId),
        platform: raw.platform,
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    professionalSocialMedia: ProfessionalSocialMedia,
  ): Prisma.ProfessionalSocialMediaUncheckedCreateInput {
    return {
      id: professionalSocialMedia.id.toString(),
      professionalId: professionalSocialMedia.professionalId.toString(),
      platform: professionalSocialMedia.platform,
      url: professionalSocialMedia.url,
    };
  }
}
