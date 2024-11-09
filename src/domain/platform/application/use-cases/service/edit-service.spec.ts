import { makeService } from 'test/factories/make-service';
import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { EditServiceUseCase } from './edit-service';

let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;

let sut: EditServiceUseCase;

describe('Edit Service', () => {
  beforeEach(() => {
    inMemoryProfessionalServicesRepository =
      new InMemoryProfessionalServicesRepository();

    inMemoryServiceRepository = new InMemoryServiceRepository(
      inMemoryProfessionalServicesRepository,
    );

    sut = new EditServiceUseCase(inMemoryServiceRepository);
  });

  it('should be able to edit a service', async () => {
    const service = makeService();

    await inMemoryServiceRepository.create(service);

    await sut.execute({
      serviceId: service.id.toString(),
      description: 'Cabelo',
      time: 60,
      value: 100,
    });

    expect(inMemoryServiceRepository.items[0]).toMatchObject({
      description: 'Cabelo',
      time: 60,
      value: 100,
    });
  });
});
