import { makeBusinessType } from 'test/factories/make-business-type';
import { InMemoryBusinessTypeRepository } from 'test/repositories/in-memory-business-type-repository';

import { FetchBusinessTypeUseCase } from './fetch-business-type';

let inMemoryBusinessTypeRepository: InMemoryBusinessTypeRepository;

let sut: FetchBusinessTypeUseCase;

describe('Fetch BusinessType By Id', () => {
  beforeEach(() => {
    inMemoryBusinessTypeRepository = new InMemoryBusinessTypeRepository();

    sut = new FetchBusinessTypeUseCase(inMemoryBusinessTypeRepository);
  });

  it('should be able to get a service by id', async () => {
    const newBusinessType1 = makeBusinessType();
    const newBusinessType2 = makeBusinessType();
    const newBusinessType3 = makeBusinessType();

    await inMemoryBusinessTypeRepository.create(newBusinessType1);
    await inMemoryBusinessTypeRepository.create(newBusinessType2);
    await inMemoryBusinessTypeRepository.create(newBusinessType3);

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.businessType).toHaveLength(3);
    } else {
      throw new Error(
        'Expected result to be right, but got left with an error',
      );
    }
  });
});
