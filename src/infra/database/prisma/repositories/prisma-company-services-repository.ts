import { Injectable } from '@nestjs/common';

import { CompanyServicesRepository } from '@/domain/platform/application/repositories/company-services-repository';
import { CompanyServices } from '@/domain/platform/enterprise/entities/company-services';

import { PrismaCompanyServicesMapper } from '../mappers/prisma-company-services-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCompanyServicesRepository
  implements CompanyServicesRepository {
  constructor(private prisma: PrismaService) { }

  async findByID(id: string): Promise<CompanyServices | null> {
    const companyServices = await this.prisma.companyServices.findUnique({
      where: {
        id,
      },
    });

    if (!companyServices) {
      return null;
    }

    return PrismaCompanyServicesMapper.toDomain(companyServices);
  }

  async create(companyServices: CompanyServices): Promise<void> {
    const data = PrismaCompanyServicesMapper.toPrisma(companyServices);

    await this.prisma.companyServices.create({
      data,
    });
  }
}
