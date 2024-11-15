import { Availability as PrismaAvailability, Prisma } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Availability } from '@/domain/platform/enterprise/entities/availability.entity';

export class PrismaAvailabilityMapper {
  static toDomain(raw: PrismaAvailability): Availability {
    return Availability.create(
      {
        date: raw.date,
        startTime: raw.startTime,
        endTime: raw.endTime,
        professionalId: new UniqueEntityID(raw.professionalId),
        isAvailable: raw.isAvailable,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    availability: Availability,
  ): Prisma.AvailabilityUncheckedCreateInput {
    const dateOnly = new Date(availability.date);

    dateOnly.setHours(0, 0, 0, 0);

    return {
      id: availability.id.toString(),
      professionalId: availability.professionalId.toString(),
      date: dateOnly,
      startTime: availability.startTime,
      endTime: availability.endTime,
      isAvailable: availability.isAvailable,
      createdAt: availability.createdAt,
      updatedAt: availability.updatedAt,
    };
  }
}
