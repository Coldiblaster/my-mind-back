import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ProfessionalServices } from '@/domain/platform/enterprise/entities/professional-services.entity';
import { Service } from '@/domain/platform/enterprise/entities/service.entity';

import { ProfessionalDoesNotExistError } from '../../errors/professional-does-not-exist-error';
import { ProfessionalRepository } from '../../repositories/professional-repository';
import { ProfessionalServicesRepository } from '../../repositories/professional-services-repository';
import { ServiceRepository } from '../../repositories/service-repository';

interface CreateServiceUseCaseRequest {
  description: string;
  value: number;
  time: number;
  providerId: string;
}

type CreateServiceUseCaseResponse = Either<
  ProfessionalDoesNotExistError,
  {
    service: Service;
  }
>;

@Injectable()
export class CreateServiceUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private serviceRepository: ServiceRepository,
    private professionalServicesRepository: ProfessionalServicesRepository,
  ) { }

  async execute({
    description,
    time,
    value,
    providerId,
  }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const professional =
      await this.professionalRepository.findByProviderID(providerId);

    if (!professional) {
      return left(new ProfessionalDoesNotExistError(providerId));
    }

    const newService = Service.create({
      description,
      time,
      value,
    });

    await this.serviceRepository.create(newService);

    const newProfessionalServices = ProfessionalServices.create({
      serviceId: newService.id,
      professionalId: professional.id,
    });

    await this.professionalServicesRepository.create(newProfessionalServices);

    return right({
      service: newService,
    });
  }
}
