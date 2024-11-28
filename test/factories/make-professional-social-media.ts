import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  ProfessionalSocialMedia,
  ProfessionalSocialMediaProps,
} from '@/domain/platform/enterprise/entities/professional-social-media.entity';
// import { PrismaProfessionalSocialMediaMapper } from '@/infra/database/prisma/mappers/prisma-professional-mapper';
// import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeProfessionalSocialMedia(
  override: Partial<ProfessionalSocialMediaProps> = {},
  id?: UniqueEntityID,
) {
  const professionalSocialMedia = ProfessionalSocialMedia.create(
    {
      platform: faker.internet.displayName(),
      url: faker.internet.url(),
      professionalId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return professionalSocialMedia;
}

// @Injectable()
// export class ProfessionalSocialMediaFactory {
//   constructor(private prisma: PrismaService) { }

//   async makePrismaProfessionalSocialMedia(
//     data: Partial<ProfessionalSocialMediaProps> = {},
//   ): Promise<ProfessionalSocialMedia> {
//     const professional = makeProfessionalSocialMedia(data);

//     await this.prisma.professional.create({
//       data: PrismaProfessionalSocialMediaMapper.toPrisma(professional),
//     });

//     return professional;
//   }
// }
