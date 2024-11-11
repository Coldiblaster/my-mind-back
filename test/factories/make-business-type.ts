import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import {
  BusinessType,
  BusinessTypeProps,
} from '@/domain/platform/enterprise/entities/business-type.entity';
import { PrismaBusinessTypeMapper } from '@/infra/database/prisma/mappers/prisma-business-type-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeBusinessType(
  override: Partial<BusinessTypeProps> = {},
  id?: number,
) {
  const businessType = BusinessType.create(
    {
      label: faker.lorem.paragraph(),
      icon: faker.lorem.sentence(),
      ...override,
    },
    id,
  );

  return businessType;
}

@Injectable()
export class BusinessTypeFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaBusinessType(
    data: Partial<BusinessTypeProps> = {},
    id?: number,
  ): Promise<BusinessType> {
    const businessType = makeBusinessType(data, id);

    await this.prisma.businessType.create({
      data: PrismaBusinessTypeMapper.toPrisma(businessType),
    });

    return businessType;
  }
}
