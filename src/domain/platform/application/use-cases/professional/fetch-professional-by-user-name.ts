import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { Professional } from '@/domain/platform/enterprise/entities/professional.entity';

import { ProfessionalUserNameAlreadyExistsError } from '../../errors/professional-user-name-already-exists-error';
import { ProfessionalRepository } from '../../repositories/professional-repository';

interface FetchProfessionalByUserNameUseCaseRequest {
  userName: string;
}

type FetchProfessionalByUserNameUseCaseResponse = Either<
  ProfessionalUserNameAlreadyExistsError,
  {
    professional: Professional;
  }
>;

@Injectable()
export class FetchProfessionalByUserNameUseCase {
  constructor(private professionalRepository: ProfessionalRepository) { }

  async execute({
    userName,
  }: FetchProfessionalByUserNameUseCaseRequest): Promise<FetchProfessionalByUserNameUseCaseResponse> {
    const professional =
      await this.professionalRepository.findByUserName(userName);

    if (!professional) {
      return left(new ProfessionalUserNameAlreadyExistsError(userName));
    }

    return right({
      professional,
    });
  }
}
