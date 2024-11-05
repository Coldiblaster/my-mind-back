import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Address } from '@/domain/platform/enterprise/entities/address';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours';
import { Professional } from '@/domain/platform/enterprise/entities/professional';
import { ProfessionalServices } from '@/domain/platform/enterprise/entities/professional-services';
import { Service } from '@/domain/platform/enterprise/entities/service';

import { CompanyRepository } from '../../repositories/company-repository';
import { ProfessionalServicesRepository } from '../../repositories/professional-services-repository';
import { ServiceRepository } from '../../repositories/services-repository';

interface CreateServiceUseCaseRequest {
  description: string;
  value: number;
  time: string;
  companyId: string;
}

type CreateServiceUseCaseResponse = Either<
  null,
  {
    service: Service;
  }
>;

@Injectable()
export class CreateServiceUseCase {
  constructor(
    private serviceRepository: ServiceRepository,
    private ProfessionalServicesRepository: ProfessionalServicesRepository,
  ) { }

  async execute({
    description,
    time,
    value,
    companyId,
  }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const newService = Service.create({
      description,
      time,
      value,
    });

    await this.serviceRepository.create(newService);

    const newProfessionalServices = ProfessionalServices.create({
      serviceId: newService.id,
      professionalId: new UniqueEntityID(companyId),
    });

    await this.ProfessionalServicesRepository.create(newProfessionalServices);

    return right({
      service: newService,
    });
  }
}
