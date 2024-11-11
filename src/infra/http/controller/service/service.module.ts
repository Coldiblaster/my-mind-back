import { Module } from '@nestjs/common';

import { CreateServiceUseCase } from '@/domain/platform/application/use-cases/service/create-service';
import { CreateServiceSuggestionUseCase } from '@/domain/platform/application/use-cases/service/create-service-suggestion';
import { DeleteServiceUseCase } from '@/domain/platform/application/use-cases/service/delete-service';
import { EditServiceUseCase } from '@/domain/platform/application/use-cases/service/edit-service';
import { FetchProfessionalServicesUseCase } from '@/domain/platform/application/use-cases/service/fetch-professional-services';
import { FetchServiceByIdUseCase } from '@/domain/platform/application/use-cases/service/fetch-service-by-id';
import { DatabaseModule } from '@/infra/database/database.module';
import { EnvModule } from '@/infra/env/env.module';
import { IaModule } from '@/infra/ia/ia.module';

import { CreateServiceController } from './create-service.controller';
import { CreateServiceSuggestionController } from './create-service-suggestion.controller';
import { DeleteServiceController } from './delete-service.controller';
import { EditServiceController } from './edit-service.controller';
import { FetchProfessionalServicesController } from './fetch-professional-services.controller';
import { FetchServiceByIdController } from './fetch-service-by-id.controller';

@Module({
  imports: [DatabaseModule, EnvModule, IaModule],
  controllers: [
    CreateServiceController,
    CreateServiceSuggestionController,
    FetchProfessionalServicesController,
    FetchServiceByIdController,
    EditServiceController,
    DeleteServiceController,
  ],
  providers: [
    CreateServiceUseCase,
    CreateServiceSuggestionUseCase,
    FetchProfessionalServicesUseCase,
    FetchServiceByIdUseCase,
    EditServiceUseCase,
    DeleteServiceUseCase,
  ],
})
export class ServiceModule { }
