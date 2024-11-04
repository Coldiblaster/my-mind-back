import { Module } from '@nestjs/common';

import { RegisterCompanyUseCase } from '@/domain/register/application/use-cases/register-company';

import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { StorageModule } from '../storage/storage.module';
import { RegisterController } from './controller/register.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [RegisterController],
  providers: [RegisterCompanyUseCase],
})
export class HttpModule { }
