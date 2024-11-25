import { Module } from '@nestjs/common';

import { EditUserNameUseCase } from '@/domain/platform/application/use-cases/professional/edit-user-name';
import { DatabaseModule } from '@/infra/database/database.module';

import { EditUserNameController } from './edit-user-name.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [EditUserNameController],
  providers: [EditUserNameUseCase],
})
export class ProfessionalModule { }
