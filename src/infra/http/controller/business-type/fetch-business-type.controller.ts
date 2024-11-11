import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { FetchBusinessTypeUseCase } from '@/domain/platform/application/use-cases/business-type/fetch-business-type';
import { BusinessTypeDTO } from '@/domain/platform/documents/businessTypeDTO';

import { BusinessTypePresenter } from '../../presenters/business-type-presenter';

@Controller('/business-type')
export class FetchBusinessTypeController {
  constructor(private fetchBusinessType: FetchBusinessTypeUseCase) { }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
    type: [BusinessTypeDTO],
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async handle() {
    const result = await this.fetchBusinessType.execute();

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const businessTypes = result.value.businessType;

    return { businessTypes: businessTypes.map(BusinessTypePresenter.toHTTP) };
  }
}
