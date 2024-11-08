import { Injectable } from '@nestjs/common';

import { OpeningHoursRepository } from '@/domain/platform/application/repositories/opening-hours-repository';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours.entity';

import { PrismaOpeningHoursMapper } from '../mappers/prisma-opening-hours-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOpeningHoursRepository implements OpeningHoursRepository {
  constructor(private prisma: PrismaService) {}
  async save(openingHours: OpeningHours): Promise<void> {
    const data = PrismaOpeningHoursMapper.toPrisma(openingHours);

    await this.prisma.openingHours.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findByID(id: string): Promise<OpeningHours | null> {
    const openingHours = await this.prisma.openingHours.findUnique({
      where: {
        id,
      },
    });

    if (!openingHours) {
      return null;
    }

    return PrismaOpeningHoursMapper.toDomain(openingHours);
  }

  async create(openingHours: OpeningHours): Promise<void> {
    const data = PrismaOpeningHoursMapper.toPrisma(openingHours);

    await this.prisma.openingHours.create({
      data,
    });
  }
}
