import { makeService } from 'test/factories/make-service';
import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { FetchServiceByIdUseCase } from './fetch-services-by-id';

let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;

let sut: FetchServiceByIdUseCase;

describe('Fetch Services By Id', () => {
  beforeEach(() => {
    inMemoryProfessionalServicesRepository =
      new InMemoryProfessionalServicesRepository();

    inMemoryServiceRepository = new InMemoryServiceRepository(
      inMemoryProfessionalServicesRepository,
    );

    sut = new FetchServiceByIdUseCase(inMemoryServiceRepository);
  });

  it('should be able to get a service by id', async () => {
    const service = makeService();

    await inMemoryServiceRepository.create(service);

    const result = await sut.execute({
      serviceId: service.id.toString(),
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.service).toEqual(
        expect.objectContaining({ id: service.id }),
      );
    } else {
      throw new Error(
        'Expected result to be right, but got left with an error',
      );
    }
  });
});
