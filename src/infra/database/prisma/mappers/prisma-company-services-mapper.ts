import {
  CompanyServices as PrismaCompanyServices,
  Prisma,
} from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CompanyServices } from '@/domain/platform/enterprise/entities/company-services';

export class PrismaCompanyServicesMapper {
  static toDomain(raw: PrismaCompanyServices): CompanyServices {
    if (!raw.companyId || !raw.serviceId) {
      throw new Error('Invalid company services type.');
    }

    return CompanyServices.create(
      {
        companyId: new UniqueEntityID(raw.companyId),
        serviceId: new UniqueEntityID(raw.serviceId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    companyServices: CompanyServices,
  ): Prisma.CompanyServicesUncheckedCreateInput {
    return {
      id: companyServices.id.toString(),
      companyId: companyServices.companyId.toString(),
      serviceId: companyServices.serviceId.toString(),
      createdAt: companyServices.createdAt,
      updatedAt: companyServices.updatedAt,
    };
  }
}
