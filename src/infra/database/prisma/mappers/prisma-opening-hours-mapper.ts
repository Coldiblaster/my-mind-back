import { OpeningHours as PrismaOpeningHours, Prisma } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours';

export class PrismaOpeningHoursMapper {
  static toDomain(raw: PrismaOpeningHours): OpeningHours {
    return OpeningHours.create(
      {
        companyId: raw.companyId ? new UniqueEntityID(raw.companyId) : null,
        startTime: raw.startTime,
        endTime: raw.endTime,
        weekday: raw.weekday,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    openingHours: OpeningHours,
  ): Prisma.OpeningHoursUncheckedCreateInput {
    return {
      id: openingHours.id.toString(),
      startTime: openingHours.startTime,
      endTime: openingHours.endTime,
      weekday: openingHours.weekday,
      companyId: openingHours.companyId?.toString(),
      createdAt: openingHours.createdAt,
      updatedAt: openingHours.updatedAt,
    };
  }
}
