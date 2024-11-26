import { makeProfessional } from 'test/factories/make-professional';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';

import { FetchProfessionalByUserNameUseCase } from './fetch-professional-by-user-name';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;

let sut: FetchProfessionalByUserNameUseCase;

describe('Fetch Professional by userName', () => {
  beforeEach(() => {
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository();

    sut = new FetchProfessionalByUserNameUseCase(
      inMemoryProfessionalRepository,
    );
  });

  it('should be able to fetch username', async () => {
    const professional = makeProfessional({
      userName: 'joe-doe',
    });

    await inMemoryProfessionalRepository.create(professional);

    if (professional.userName) {
      const result = await sut.execute({
        userName: professional.userName,
      });

      expect(result.isRight()).toBe(true);
    }
  });
});
