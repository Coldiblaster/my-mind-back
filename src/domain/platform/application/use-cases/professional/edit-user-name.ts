import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { Professional } from '@/domain/platform/enterprise/entities/professional.entity';

import { ProfessionalDoesNotExistError } from '../../errors/professional-does-not-exist-error';
import { ProfessionalUserNameAlreadyExistsError } from '../../errors/professional-user-name-already-exists-error';
import { ProfessionalRepository } from '../../repositories/professional-repository';

interface EditUserNameUseCaseRequest {
  userName: string;
  providerId: string;
}

type EditUserNameUseCaseResponse = Either<
  ProfessionalDoesNotExistError | ProfessionalUserNameAlreadyExistsError,
  {
    professional: Professional;
  }
>;

@Injectable()
export class EditUserNameUseCase {
  constructor(private professionalRepository: ProfessionalRepository) { }

  async execute({
    userName,
    providerId,
  }: EditUserNameUseCaseRequest): Promise<EditUserNameUseCaseResponse> {
    const professionalWithSameUserName =
      await this.professionalRepository.findDetailsByUserName(userName);

    if (professionalWithSameUserName) {
      return left(new ProfessionalUserNameAlreadyExistsError(userName));
    }

    const professional =
      await this.professionalRepository.findByProviderID(providerId);

    if (!professional) {
      return left(new ProfessionalDoesNotExistError(providerId));
    }

    professional.userName = userName;

    await this.professionalRepository.save(professional);

    return right({
      professional,
    });
  }
}
