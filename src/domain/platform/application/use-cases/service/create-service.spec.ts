import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { CreateServiceUseCase } from './create-service';

let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;

let sut: CreateServiceUseCase;

describe('Create service', () => {
  beforeEach(() => {
    inMemoryProfessionalServicesRepository =
      new InMemoryProfessionalServicesRepository();
    inMemoryServiceRepository = new InMemoryServiceRepository();

    sut = new CreateServiceUseCase(
      inMemoryServiceRepository,
      inMemoryProfessionalServicesRepository,
    );
  });

  it('should be able to create a new service', async () => {
    const result = await sut.execute({
      professionalId: '1',
      description: 'Cabelo',
      time: '30:00',
      value: 50,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryServiceRepository.items[0]).toEqual(result.value?.service);
  });
});
