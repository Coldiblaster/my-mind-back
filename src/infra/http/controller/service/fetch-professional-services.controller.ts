import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { z } from 'zod';

import { ProfessionalDoesNotExistError } from '@/domain/platform/application/errors/professional-does-not-exist-error';
import { FetchProfessionalServicesUseCase } from '@/domain/platform/application/use-cases/service/fetch-professional-services';
import { ProfessionalWithServiceDTO } from '@/domain/platform/documents/professionalWithServiceDTO';
import { UserPayload } from '@/infra/auth/clerk.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

import { ProfessionalWithServicePresenter } from '../../presenters/professional-with-presenter';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/service')
export class FetchProfessionalServicesController {
  constructor(
    private fetchProfessionalServices: FetchProfessionalServicesUseCase,
  ) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false, // Garantindo que o parâmetro seja opcional
    description: 'Paginação. Valor padrão é 1.',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
    type: [ProfessionalWithServiceDTO],
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.fetchProfessionalServices.execute({
      page,
      providerId: user.providerId,
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

    const services = result.value.services;

    return { services: services.map(ProfessionalWithServicePresenter.toHTTP) };
  }
}
