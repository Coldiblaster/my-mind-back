import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Service } from '@/domain/platform/enterprise/entities/service.entity';

import { ServiceRepository } from '../../repositories/service-repository';

interface EditServiceUseCaseRequest {
  serviceId: string;
  description?: string;
  value?: number;
  time?: number;
}

type EditServiceUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    service: Service;
  }
>;

@Injectable()
export class EditServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) { }

  async execute({
    serviceId,
    description,
    time,
    value,
  }: EditServiceUseCaseRequest): Promise<EditServiceUseCaseResponse> {
    const service = await this.serviceRepository.findByID(serviceId);

    if (!service) {
      return left(new ResourceNotFoundError());
    }

    if (time) service.time = time;
    if (value) service.value = value;
    if (description) service.description = description;

    await this.serviceRepository.save(service);

    return right({
      service,
    });
  }
}
