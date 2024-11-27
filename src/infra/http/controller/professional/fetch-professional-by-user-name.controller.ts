import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ProfessionalUserNameAlreadyExistsError } from '@/domain/platform/application/errors/professional-user-name-already-exists-error';
import { FetchProfessionalByUserNameUseCase } from '@/domain/platform/application/use-cases/professional/fetch-professional-by-user-name';
import { ProfessionalPublicDTO } from '@/domain/platform/documents/professionalPublicDTO';
import { Public } from '@/infra/auth/public';

import { ProfessionalPublicPresenter } from '../../presenters/professional-public-presenter';

@Controller('/professional/profile/:userName')
export class FetchProfessionalByUserNameController {
  constructor(
    private fetchProfessionalByUserName: FetchProfessionalByUserNameUseCase,
  ) { }

  @Get()
  @Public()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
    type: ProfessionalPublicDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async handle(@Param('userName') userName: string) {
    const result = await this.fetchProfessionalByUserName.execute({
      userName,
    });
    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ProfessionalUserNameAlreadyExistsError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return ProfessionalPublicPresenter.toHTTP(result.value.professional);
  }
}
