import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { CreateServiceSuggestionUseCase } from '@/domain/platform/application/use-cases/service/create-service-suggestion';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

import { ServiceSuggestionPresenter } from '../../presenters/service-suggestion-presenter';

const createServiceSuggestionBodySchema = z.object({
  businessTypeId: z.number().optional().default(0),
  segment: z.string(),
});

type CreateServiceSuggestionBodySchema = z.infer<
  typeof createServiceSuggestionBodySchema
>;

const bodyValidationPipe = new ZodValidationPipe(
  createServiceSuggestionBodySchema,
);

@Controller('/service-suggestion/generate')
export class CreateServiceSuggestionController {
  constructor(
    private createServiceSuggestion: CreateServiceSuggestionUseCase,
  ) { }

  @Post()
  @ApiBody({
    type: createZodDto(createServiceSuggestionBodySchema),
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async handle(
    @Body(bodyValidationPipe) body: CreateServiceSuggestionBodySchema,
  ) {
    const { segment, businessTypeId } = body;

    const result = await this.createServiceSuggestion.execute({
      segment,
      businessTypeId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const serviceSuggestions = result.value.serviceSuggestions;

    return {
      services: serviceSuggestions.map(ServiceSuggestionPresenter.toHTTP),
    };
  }
}
