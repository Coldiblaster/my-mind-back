import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  OpeningHours,
  OpeningHoursProps,
} from '@/domain/platform/enterprise/entities/opening-hours';
import { PrismaOpeningHoursMapper } from '@/infra/database/prisma/mappers/prisma-opening-hours-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeOpeningHours(
  override: Partial<OpeningHoursProps> = {},
  id?: UniqueEntityID,
) {
  const startHour = faker.number.int({ min: 6, max: 21 });
  const startMinute = faker.number.int({ min: 0, max: 59 });
  const startTime = `${startHour}:${startMinute.toString().padStart(2, '0')}`;

  const endHour = faker.number.int({ min: startHour, max: 22 });
  let endMinute = faker.number.int({ min: 0, max: 59 });

  if (endHour === startHour && endMinute <= startMinute) {
    endMinute =
      startMinute + faker.number.int({ min: 1, max: 59 - startMinute });
  }

  const endTime = `${endHour}:${endMinute.toString().padStart(2, '0')}`;

  const openingHours = OpeningHours.create(
    {
      startTime,
      endTime,
      weekday: faker.date.weekday(),
      isOpen: faker.datatype.boolean(),
      ...override,
    },
    id,
  );

  return openingHours;
}

@Injectable()
export class OpeningHoursFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaOpeningHours(
    data: Partial<OpeningHoursProps> = {},
  ): Promise<OpeningHours> {
    const openingHours = makeOpeningHours(data);

    await this.prisma.openingHours.create({
      data: PrismaOpeningHoursMapper.toPrisma(openingHours),
    });

    return openingHours;
  }
}
