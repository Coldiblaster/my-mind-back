import { Module } from '@nestjs/common';

import { EditUserNameUseCase } from '@/domain/platform/application/use-cases/professional/edit-user-name';
import { FetchProfessionalByUserNameUseCase } from '@/domain/platform/application/use-cases/professional/fetch-professional-by-user-name';
import { DatabaseModule } from '@/infra/database/database.module';

import { EditUserNameController } from './edit-user-name.controller';
import { FetchProfessionalByUserNameController } from './fetch-professional-by-user-name.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [EditUserNameController, FetchProfessionalByUserNameController],
  providers: [EditUserNameUseCase, FetchProfessionalByUserNameUseCase],
})
export class ProfessionalModule { }
