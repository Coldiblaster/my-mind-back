import { Injectable } from '@nestjs/common';

import { ProfessionalSocialMediaRepository } from '@/domain/platform/application/repositories/professional-social-media-repository';
import { ProfessionalSocialMedia } from '@/domain/platform/enterprise/entities/professional-social-media.entity';

import { PrismaProfessionalSocialMediaMapper } from '../mappers/prisma-professional-social-media-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProfessionalSocialMediaRepository
  implements ProfessionalSocialMediaRepository {
  constructor(private prisma: PrismaService) { }

  async save(professional: ProfessionalSocialMedia): Promise<void> {
    const data = PrismaProfessionalSocialMediaMapper.toPrisma(professional);

    await this.prisma.professional.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findByID(id: string): Promise<ProfessionalSocialMedia | null> {
    const professionalSocialMedia =
      await this.prisma.professionalSocialMedia.findUnique({
        where: {
          id,
        },
      });

    if (!professionalSocialMedia) {
      return null;
    }

    return PrismaProfessionalSocialMediaMapper.toDomain(
      professionalSocialMedia,
    );
  }

  async create(
    professionalSocialMedia: ProfessionalSocialMedia[],
  ): Promise<void> {
    const data = professionalSocialMedia.map(item =>
      PrismaProfessionalSocialMediaMapper.toPrisma(item),
    );

    await this.prisma.professionalSocialMedia.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async delete(
    professionalSocialMedia: ProfessionalSocialMedia,
  ): Promise<void> {
    await this.prisma.professionalSocialMedia.delete({
      where: {
        id: professionalSocialMedia.id.toString(),
      },
    });
  }
}
