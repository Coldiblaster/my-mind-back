import { makeBusinessType } from 'test/factories/make-business-type';
import { InMemoryBusinessTypeRepository } from 'test/repositories/in-memory-business-type-repository';

import { FetchBusinessTypeByIdUseCase } from './fetch-business-type-by-id';

let inMemoryBusinessTypeRepository: InMemoryBusinessTypeRepository;

let sut: FetchBusinessTypeByIdUseCase;

describe('Fetch BusinessType By Id', () => {
  beforeEach(() => {
    inMemoryBusinessTypeRepository = new InMemoryBusinessTypeRepository();

    sut = new FetchBusinessTypeByIdUseCase(inMemoryBusinessTypeRepository);
  });

  it('should be able to get a service by id', async () => {
    const newBusinessType = makeBusinessType();

    await inMemoryBusinessTypeRepository.create(newBusinessType);

    const result = await sut.execute({
      businessTypeId: newBusinessType.id,
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.businessType).toEqual(
        expect.objectContaining({ id: newBusinessType.id }),
      );
    } else {
      throw new Error(
        'Expected result to be right, but got left with an error',
      );
    }
  });
});
