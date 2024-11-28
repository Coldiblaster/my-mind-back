import { makeProfessional } from 'test/factories/make-professional';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';
import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryProfessionalSocialMediaSocialMediaRepository } from 'test/repositories/in-memory-professional-social-media-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { CreateSocialMediaUseCase } from './create-social-media';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;
let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;
let inMemoryProfessionalSocialMediaSocialMediaRepository: InMemoryProfessionalSocialMediaSocialMediaRepository;

let sut: CreateSocialMediaUseCase;

describe('Create professional social media', () => {
  beforeEach(() => {
    inMemoryProfessionalSocialMediaSocialMediaRepository =
      new InMemoryProfessionalSocialMediaSocialMediaRepository();
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository(
      inMemoryServiceRepository,
      inMemoryProfessionalServicesRepository,
    );
    inMemoryProfessionalServicesRepository =
      new InMemoryProfessionalServicesRepository();

    inMemoryServiceRepository = new InMemoryServiceRepository(
      inMemoryProfessionalServicesRepository,
    );

    sut = new CreateSocialMediaUseCase(
      inMemoryProfessionalRepository,
      inMemoryProfessionalSocialMediaSocialMediaRepository,
    );
  });

  it('should be able to create a new social media', async () => {
    const professional = makeProfessional({ providerId: '1' });

    await inMemoryProfessionalRepository.create(professional);

    const result = await sut.execute({
      providerId: '1',
      socialMedias: [
        {
          platform: 'Facebook',
          url: 'https://www.facebook.com/JoeDoe',
        },
      ],
    });

    expect(result.isRight()).toBe(true);
  });
});
