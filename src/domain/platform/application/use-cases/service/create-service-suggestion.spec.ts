import { makeProfessional } from 'test/factories/make-professional';
import { makeServiceSuggestion } from 'test/factories/make-service-suggestion';
import { InMemoryIaRepository } from 'test/repositories/in-memory-ia-repository';
import { InMemoryServiceSuggestionRepository } from 'test/repositories/in-memory-service-suggestion-repository';

import { CreateServiceSuggestionUseCase } from './create-service-suggestion';

let inMemoryIaRepository: InMemoryIaRepository;

let inMemoryServiceSuggestionRepository: InMemoryServiceSuggestionRepository;

let sut: CreateServiceSuggestionUseCase;

describe('Create service suggestion', () => {
  beforeEach(() => {
    inMemoryIaRepository = new InMemoryIaRepository();
    inMemoryServiceSuggestionRepository =
      new InMemoryServiceSuggestionRepository();

    sut = new CreateServiceSuggestionUseCase(
      inMemoryServiceSuggestionRepository,
      inMemoryIaRepository,
    );
  });

  it('should be able to create a new service suggestion', async () => {
    const newServiceSuggestion =
      await inMemoryIaRepository.generateServiceSuggestion('barbeiro', 1);

    newServiceSuggestion.map(async item => {
      const convertServiceSuggestion = makeServiceSuggestion(item);

      await inMemoryServiceSuggestionRepository.create(
        convertServiceSuggestion,
      );
    });

    const result = await sut.execute({
      segment: 'barbeiro',
      businessTypeId: 1,
    });

    expect(result.isRight()).toBe(true);

    expect(inMemoryServiceSuggestionRepository.items[0]).toMatchObject({
      title: 'barbeiro',
    });
  });

  it('should be able to create a new service suggestion without saving to the bank', async () => {
    const newServiceSuggestion =
      await inMemoryIaRepository.generateServiceSuggestion('barbeiro', 0);

    newServiceSuggestion.map(async item => {
      return makeServiceSuggestion(item);
    });

    const result = await sut.execute({
      segment: 'barbeiro',
      businessTypeId: 0,
    });

    expect(result.isRight()).toBe(true);
  });
});
