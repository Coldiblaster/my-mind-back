import { Prisma, Service as PrismaServices } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Service } from '@/domain/platform/enterprise/entities/service.entity';

export class PrismaServiceMapper {
  static toDomain(raw: PrismaServices): Service {
    return Service.create(
      {
        description: raw.description,
        time: raw.time,
        value: raw.value,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(service: Service): Prisma.ServiceUncheckedCreateInput {
    return {
      id: service.id.toString(),
      description: service.description,
      time: service.time,
      value: service.value,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };
  }
}
