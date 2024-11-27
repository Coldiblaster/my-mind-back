import { makeProfessional } from 'test/factories/make-professional';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';

import { EditMeUseCase } from './edit-me';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;

let sut: EditMeUseCase;

describe('Edit me', () => {
  beforeEach(() => {
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository();

    sut = new EditMeUseCase(inMemoryProfessionalRepository);
  });

  it('should be able to edit a me', async () => {
    const professional = makeProfessional({ providerId: '1' });

    await inMemoryProfessionalRepository.create(professional);

    await sut.execute({
      providerId: '1',
      bio: 'Barbeiro a 5 anos',
      document: '99999999999',
      name: 'Joe Doe',
      occupation: 'Barbeiro',
    });

    expect(inMemoryProfessionalRepository.items[0]).toMatchObject({
      bio: 'Barbeiro a 5 anos',
      document: '99999999999',
      name: 'Joe Doe',
      occupation: 'Barbeiro',
    });
  });
});
