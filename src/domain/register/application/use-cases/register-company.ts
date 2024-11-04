import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ProfessionalRepository } from '@/domain/platform/application/repositories/professional-repository';
import { Address } from '@/domain/platform/enterprise/entities/address';
import { Company } from '@/domain/platform/enterprise/entities/company';
import { CompanyServices } from '@/domain/platform/enterprise/entities/company-services';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours';
import { Professional } from '@/domain/platform/enterprise/entities/professional';
import { Service } from '@/domain/platform/enterprise/entities/service';

import { RegisterRepository } from '../repositories/register-repository';
import { CreateCompanySchema } from '../validations/create-company-schema';
import { ProfessionalAlreadyExistsError } from './errors/professional-already-exists-error';

type RegisterCompanyUseCaseResponse = Either<
  ProfessionalAlreadyExistsError,
  {
    newCompany: Company;
  }
>;

@Injectable()
export class RegisterCompanyUseCase {
  constructor(
    private registerRepository: RegisterRepository,
    private professionalRepository: ProfessionalRepository,
  ) { }

  async execute({
    businessTypeId,
    customSegment,
    address,
    services = [],
    operatingHours,
    email,
    clerkId,
  }: CreateCompanySchema): Promise<RegisterCompanyUseCaseResponse> {
    const professionalWithSameEmail =
      await this.professionalRepository.findByEmail(email);

    if (professionalWithSameEmail) {
      return left(new ProfessionalAlreadyExistsError(email));
    }

    const newAddress = Address.create(address);

    const newCompany = Company.create({
      addressId: newAddress.id,
      businessTypeId,
      customSegment,
    });

    const newProfessional = Professional.create({
      email,
      clerkId,
      companyId: newCompany.id,
      role: 'EMPLOYEE',
    });

    const companyServices = services.map(service => {
      const newService = Service.create({
        description: service.description,
        time: service.time,
        value: service.value,
      });

      return {
        newService,
        companyId: newCompany.id,
      };
    });

    await this.registerRepository.registerCompanyWithDetails({
      professional: newProfessional,
      address: newAddress,
      openingHours: operatingHours.days.map(day =>
        OpeningHours.create({ ...day, companyId: newCompany.id }),
      ),
      services: companyServices.map(({ newService }) => newService),
      companyServices: companyServices.map(({ newService }) =>
        CompanyServices.create({
          serviceId: newService.id,
          companyId: newCompany.id,
        }),
      ),
      company: newCompany,
    });

    return right({
      newCompany,
    });
  }
}
