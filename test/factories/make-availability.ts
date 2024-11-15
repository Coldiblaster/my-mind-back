import { faker } from '@faker-js/faker';

// import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Availability,
  AvailabilityProps,
} from '@/domain/platform/enterprise/entities/availability.entity';
// import { PrismaAvailabilityMapper } from '@/infra/database/prisma/mappers/prisma-availability-mapper';
// import { PrismaAvailability } from '@/infra/database/prisma/prisma.availability';

export function makeAvailability(
  override: Partial<AvailabilityProps> = {},
  id?: UniqueEntityID,
) {
  const availability = Availability.create(
    {
      date: faker.date.birthdate(),
      endTime: faker.date.birthdate(),
      startTime: faker.date.birthdate(),
      professionalId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return availability;
}
