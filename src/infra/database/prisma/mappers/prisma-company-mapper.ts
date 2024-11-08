import { Company as PrismaCompany, Prisma } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Company } from '@/domain/platform/enterprise/entities/company.entity';

export class PrismaCompanyMapper {
  static toDomain(raw: PrismaCompany): Company {
    return Company.create(
      {
        addressId: new UniqueEntityID(raw.addressId),
        businessTypeId: raw.businessTypeId ? raw.businessTypeId : null,
        customSegment: raw.customSegment ? raw.customSegment : null,
        name: raw.name ? raw.name : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(company: Company): Prisma.CompanyUncheckedCreateInput {
    return {
      id: company.id.toString(),
      addressId: company.addressId.toString(),
      businessTypeId: company?.businessTypeId,
      customSegment: company?.customSegment,
      name: company?.name,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }
}
