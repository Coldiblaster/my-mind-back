import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ProfessionalWithService } from '@/domain/platform/enterprise/entities/value-objects/professional-with-service';

import { ProfessionalDoesNotExistError } from '../../errors/professional-does-not-exist-error';
import { ProfessionalRepository } from '../../repositories/professional-repository';
import { ServiceRepository } from '../../repositories/service-repository';

interface FetchProfessionalServicesUseCaseRequest {
  page: number;
  providerId: string;
}

type FetchProfessionalServicesUseCaseResponse = Either<
  ProfessionalDoesNotExistError,
  {
    services: ProfessionalWithService[];
  }
>;

@Injectable()
export class FetchProfessionalServicesUseCase {
  constructor(
    private serviceRepository: ServiceRepository,
    private professionalRepository: ProfessionalRepository,
  ) {}

  async execute({
    page,
    providerId,
  }: FetchProfessionalServicesUseCaseRequest): Promise<FetchProfessionalServicesUseCaseResponse> {
    const professional =
      await this.professionalRepository.findByProviderID(providerId);

    if (!professional) {
      return left(new ProfessionalDoesNotExistError(providerId));
    }

    const services = await this.serviceRepository.findServicesByProfessionalId(
      professional.id.toString(),
      {
        page,
      },
    );

    return right({
      services,
    });
  }
}
