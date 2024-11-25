import { Module } from '@nestjs/common';

import { EditCompanyLinkUseCase } from '@/domain/platform/application/use-cases/company/edit-company-link';
import { FetchCompanyByIdUseCase } from '@/domain/platform/application/use-cases/company/fetch-company-by-id';
import { DatabaseModule } from '@/infra/database/database.module';

import { EditCompanyLinkController } from './edit-company-link.controller';
import { FetchCompanyByIdController } from './fetch-company-by-id.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [EditCompanyLinkController, FetchCompanyByIdController],
  providers: [EditCompanyLinkUseCase, FetchCompanyByIdUseCase],
})
export class CompanyModule { }
