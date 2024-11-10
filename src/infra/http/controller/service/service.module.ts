import { Module } from '@nestjs/common';

import { CreateServiceUseCase } from '@/domain/platform/application/use-cases/service/create-service';
import { DeleteServiceUseCase } from '@/domain/platform/application/use-cases/service/delete-service';
import { EditServiceUseCase } from '@/domain/platform/application/use-cases/service/edit-service';
import { FetchProfessionalServicesUseCase } from '@/domain/platform/application/use-cases/service/fetch-professional-services';
import { FetchServiceByIdUseCase } from '@/domain/platform/application/use-cases/service/fetch-service-by-id';
import { DatabaseModule } from '@/infra/database/database.module';

import { CreateServiceController } from './create-service.controller';
import { DeleteServiceController } from './delete-service.controller';
import { EditServiceController } from './edit-service.controller';
import { FetchProfessionalServicesController } from './fetch-professional-services.controller';
import { FetchServiceByIdController } from './fetch-service-by-id.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateServiceController,
    FetchProfessionalServicesController,
    FetchServiceByIdController,
    EditServiceController,
    DeleteServiceController,
  ],
  providers: [
    CreateServiceUseCase,
    FetchProfessionalServicesUseCase,
    FetchServiceByIdUseCase,
    EditServiceUseCase,
    DeleteServiceUseCase,
  ],
})
export class ServiceModule { }
