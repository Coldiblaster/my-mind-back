import { makeService } from 'test/factories/make-service';
import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';

import { DeleteServiceUseCase } from './delete-service';

let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;

let sut: DeleteServiceUseCase;

describe('Delete Service', () => {
  beforeEach(() => {
    inMemoryProfessionalServicesRepository =
      new InMemoryProfessionalServicesRepository();

    inMemoryServiceRepository = new InMemoryServiceRepository(
      inMemoryProfessionalServicesRepository,
    );

    sut = new DeleteServiceUseCase(inMemoryServiceRepository);
  });

  it('should be able to delete a service', async () => {
    const service = makeService();

    await inMemoryServiceRepository.create(service);

    await sut.execute({
      serviceId: service.id.toString(),
    });

    expect(inMemoryServiceRepository.items[0]).toMatchObject({
      isActive: false,
    });
  });

  it('should not be able to delete another service', async () => {
    const service = makeService();

    await inMemoryServiceRepository.create(service);

    const result = await sut.execute({
      serviceId: 'should-not-exclude',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
