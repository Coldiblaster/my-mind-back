import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { EditServiceUseCase } from '@/domain/platform/application/use-cases/service/edit-service';

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const editServiceBodySchema = z.object({
  description: z.string().optional(),
  value: z.number().optional(),
  time: z.number().optional(),
});

const bodyValidationPipe = new ZodValidationPipe(editServiceBodySchema);

type EditServiceBodySchema = z.infer<typeof editServiceBodySchema>;

export class EditServiceBodyDTO extends createZodDto(editServiceBodySchema) { }

@Controller('/service/:id')
export class EditServiceController {
  constructor(private editService: EditServiceUseCase) { }

  @Put()
  @ApiBody({
    type: EditServiceBodyDTO, // Passando o schema OpenAPI do Zod para o Swagger
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async handle(
    @Body(bodyValidationPipe) body: EditServiceBodySchema,
    @Param('id') serviceId: string,
  ) {
    const { description, time, value } = body;

    const result = await this.editService.execute({
      serviceId,
      description,
      time,
      value,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
