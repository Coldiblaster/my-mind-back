import { Injectable } from '@nestjs/common';

import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ProfessionalServices } from '@/domain/platform/enterprise/entities/professional-services';
import { Service } from '@/domain/platform/enterprise/entities/service';

import { ProfessionalServicesRepository } from '../../repositories/professional-services-repository';
import { ServiceRepository } from '../../repositories/service-repository';

interface CreateServiceUseCaseRequest {
  description: string;
  value: number;
  time: string;
  professionalId: string;
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
    professionalId,
  }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const newService = Service.create({
      description,
      time,
      value,
    });

    await this.serviceRepository.create(newService);

    const newProfessionalServices = ProfessionalServices.create({
      serviceId: newService.id,
      professionalId: new UniqueEntityID(professionalId),
    });

    await this.ProfessionalServicesRepository.create(newProfessionalServices);

    return right({
      service: newService,
    });
  }
}
