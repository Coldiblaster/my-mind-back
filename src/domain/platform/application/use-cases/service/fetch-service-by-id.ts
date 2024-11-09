import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Service } from '@/domain/platform/enterprise/entities/service.entity';

import { ServiceRepository } from '../../repositories/service-repository';

interface FetchServiceByIdUseCaseRequest {
  serviceId: string;
}

type FetchServiceByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    service: Service;
  }
>;

@Injectable()
export class FetchServiceByIdUseCase {
  constructor(private serviceRepository: ServiceRepository) { }

  async execute({
    serviceId,
  }: FetchServiceByIdUseCaseRequest): Promise<FetchServiceByIdUseCaseResponse> {
    const service = await this.serviceRepository.findByID(serviceId);

    if (!service) {
      return left(new ResourceNotFoundError());
    }

    return right({
      service,
    });
  }
}
