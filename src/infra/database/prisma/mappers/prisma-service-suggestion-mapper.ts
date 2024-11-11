import {
  Prisma,
  ServiceSuggestion as PrismaServiceSuggestions,
} from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ServiceSuggestion } from '@/domain/platform/enterprise/entities/service-suggestion.entity';

export class PrismaServiceSuggestionMapper {
  static toDomain(raw: PrismaServiceSuggestions): ServiceSuggestion {
    return ServiceSuggestion.create(
      {
        description: raw.description,
        time: raw.time,
        title: raw.title,
        value: raw.value,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        businessTypeId: raw.businessTypeId,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    serviceSuggestion: ServiceSuggestion,
  ): Prisma.ServiceSuggestionUncheckedCreateInput {
    return {
      id: serviceSuggestion.id.toString(),
      description: serviceSuggestion.description,
      time: serviceSuggestion.time,
      value: serviceSuggestion.value,
      title: serviceSuggestion.title,
      createdAt: serviceSuggestion.createdAt,
      updatedAt: serviceSuggestion.updatedAt,
      businessTypeId: serviceSuggestion.businessTypeId
        ? serviceSuggestion.businessTypeId
        : null,
    };
  }
}
