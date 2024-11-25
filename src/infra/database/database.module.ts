import { Module } from '@nestjs/common';

import { AddressRepository } from '@/domain/platform/application/repositories/address-repository';
import { AvailabilityRepository } from '@/domain/platform/application/repositories/availability-repository';
import { BusinessTypeRepository } from '@/domain/platform/application/repositories/business-type-repository';
import { CompanyRepository } from '@/domain/platform/application/repositories/company-repository';
import { OpeningHoursRepository } from '@/domain/platform/application/repositories/opening-hours-repository';
import { ProfessionalRepository } from '@/domain/platform/application/repositories/professional-repository';
import { ProfessionalServicesRepository } from '@/domain/platform/application/repositories/professional-services-repository';
import { ServiceRepository } from '@/domain/platform/application/repositories/service-repository';
import { ServiceSuggestionRepository } from '@/domain/platform/application/repositories/service-suggestion-repository';
import { RegisterRepository } from '@/domain/register/application/repositories/register-repository';

import { CacheModule } from '../cache/cache.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address-repository';
import { PrismaAvailabilityRepository } from './prisma/repositories/prisma-availability-repository';
import { PrismaBusinessTypeRepository } from './prisma/repositories/prisma-business-type-repository';
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company-repository';
import { PrismaOpeningHoursRepository } from './prisma/repositories/prisma-opening-hours-repository ';
import { PrismaProfessionalRepository } from './prisma/repositories/prisma-professional-repository';
import { PrismaProfessionalServicesRepository } from './prisma/repositories/prisma-professional-services-repository';
import { PrismaRegisterRepository } from './prisma/repositories/prisma-register-repository';
import { PrismaServiceRepository } from './prisma/repositories/prisma-service-repository';
import { PrismaServiceSuggestionRepository } from './prisma/repositories/prisma-service-suggestion';

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: RegisterRepository,
      useClass: PrismaRegisterRepository,
    },
    {
      provide: ProfessionalRepository,
      useClass: PrismaProfessionalRepository,
    },
    {
      provide: OpeningHoursRepository,
      useClass: PrismaOpeningHoursRepository,
    },
    {
      provide: ProfessionalServicesRepository,
      useClass: PrismaProfessionalServicesRepository,
    },
    {
      provide: AddressRepository,
      useClass: PrismaAddressRepository,
    },
    {
      provide: ServiceRepository,
      useClass: PrismaServiceRepository,
    },
    {
      provide: ServiceSuggestionRepository,
      useClass: PrismaServiceSuggestionRepository,
    },
    {
      provide: BusinessTypeRepository,
      useClass: PrismaBusinessTypeRepository,
    },
    {
      provide: AvailabilityRepository,
      useClass: PrismaAvailabilityRepository,
    },
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
  ],
  exports: [
    PrismaService,
    RegisterRepository,
    ProfessionalRepository,
    OpeningHoursRepository,
    ProfessionalServicesRepository,
    AddressRepository,
    ServiceRepository,
    ServiceSuggestionRepository,
    BusinessTypeRepository,
    AvailabilityRepository,
    CompanyRepository,
  ],
})
export class DatabaseModule { }
