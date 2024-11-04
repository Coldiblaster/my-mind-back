import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  CompanyServices,
  CompanyServicesProps,
} from '@/domain/platform/enterprise/entities/company-services';
import { PrismaCompanyServicesMapper } from '@/infra/database/prisma/mappers/prisma-company-services-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeCompanyServices(
  override: Partial<CompanyServicesProps> = {},
  id?: UniqueEntityID,
) {
  const companyServices = CompanyServices.create(
    {
      companyId: new UniqueEntityID(),
      serviceId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return companyServices;
}

@Injectable()
export class CompanyServicesFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaCompanyServices(
    data: Partial<CompanyServicesProps> = {},
  ): Promise<CompanyServices> {
    const companyServices = makeCompanyServices(data);

    await this.prisma.companyServices.create({
      data: PrismaCompanyServicesMapper.toPrisma(companyServices),
    });

    return companyServices;
  }
}
