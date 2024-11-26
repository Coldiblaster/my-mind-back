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
import { ProfessionalUserNameAlreadyExistsError } from '@/domain/platform/application/errors/professional-user-name-already-exists-error';
import { EditUserNameUseCase } from '@/domain/platform/application/use-cases/professional/edit-user-name';
import { UserPayload } from '@/infra/auth/clerk.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const editUserNameBodySchema = z.object({
  userName: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editUserNameBodySchema);

type EditUserNameBodySchema = z.infer<typeof editUserNameBodySchema>;

export class EditUserNameBodyDTO extends createZodDto(editUserNameBodySchema) { }

@Controller('/professional/update-username')
export class EditUserNameController {
  constructor(private editUserName: EditUserNameUseCase) { }

  @Put()
  @ApiBody({
    type: EditUserNameBodyDTO,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async handle(
    @Body(bodyValidationPipe) body: EditUserNameBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { userName } = body;

    const result = await this.editUserName.execute({
      userName,
      providerId: user.providerId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ProfessionalDoesNotExistError:
          throw new NotFoundException(error.message);
        case ProfessionalUserNameAlreadyExistsError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
