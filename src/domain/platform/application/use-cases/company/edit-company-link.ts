import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { Professional } from '@/domain/platform/enterprise/entities/professional.entity';

import { CompanyDoesNotExistError } from '../../errors/company-does-not-exist-error';
import { CompanyLinkAlreadyExistsError } from '../../errors/company-link-already-exists-error';
import { ProfessionalDoesNotExistError } from '../../errors/professional-does-not-exist-error';
import { CompanyRepository } from '../../repositories/company-repository';
import { ProfessionalRepository } from '../../repositories/professional-repository';

interface EditCompanyLinkUseCaseRequest {
  link: string;
  providerId: string;
}

type EditCompanyLinkUseCaseResponse = Either<
  | CompanyLinkAlreadyExistsError
  | ProfessionalDoesNotExistError
  | CompanyDoesNotExistError,
  {
    professional: Professional;
  }
>;

@Injectable()
export class EditCompanyLinkUseCase {
  constructor(
    private companyRepository: CompanyRepository,
    private professionalRepository: ProfessionalRepository,
  ) { }

  async execute({
    link,
    providerId,
  }: EditCompanyLinkUseCaseRequest): Promise<EditCompanyLinkUseCaseResponse> {
    const companyWithSameCompanyLink =
      await this.companyRepository.findByCompanyLink(link);

    if (companyWithSameCompanyLink) {
      return left(new CompanyLinkAlreadyExistsError(link));
    }

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

    company.link = link;

    await this.companyRepository.save(company);

    return right({
      professional,
    });
  }
}
