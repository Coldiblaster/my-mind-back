import { Injectable } from '@nestjs/common';

import { AvailabilityRepository } from '@/domain/platform/application/repositories/availability-repository';
import { Availability } from '@/domain/platform/enterprise/entities/availability.entity';

import { PrismaAvailabilityMapper } from '../mappers/prisma-availability-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAvailabilityRepository implements AvailabilityRepository {
  constructor(private prisma: PrismaService) { }

  async create(availability: Availability[]): Promise<void> {
    const data = availability.map(availability =>
      PrismaAvailabilityMapper.toPrisma(availability),
    );

    await this.prisma.availability.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async save(availability: Availability): Promise<void> {
    const data = PrismaAvailabilityMapper.toPrisma(availability);

    await this.prisma.availability.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findByID(id: string): Promise<Availability | null> {
    const availability = await this.prisma.availability.findUnique({
      where: {
        id,
      },
    });

    if (!availability) {
      return null;
    }

    return PrismaAvailabilityMapper.toDomain(availability);
  }

  async findByDateAndProfessional(
    professionalId: string,
    date: Date,
  ): Promise<Availability[] | null> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const availabilities = await this.prisma.availability.findMany({
      where: {
        professionalId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const domainAvailabilities = availabilities.map(
      PrismaAvailabilityMapper.toDomain,
    );

    return domainAvailabilities.length > 0 ? domainAvailabilities : null;
  }
}
