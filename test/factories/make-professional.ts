import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Professional,
  ProfessionalProps,
} from '@/domain/platform/enterprise/entities/professional.entity';
import { PrismaProfessionalMapper } from '@/infra/database/prisma/mappers/prisma-professional-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeProfessional(
  override: Partial<ProfessionalProps> = {},
  id?: UniqueEntityID,
) {
  const professional = Professional.create(
    {
      providerId: faker.string.uuid(),
      companyId: new UniqueEntityID(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      role: 'ADMIN',
      ...override,
    },
    id,
  );

  return professional;
}

@Injectable()
export class ProfessionalFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaProfessional(
    data: Partial<ProfessionalProps> = {},
  ): Promise<Professional> {
    const professional = makeProfessional(data);

    await this.prisma.professional.create({
      data: PrismaProfessionalMapper.toPrisma(professional),
    });

    return professional;
  }
}
