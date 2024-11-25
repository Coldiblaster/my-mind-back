import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { Company } from '@/domain/platform/enterprise/entities/company.entity';

import { CompanyDoesNotExistError } from '../../errors/company-does-not-exist-error';
import { ProfessionalDoesNotExistError } from '../../errors/professional-does-not-exist-error';
import { CompanyRepository } from '../../repositories/company-repository';
import { ProfessionalRepository } from '../../repositories/professional-repository';

interface FetchCompanyByIdUseCaseRequest {
  providerId: string;
}

type FetchCompanyByIdUseCaseResponse = Either<
  ProfessionalDoesNotExistError | CompanyDoesNotExistError,
  {
    company: Company;
  }
>;

@Injectable()
export class FetchCompanyByIdUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private companyRepository: CompanyRepository,
  ) { }

  async execute({
    providerId,
  }: FetchCompanyByIdUseCaseRequest): Promise<FetchCompanyByIdUseCaseResponse> {
    const professional =
      await this.professionalRepository.findByProviderID(providerId);

    if (!professional) {
      return left(new ProfessionalDoesNotExistError(providerId));
    }

    const company = await this.companyRepository.findByID(
      professional.companyId.toString(),
    );

    if (!company) {
      return left(
        new CompanyDoesNotExistError(professional.companyId.toString()),
      );
    }

    return right({
      company,
    });
  }
}
