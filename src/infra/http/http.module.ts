import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { RegisterCompanyUseCase } from '@/domain/register/application/use-cases/register-company';

import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { StorageModule } from '../storage/storage.module';
import { BusinessTypeModule } from './controller/business-type/business-type.module';
import { RegisterController } from './controller/register.controller';
import { ScheduleModule } from './controller/schedule/schedule.module';
import { ServiceModule } from './controller/service/service.module';

@Module({
  imports: [
    DatabaseModule,
    StorageModule,
    CryptographyModule,
    ServiceModule,
    BusinessTypeModule,
    ScheduleModule,
  ],
  controllers: [RegisterController],
  providers: [
    RegisterCompanyUseCase,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class HttpModule { }
