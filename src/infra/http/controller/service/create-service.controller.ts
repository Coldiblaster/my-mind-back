import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

import { ProfessionalDoesNotExistError } from '@/domain/platform/application/errors/professional-does-not-exist-error';
import { CreateServiceUseCase } from '@/domain/platform/application/use-cases/service/create-service';
import {
  CreateServiceDTO,
  CreateServiceSchema,
  createServiceSchema,
} from '@/domain/platform/validations/create-service-schema';
import { UserPayload } from '@/infra/auth/clerk.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

const bodyValidationPipe = new ZodValidationPipe(createServiceSchema);

@Controller('/service')
export class CreateServiceController {
  constructor(private createServiceCompany: CreateServiceUseCase) {}

  @Post()
  @ApiBody({
    type: CreateServiceDTO, // Passando o schema OpenAPI do Zod para o Swagger
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async handle(
    @Body(bodyValidationPipe) body: CreateServiceSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { description, time, value } = body;

    const result = await this.createServiceCompany.execute({
      description,
      providerId: user.providerId,
      time,
      value,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ProfessionalDoesNotExistError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
