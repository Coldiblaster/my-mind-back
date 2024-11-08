import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Service,
  ServiceProps,
} from '@/domain/platform/enterprise/entities/service';
import { PrismaServiceMapper } from '@/infra/database/prisma/mappers/prisma-service-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeService(
  override: Partial<ServiceProps> = {},
  id?: UniqueEntityID,
) {
  const service = Service.create(
    {
      time: `${faker.number.int({ min: 0, max: 2 }).toString()} : ${faker.number.int({ min: 10, max: 50 }).toString()}`,
      description: faker.lorem.sentence(),
      value: faker.number.float({ min: 1.0 }),
      ...override,
    },
    id,
  );

  return service;
}

@Injectable()
export class ServiceFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaService(data: Partial<ServiceProps> = {}): Promise<Service> {
    const service = makeService(data);

    await this.prisma.service.create({
      data: PrismaServiceMapper.toPrisma(service),
    });

    return service;
  }
}
