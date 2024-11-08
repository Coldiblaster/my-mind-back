import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { FetchServiceByIdUseCase } from '@/domain/platform/application/use-cases/service/fetch-services-by-id';
import { ServiceDTO } from '@/domain/platform/documents/serviceDTO';

import { ServicePresenter } from '../../presenters/service-presenter';

@Controller('/service/:serviceId')
export class FetchServiceByIdController {
  constructor(private fetchServiceById: FetchServiceByIdUseCase) { }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
    type: [ServiceDTO],
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async handle(@Param('serviceId') serviceId: string) {
    const result = await this.fetchServiceById.execute({
      serviceId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { service: ServicePresenter.toHTTP(result.value.service) };
  }
}
