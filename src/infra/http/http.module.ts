import { Module } from '@nestjs/common';

import { CreateServiceUseCase } from '@/domain/platform/application/use-cases/service/create-service';
import { FetchProfessionalServicesUseCase } from '@/domain/platform/application/use-cases/service/fetch-professional-services';
import { FetchServiceByIdUseCase } from '@/domain/platform/application/use-cases/service/fetch-services-by-id';
import { RegisterCompanyUseCase } from '@/domain/register/application/use-cases/register-company';

import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { StorageModule } from '../storage/storage.module';
import { RegisterController } from './controller/register.controller';
import { CreateServiceController } from './controller/service/create-service.controller';
import { FetchProfessionalServicesController } from './controller/service/fetch-professional-services.controller';
import { FetchServiceByIdController } from './controller/service/fetch-service-by-id.controller';

@Module({
  imports: [DatabaseModule, StorageModule, CryptographyModule],
  controllers: [
    RegisterController,
    CreateServiceController,
    FetchProfessionalServicesController,
    FetchServiceByIdController,
  ],
  providers: [
    RegisterCompanyUseCase,
    CreateServiceUseCase,
    FetchProfessionalServicesUseCase,
    FetchServiceByIdUseCase,
  ],
})
export class HttpModule { }
