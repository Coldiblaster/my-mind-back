import { makeProfessional } from 'test/factories/make-professional';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';
import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { CreateServiceUseCase } from './create-service';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;
let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;

let sut: CreateServiceUseCase;

describe('Create service', () => {
  beforeEach(() => {
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository();
    inMemoryProfessionalServicesRepository =
      new InMemoryProfessionalServicesRepository();
    inMemoryServiceRepository = new InMemoryServiceRepository();

    sut = new CreateServiceUseCase(
      inMemoryProfessionalRepository,
      inMemoryServiceRepository,
      inMemoryProfessionalServicesRepository,
    );
  });

  it('should be able to create a new service', async () => {
    const professional = makeProfessional({ providerId: '1' });

    await inMemoryProfessionalRepository.create(professional);

    const result = await sut.execute({
      providerId: '1',
      description: 'Cabelo',
      time: '30:00',
      value: 50,
    });

    expect(result.isRight()).toBe(true);
  });
});
