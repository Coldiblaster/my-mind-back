import { makeProfessional } from 'test/factories/make-professional';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';

import { ProfessionalUserNameAlreadyExistsError } from '../../errors/professional-user-name-already-exists-error';
import { EditUserNameUseCase } from './edit-user-name';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;

let sut: EditUserNameUseCase;

describe('Edit username', () => {
  beforeEach(() => {
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository();

    sut = new EditUserNameUseCase(inMemoryProfessionalRepository);
  });

  it('should be able to edit a username', async () => {
    const professional = makeProfessional({ providerId: '1' });

    await inMemoryProfessionalRepository.create(professional);

    await sut.execute({
      providerId: '1',
      userName: 'joe-doe',
    });

    expect(inMemoryProfessionalRepository.items[0]).toMatchObject({
      userName: 'joe-doe',
    });
  });

  it('should return an error if a professional with the same username already exists', async () => {
    const newProfissional = makeProfessional({
      userName: 'joe-doe',
    });

    await inMemoryProfessionalRepository.create(newProfissional);

    const result = await sut.execute({
      userName: 'joe-doe',
      providerId: '1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ProfessionalUserNameAlreadyExistsError);
  });
});
