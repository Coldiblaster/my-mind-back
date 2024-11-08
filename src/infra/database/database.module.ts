import { Module } from '@nestjs/common';

import { AddressRepository } from '@/domain/platform/application/repositories/address-repository';
import { OpeningHoursRepository } from '@/domain/platform/application/repositories/opening-hours-repository';
import { ProfessionalRepository } from '@/domain/platform/application/repositories/professional-repository';
import { ProfessionalServicesRepository } from '@/domain/platform/application/repositories/professional-services-repository';
import { ServiceRepository } from '@/domain/platform/application/repositories/service-repository';
import { RegisterRepository } from '@/domain/register/application/repositories/register-repository';

import { CacheModule } from '../cache/cache.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address-repository';
import { PrismaOpeningHoursRepository } from './prisma/repositories/prisma-opening-hours-repository ';
import { PrismaProfessionalRepository } from './prisma/repositories/prisma-professional-repository';
import { PrismaProfessionalServicesRepository } from './prisma/repositories/prisma-professional-services-repository';
import { PrismaRegisterRepository } from './prisma/repositories/prisma-register-repository';
import { PrismaServiceRepository } from './prisma/repositories/prisma-service-repository';

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
  ],
  exports: [
    PrismaService,
    RegisterRepository,
    ProfessionalRepository,
    OpeningHoursRepository,
    ProfessionalServicesRepository,
    AddressRepository,
    ServiceRepository,
  ],
})
export class DatabaseModule {}
