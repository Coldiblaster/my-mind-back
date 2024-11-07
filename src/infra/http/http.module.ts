import { Module } from '@nestjs/common';

import { CreateServiceUseCase } from '@/domain/platform/application/use-cases/service/create-service';
import { RegisterCompanyUseCase } from '@/domain/register/application/use-cases/register-company';

import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { StorageModule } from '../storage/storage.module';
import { RegisterController } from './controller/register.controller';
import { CreateServiceController } from './controller/service/create-service.controller';

@Module({
  imports: [DatabaseModule, StorageModule, CryptographyModule],
  controllers: [RegisterController, CreateServiceController],
  providers: [RegisterCompanyUseCase, CreateServiceUseCase],
})
export class HttpModule { }
