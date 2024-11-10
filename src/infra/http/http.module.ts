import { Module } from '@nestjs/common';

import { CreateServiceUseCase } from '@/domain/platform/application/use-cases/service/create-service';
import { DeleteServiceUseCase } from '@/domain/platform/application/use-cases/service/delete-service';
import { EditServiceUseCase } from '@/domain/platform/application/use-cases/service/edit-service';
import { FetchProfessionalServicesUseCase } from '@/domain/platform/application/use-cases/service/fetch-professional-services';
import { FetchServiceByIdUseCase } from '@/domain/platform/application/use-cases/service/fetch-service-by-id';
import { RegisterCompanyUseCase } from '@/domain/register/application/use-cases/register-company';

import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { StorageModule } from '../storage/storage.module';
import { RegisterController } from './controller/register.controller';
import { CreateServiceController } from './controller/service/create-service.controller';
import { DeleteServiceController } from './controller/service/delete-service.controller';
import { EditServiceController } from './controller/service/edit-service.controller';
import { FetchProfessionalServicesController } from './controller/service/fetch-professional-services.controller';
import { FetchServiceByIdController } from './controller/service/fetch-service-by-id.controller';

@Module({
  imports: [DatabaseModule, StorageModule, CryptographyModule],
  controllers: [
    RegisterController,
    CreateServiceController,
    FetchProfessionalServicesController,
    FetchServiceByIdController,
    EditServiceController,
    DeleteServiceController,
  ],
  providers: [
    RegisterCompanyUseCase,
    CreateServiceUseCase,
    FetchProfessionalServicesUseCase,
    FetchServiceByIdUseCase,
    EditServiceUseCase,
    DeleteServiceUseCase,
  ],
})
export class HttpModule { }
