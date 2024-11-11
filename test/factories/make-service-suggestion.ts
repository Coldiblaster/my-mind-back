import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  ServiceSuggestion,
  ServiceSuggestionProps,
} from '@/domain/platform/enterprise/entities/service-suggestion.entity';
import { PrismaServiceSuggestionMapper } from '@/infra/database/prisma/mappers/prisma-service-suggestion-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeServiceSuggestion(
  override: Partial<ServiceSuggestionProps> = {},
  id?: UniqueEntityID,
) {
  const serviceSuggestion = ServiceSuggestion.create(
    {
      title: faker.lorem.paragraph(),
      time: faker.number.int({ min: 10, max: 50 }),
      description: faker.lorem.sentence(),
      value: faker.number.float({ min: 1.0 }),
      ...override,
    },
    id,
  );

  return serviceSuggestion;
}

@Injectable()
export class ServiceSuggestionFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaServiceSuggestion(
    data: Partial<ServiceSuggestionProps> = {},
  ): Promise<ServiceSuggestion> {
    const serviceSuggestion = makeServiceSuggestion(data);

    await this.prisma.serviceSuggestion.create({
      data: PrismaServiceSuggestionMapper.toPrisma(serviceSuggestion),
    });

    return serviceSuggestion;
  }
}
