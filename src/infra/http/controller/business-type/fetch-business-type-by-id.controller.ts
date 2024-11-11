import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { FetchBusinessTypeByIdUseCase } from '@/domain/platform/application/use-cases/business-type/fetch-business-type-by-id';
import { BusinessTypeDTO } from '@/domain/platform/documents/businessTypeDTO';

import { BusinessTypePresenter } from '../../presenters/business-type-presenter';

@Controller('/business-type/:businessTypeId')
export class FetchBusinessTypeByIdController {
  constructor(private fetchBusinessTypeById: FetchBusinessTypeByIdUseCase) { }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
    type: BusinessTypeDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async handle(@Param('businessTypeId') businessTypeId: number) {
    const result = await this.fetchBusinessTypeById.execute({
      businessTypeId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return {
      businessType: BusinessTypePresenter.toHTTP(result.value.businessType),
    };
  }
}
