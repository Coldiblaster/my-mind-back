import {
  BadRequestException,
  Body,
  Controller,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { CompanyDoesNotExistError } from '@/domain/platform/application/errors/company-does-not-exist-error';
import { CompanyLinkAlreadyExistsError } from '@/domain/platform/application/errors/company-link-already-exists-error';
import { ProfessionalDoesNotExistError } from '@/domain/platform/application/errors/professional-does-not-exist-error';
import { EditCompanyLinkUseCase } from '@/domain/platform/application/use-cases/company/edit-company-link';
import { UserPayload } from '@/infra/auth/clerk.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const editCompanyLinkBodySchema = z.object({
  link: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editCompanyLinkBodySchema);

type EditCompanyLinkBodySchema = z.infer<typeof editCompanyLinkBodySchema>;

export class EditCompanyLinkBodyDTO extends createZodDto(
  editCompanyLinkBodySchema,
) { }

@Controller('/company/update-link')
export class EditCompanyLinkController {
  constructor(private editCompanyLink: EditCompanyLinkUseCase) { }

  @Put()
  @ApiBody({
    type: EditCompanyLinkBodyDTO,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async handle(
    @Body(bodyValidationPipe) body: EditCompanyLinkBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { link } = body;

    const result = await this.editCompanyLink.execute({
      link,
      providerId: user.providerId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case CompanyLinkAlreadyExistsError:
          throw new UnauthorizedException(error.message);
        case ProfessionalDoesNotExistError:
          throw new UnauthorizedException(error.message);
        case CompanyDoesNotExistError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
