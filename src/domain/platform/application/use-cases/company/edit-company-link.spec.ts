import { makeCompany } from 'test/factories/make-company';
import { makeProfessional } from 'test/factories/make-professional';
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';
import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { CompanyLinkAlreadyExistsError } from '../../errors/company-link-already-exists-error';
import { EditCompanyLinkUseCase } from './edit-company-link';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;
let inMemoryCompanyRepository: InMemoryCompanyRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;
let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;

let sut: EditCompanyLinkUseCase;

describe('Edit company link', () => {
  beforeEach(() => {
    inMemoryProfessionalServicesRepository =
      new InMemoryProfessionalServicesRepository();

    inMemoryServiceRepository = new InMemoryServiceRepository(
      inMemoryProfessionalServicesRepository,
    );
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository(
      inMemoryServiceRepository,
      inMemoryProfessionalServicesRepository,
    );
    inMemoryCompanyRepository = new InMemoryCompanyRepository();

    sut = new EditCompanyLinkUseCase(
      inMemoryCompanyRepository,
      inMemoryProfessionalRepository,
    );
  });

  it('should be able to edit a new service', async () => {
    const newCompany = makeCompany();

    await inMemoryCompanyRepository.create(newCompany);

    const professional = makeProfessional({
      providerId: '1',
      companyId: newCompany.id,
    });

    await inMemoryProfessionalRepository.create(professional);

    await sut.execute({
      providerId: '1',
      link: 'psico-vida',
    });

    expect(inMemoryCompanyRepository.items[0]).toMatchObject({
      link: 'psico-vida',
    });
  });

  it('should return an error if a company with the same link already exists', async () => {
    const newCompany = makeCompany({
      link: 'psico-vida',
    });

    await inMemoryCompanyRepository.create(newCompany);

    const professional = makeProfessional({
      providerId: '1',
      companyId: newCompany.id,
    });

    await inMemoryProfessionalRepository.create(professional);

    const result = await sut.execute({
      link: 'psico-vida',
      providerId: '1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CompanyLinkAlreadyExistsError);
  });
});
