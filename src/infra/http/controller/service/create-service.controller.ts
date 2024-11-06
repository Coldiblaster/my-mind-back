import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';

import { CreateServiceUseCase } from '@/domain/platform/application/use-cases/service/create-service';
import {
  CreateServiceSchema,
  createServiceSchema,
} from '@/domain/platform/validations/create-service-schema';
import { UserPayload } from '@/infra/auth/clerk.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

const bodyValidationPipe = new ZodValidationPipe(createServiceSchema);

@Controller('/service')
export class CreateServiceController {
  constructor(private createServiceCompany: CreateServiceUseCase) { }

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateServiceSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { description, time, value } = body;

    const result = await this.createServiceCompany.execute({
      description,
      professionalId: user.professionalId,
      time,
      value,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
