import { Module } from '@nestjs/common';

import { CreateAvailabilityUseCase } from '@/domain/platform/application/use-cases/schedule/create-availability';
import { DatabaseModule } from '@/infra/database/database.module';

import { CreateAvailabilityController } from './create-availability.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAvailabilityController],
  providers: [CreateAvailabilityUseCase],
})
export class ScheduleModule { }
