import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ProfessionalSocialMedia } from '@/domain/platform/enterprise/entities/professional-social-media.entity';

import { ProfessionalDoesNotExistError } from '../../errors/professional-does-not-exist-error';
import { ProfessionalRepository } from '../../repositories/professional-repository';
import { ProfessionalSocialMediaRepository } from '../../repositories/professional-social-media-repository';

interface CreateSocialMediaUseCaseRequest {
  providerId: string;
  socialMedias: {
    platform: string;
    url: string;
  }[];
}

type CreateSocialMediaUseCaseResponse = Either<
  ProfessionalDoesNotExistError,
  {
    professionalSocialMedia: ProfessionalSocialMedia[];
  }
>;

@Injectable()
export class CreateSocialMediaUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private professionalSocialMediasRepository: ProfessionalSocialMediaRepository,
  ) { }

  async execute({
    providerId,
    socialMedias,
  }: CreateSocialMediaUseCaseRequest): Promise<CreateSocialMediaUseCaseResponse> {
    const professional =
      await this.professionalRepository.findByProviderID(providerId);

    if (!professional) {
      return left(new ProfessionalDoesNotExistError(providerId));
    }

    const professionalSocialMedia = socialMedias.map(({ platform, url }) => {
      const newProfessionalSocialMedia = ProfessionalSocialMedia.create({
        professionalId: professional.id,
        platform,
        url,
      });

      return newProfessionalSocialMedia;
    });

    await this.professionalSocialMediasRepository.create(
      professionalSocialMedia,
    );

    return right({
      professionalSocialMedia,
    });
  }
}
