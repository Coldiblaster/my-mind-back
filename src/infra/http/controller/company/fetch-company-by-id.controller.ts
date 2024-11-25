import { BadRequestException, Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { FetchCompanyByIdUseCase } from '@/domain/platform/application/use-cases/company/fetch-company-by-id';
import { CompanyDTO } from '@/domain/platform/documents/companyDTO';
import { UserPayload } from '@/infra/auth/clerk.strategy';
import { CurrentUser } from '@/infra/auth/current-user.decorator';

import { CompanyPresenter } from '../../presenters/company-presenter';

@Controller('/company')
export class FetchCompanyByIdController {
  constructor(private fetchCompanyById: FetchCompanyByIdUseCase) { }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The request was successful.',
    type: CompanyDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.fetchCompanyById.execute({
      providerId: user.providerId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { company: CompanyPresenter.toHTTP(result.value.company) };
  }
}
