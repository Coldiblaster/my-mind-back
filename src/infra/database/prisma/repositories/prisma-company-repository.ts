import { Injectable } from '@nestjs/common';

import { CompanyRepository } from '@/domain/platform/application/repositories/company-repository';
import { Company } from '@/domain/platform/enterprise/entities/company.entity';

import { PrismaCompanyMapper } from '../mappers/prisma-company-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) { }

  async save(company: Company): Promise<void> {
    const data = PrismaCompanyMapper.toPrisma(company);

    await this.prisma.company.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findByCompanyLink(link: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: {
        link,
      },
    });

    if (!company) {
      return null;
    }

    return PrismaCompanyMapper.toDomain(company);
  }

  async findByID(id: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!company) {
      return null;
    }

    return PrismaCompanyMapper.toDomain(company);
  }

  async create(company: Company): Promise<void> {
    const data = PrismaCompanyMapper.toPrisma(company);

    await this.prisma.company.create({
      data,
    });
  }
}
