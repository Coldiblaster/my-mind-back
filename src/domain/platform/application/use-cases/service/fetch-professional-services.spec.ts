import { makeProfessional } from 'test/factories/make-professional';
import { makeProfessionalServices } from 'test/factories/make-professional-services';
import { makeService } from 'test/factories/make-service';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';
import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { FetchProfessionalServicesUseCase } from './fetch-professional-services';

let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;
let inMemoryProfessionalRepository: InMemoryProfessionalRepository;

let sut: FetchProfessionalServicesUseCase;

describe('Fetch Professional Services', () => {
  beforeEach(() => {
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository(
      inMemoryServiceRepository,
      inMemoryProfessionalServicesRepository,
    );

    inMemoryProfessionalServicesRepository =
      new InMemoryProfessionalServicesRepository();

    inMemoryServiceRepository = new InMemoryServiceRepository(
      inMemoryProfessionalServicesRepository,
    );

    sut = new FetchProfessionalServicesUseCase(
      inMemoryServiceRepository,
      inMemoryProfessionalRepository,
    );
  });

  it('should be able to fetch professional services', async () => {
    const professional = makeProfessional({
      providerId: 'provider-1',
    });

    await inMemoryProfessionalRepository.create(professional);

    const service1 = makeService();
    const service2 = makeService();
    const service3 = makeService();

    await inMemoryServiceRepository.create(service1);
    await inMemoryServiceRepository.create(service2);
    await inMemoryServiceRepository.create(service3);

    const professionalService1 = makeProfessionalServices({
      professionalId: professional.id,
      serviceId: service1.id,
    });

    const professionalService2 = makeProfessionalServices({
      professionalId: professional.id,
      serviceId: service2.id,
    });

    const professionalService3 = makeProfessionalServices({
      professionalId: professional.id,
      serviceId: service3.id,
    });

    inMemoryProfessionalServicesRepository.items.push(professionalService1);
    inMemoryProfessionalServicesRepository.items.push(professionalService2);
    inMemoryProfessionalServicesRepository.items.push(professionalService3);

    const result = await sut.execute({
      page: 1,
      providerId: 'provider-1',
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.services).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            serviceId: service1.id,
          }),
        ]),
      );
    } else {
      throw new Error(
        'Expected result to be right, but got left with an error',
      );
    }
  });

  it('should be able to fetch paginated professional services', async () => {
    const professional = makeProfessional({
      providerId: 'provider-1',
    });

    await inMemoryProfessionalRepository.create(professional);
    for (let i = 1; i <= 22; i++) {
      const service = makeService();

      await inMemoryServiceRepository.create(service);

      const professionalService = makeProfessionalServices({
        professionalId: professional.id,
        serviceId: service.id,
      });

      inMemoryProfessionalServicesRepository.items.push(professionalService);
    }

    const result = await sut.execute({
      providerId: 'provider-1',
      page: 2,
    });

    if (result.isRight()) {
      expect(result.value.services).toHaveLength(2);
    } else {
      throw new Error(
        'Expected result to be right, but got left with an error',
      );
    }
  });
});
