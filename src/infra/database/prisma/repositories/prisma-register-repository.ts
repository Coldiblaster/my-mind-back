import { Injectable } from '@nestjs/common';

import { Address } from '@/domain/platform/enterprise/entities/address';
import { Company } from '@/domain/platform/enterprise/entities/company';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours';
import { Professional } from '@/domain/platform/enterprise/entities/professional';
import { ProfessionalServices } from '@/domain/platform/enterprise/entities/professional-services';
import { Service } from '@/domain/platform/enterprise/entities/service';
import { RegisterRepository } from '@/domain/register/application/repositories/register-repository';

import { PrismaAddressMapper } from '../mappers/prisma-address-mapper';
import { PrismaCompanyMapper } from '../mappers/prisma-company-mapper';
import { PrismaOpeningHoursMapper } from '../mappers/prisma-opening-hours-mapper';
import { PrismaProfessionalMapper } from '../mappers/prisma-professional-mapper';
import { PrismaProfessionalServicesMapper } from '../mappers/prisma-professional-services-mapper';
import { PrismaServiceMapper } from '../mappers/prisma-service-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaRegisterRepository implements RegisterRepository {
  constructor(private prisma: PrismaService) { }

  async registerCompanyWithDetails(data: {
    professional: Professional;
    address: Address;
    openingHours: OpeningHours[];
    professionalServices: ProfessionalServices[];
    services: Service[];
    company: Company;
  }): Promise<void> {
    await this.prisma.$transaction(async prisma => {
      const addressData = PrismaAddressMapper.toPrisma(data.address);

      await prisma.address.create({ data: addressData });

      const companyData = PrismaCompanyMapper.toPrisma(data.company);

      await prisma.company.create({ data: companyData });

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

      data.professionalServices.map(async professionalService => {
        await prisma.professionalService.create({
          data: PrismaProfessionalServicesMapper.toPrisma(professionalService),
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
