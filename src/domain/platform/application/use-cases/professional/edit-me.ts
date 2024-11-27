import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { Professional } from '@/domain/platform/enterprise/entities/professional.entity';

import { ProfessionalDoesNotExistError } from '../../errors/professional-does-not-exist-error';
import { ProfessionalRepository } from '../../repositories/professional-repository';

interface EditMeUseCaseRequest {
  document?: string;
  name?: string;
  bio?: string;
  occupation?: string;
  providerId: string;
}

type EditMeUseCaseResponse = Either<
  ProfessionalDoesNotExistError,
  {
    professional: Professional;
  }
>;

@Injectable()
export class EditMeUseCase {
  constructor(private professionalRepository: ProfessionalRepository) { }

  async execute({
    providerId,
    bio,
    document,
    name,
    occupation,
  }: EditMeUseCaseRequest): Promise<EditMeUseCaseResponse> {
    const professional =
      await this.professionalRepository.findByProviderID(providerId);

    if (!professional) {
      return left(new ProfessionalDoesNotExistError(providerId));
    }

    professional.bio = bio;
    professional.document = document;
    professional.name = name;
    professional.occupation = occupation;

    await this.professionalRepository.save(professional);

    return right({
      professional,
    });
  }
}
