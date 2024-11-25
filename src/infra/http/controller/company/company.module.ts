import { Module } from '@nestjs/common';

import { EditCompanyLinkUseCase } from '@/domain/platform/application/use-cases/company/edit-company-link';
import { DatabaseModule } from '@/infra/database/database.module';

import { EditCompanyLinkController } from './edit-company-link.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [EditCompanyLinkController],
  providers: [EditCompanyLinkUseCase],
})
export class CompanyModule { }
