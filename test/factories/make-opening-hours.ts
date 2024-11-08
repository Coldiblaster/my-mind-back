import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { endTime, startTime } from 'test/utils/time';

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
