import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ProfessionalRepository } from '@/domain/platform/application/repositories/professional-repository';

import { WrongCredentialsError } from '../errors/wrong-credentials-error';

interface AuthenticateUseCaseRequest {
  email: string;
  providerToken: string;
}

type AuthenticateUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateUseCase {
  constructor(private professionalRepository: ProfessionalRepository) { }

  async execute({
    email,
    providerToken,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const professional = await this.professionalRepository.findByEmail(email);

    if (!professional) {
      return left(new WrongCredentialsError());
    }

    // const isPasswordValid = await this.hashComparer.compare(
    //   password,
    //   student.password,
    // );

    // if (!isPasswordValid) {
    //   return left(new WrongCredentialsError());
    // }

    // const accessToken = await this.encrypter.encrypt({
    //   sub: 1,
    // });

    return right({
      accessToken: '11',
    });
  }
}
