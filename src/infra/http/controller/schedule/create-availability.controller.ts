import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

import { AvailabilityConflictError } from '@/domain/platform/application/errors/availability-conflict-error';
import { ProfessionalDoesNotExistError } from '@/domain/platform/application/errors/professional-does-not-exist-error';
import { CreateAvailabilityUseCase } from '@/domain/platform/application/use-cases/schedule/create-availability';
import {
  CreateAvailabilityDTO,
  CreateAvailabilitySchema,
  createAvailabilitySchema,
} from '@/domain/platform/validations/create-availability-schema';
import { UserPayload } from '@/infra/auth/clerk.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

const bodyValidationPipe = new ZodValidationPipe(createAvailabilitySchema);

@Controller('/availability')
export class CreateAvailabilityController {
  constructor(private createAvailabilityCompany: CreateAvailabilityUseCase) { }

  @Post()
  @ApiBody({
    type: CreateAvailabilityDTO,
    description:
      'Exemplo de data para testar.\n\n**Lembre-se de mudar o dia pelo menos, deve ser o dia atual e hora acima da atual**: `2024-12-10T11:00:00.000Z`.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async handle(
    @Body(bodyValidationPipe) body: CreateAvailabilitySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { date, timeSlots } = body;

    const result = await this.createAvailabilityCompany.execute({
      providerId: user.providerId,
      date,
      timeSlots,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ProfessionalDoesNotExistError:
          throw new UnauthorizedException(error.message);
        case AvailabilityConflictError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
