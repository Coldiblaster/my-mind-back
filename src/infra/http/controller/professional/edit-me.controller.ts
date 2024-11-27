import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { ProfessionalDoesNotExistError } from '@/domain/platform/application/errors/professional-does-not-exist-error';
import { EditMeUseCase } from '@/domain/platform/application/use-cases/professional/edit-me';
import { UserPayload } from '@/infra/auth/clerk.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const editMeBodySchema = z.object({
  bio: z.string().optional(),
  document: z.string().optional(),
  name: z.string().optional(),
  occupation: z.string().optional(),
});

const bodyValidationPipe = new ZodValidationPipe(editMeBodySchema);

type EditMeBodySchema = z.infer<typeof editMeBodySchema>;

export class EditMeBodyDTO extends createZodDto(editMeBodySchema) { }

@Controller('/professional/me')
export class EditMeController {
  constructor(private editMe: EditMeUseCase) { }

  @Put()
  @ApiBody({
    type: EditMeBodyDTO,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async handle(
    @Body(bodyValidationPipe) body: EditMeBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { bio, document, name, occupation } = body;

    const result = await this.editMe.execute({
      bio,
      document,
      name,
      occupation,
      providerId: user.providerId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ProfessionalDoesNotExistError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
