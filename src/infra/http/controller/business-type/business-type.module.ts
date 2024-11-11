import { Module } from '@nestjs/common';

import { FetchBusinessTypeUseCase } from '@/domain/platform/application/use-cases/business-type/fetch-business-type';
import { FetchBusinessTypeByIdUseCase } from '@/domain/platform/application/use-cases/business-type/fetch-business-type-by-id';
import { DatabaseModule } from '@/infra/database/database.module';

import { FetchBusinessTypeController } from './fetch-business-type.controller';
import { FetchBusinessTypeByIdController } from './fetch-business-type-by-id.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [FetchBusinessTypeByIdController, FetchBusinessTypeController],
  providers: [FetchBusinessTypeUseCase, FetchBusinessTypeByIdUseCase],
})
export class BusinessTypeModule { }
