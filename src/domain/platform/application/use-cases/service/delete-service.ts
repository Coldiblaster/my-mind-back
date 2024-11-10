import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

import { ServiceRepository } from '../../repositories/service-repository';

interface DeleteServiceUseCaseRequest {
  serviceId: string;
}

type DeleteServiceUseCaseResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class DeleteServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) { }

  async execute({
    serviceId,
  }: DeleteServiceUseCaseRequest): Promise<DeleteServiceUseCaseResponse> {
    const service = await this.serviceRepository.findByID(serviceId);

    if (!service) {
      return left(new ResourceNotFoundError());
    }

    service.isActive = false;

    await this.serviceRepository.delete(service);

    return right(null);
  }
}
