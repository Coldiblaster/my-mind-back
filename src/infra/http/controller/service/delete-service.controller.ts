import { BadRequestException, Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { DeleteServiceUseCase } from '@/domain/platform/application/use-cases/service/delete-service';

@Controller('/service/:id')
export class DeleteServiceController {
  constructor(private deleteService: DeleteServiceUseCase) { }

  @Delete()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async handle(@Param('id') serviceId: string) {
    const result = await this.deleteService.execute({
      serviceId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
