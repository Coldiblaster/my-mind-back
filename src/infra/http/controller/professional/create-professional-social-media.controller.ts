import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { ProfessionalDoesNotExistError } from '@/domain/platform/application/errors/professional-does-not-exist-error';
import { CreateSocialMediaUseCase } from '@/domain/platform/application/use-cases/professional/create-social-media';
import { UserPayload } from '@/infra/auth/clerk.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

export const createProfessionalSocialMediaBodySchema = z.object({
  socialMedias: z.array(
    z.object({
      url: z.string(),
      platform: z.string(),
    }),
  ),
});

const bodyValidationPipe = new ZodValidationPipe(
  createProfessionalSocialMediaBodySchema,
);

type CreateProfessionalSocialMediaSchemaBody = z.infer<
  typeof createProfessionalSocialMediaBodySchema
>;

export class CreateProfessionalSocialMediaDTO extends createZodDto(
  createProfessionalSocialMediaBodySchema,
) { }

@Controller('/professional/social-media')
export class CreateProfessionalSocialMediaController {
  constructor(private createSocialMediaUseCase: CreateSocialMediaUseCase) { }

  @Post()
  @ApiBody({
    type: CreateProfessionalSocialMediaDTO,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async handle(
    @Body(bodyValidationPipe) body: CreateProfessionalSocialMediaSchemaBody,
    @CurrentUser() user: UserPayload,
  ) {
    const { socialMedias } = body;

    const result = await this.createSocialMediaUseCase.execute({
      providerId: user.providerId,
      socialMedias,
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
