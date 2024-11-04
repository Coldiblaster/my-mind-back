import { Injectable } from '@nestjs/common';

import { Address } from '@/domain/platform/enterprise/entities/address';
import { Company } from '@/domain/platform/enterprise/entities/company';
import { CompanyServices } from '@/domain/platform/enterprise/entities/company-services';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours';
import { Professional } from '@/domain/platform/enterprise/entities/professional';
import { Service } from '@/domain/platform/enterprise/entities/service';
import { RegisterRepository } from '@/domain/register/application/repositories/register-repository';

import { PrismaAddressMapper } from '../mappers/prisma-address-mapper';
import { PrismaCompanyMapper } from '../mappers/prisma-company-mapper';
import { PrismaCompanyServicesMapper } from '../mappers/prisma-company-services-mapper';
import { PrismaOpeningHoursMapper } from '../mappers/prisma-opening-hours-mapper';
import { PrismaProfessionalMapper } from '../mappers/prisma-professional-mapper';
import { PrismaServiceMapper } from '../mappers/prisma-service-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaRegisterRepository implements RegisterRepository {
  constructor(private prisma: PrismaService) { }

  async registerCompanyWithDetails(data: {
    professional: Professional;
    address: Address;
    openingHours: OpeningHours[];
    companyServices: CompanyServices[];
    services: Service[];
    company: Company;
  }): Promise<void> {
    await this.prisma.$transaction(async prisma => {
      // Criação do endereço
      const addressData = PrismaAddressMapper.toPrisma(data.address);

      await prisma.address.create({ data: addressData });

      // Criação da empresa
      const companyData = PrismaCompanyMapper.toPrisma(data.company);
      await prisma.company.create({ data: companyData });

      // Criação do profissional
      const professionalData = PrismaProfessionalMapper.toPrisma(
        data.professional,
      );

      await prisma.professional.create({
        data: professionalData,
      });

      data.services.map(async service => {
        await prisma.service.create({
          data: PrismaServiceMapper.toPrisma(service),
        });
      });

      data.companyServices.map(async companyService => {
        await prisma.companyServices.create({
          data: PrismaCompanyServicesMapper.toPrisma(companyService),
        });
      });

      for (const hours of data.openingHours) {
        const hoursData = PrismaOpeningHoursMapper.toPrisma(hours);
        await prisma.openingHours.create({
          data: hoursData,
        });
      }
    });
  }
}
