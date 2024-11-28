import { makeProfessional } from 'test/factories/make-professional';
import { makeProfessionalServices } from 'test/factories/make-professional-services';
import { makeService } from 'test/factories/make-service';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';
import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { FetchProfessionalByUserNameUseCase } from './fetch-professional-by-user-name';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;
let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;

let sut: FetchProfessionalByUserNameUseCase;

describe('Fetch Professional by userName', () => {
  beforeEach(() => {
    inMemoryProfessionalServicesRepository =
      new InMemoryProfessionalServicesRepository();

    inMemoryServiceRepository = new InMemoryServiceRepository(
      inMemoryProfessionalServicesRepository,
    );

    inMemoryProfessionalRepository = new InMemoryProfessionalRepository(
      inMemoryServiceRepository,
      inMemoryProfessionalServicesRepository,
    );

    sut = new FetchProfessionalByUserNameUseCase(
      inMemoryProfessionalRepository,
    );
  });

  it('should be able to fetch username', async () => {
    const professional = makeProfessional({
      userName: 'joe-doe',
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

    if (professional.userName) {
      const result = await sut.execute({
        userName: professional.userName,
      });

      expect(result.isRight()).toBe(true);
    }
  });
});
