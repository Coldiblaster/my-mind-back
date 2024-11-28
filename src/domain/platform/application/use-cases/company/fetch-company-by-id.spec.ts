import { makeCompany } from 'test/factories/make-company';
import { makeProfessional } from 'test/factories/make-professional';
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';
import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { FetchCompanyByIdUseCase } from './fetch-company-by-id';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;
let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;
let inMemoryCompanyRepository: InMemoryCompanyRepository;

let sut: FetchCompanyByIdUseCase;

describe('Fetch Company by Id', () => {
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

    sut = new FetchCompanyByIdUseCase(
      inMemoryProfessionalRepository,
      inMemoryCompanyRepository,
    );
  });

  it('should be able to fetch company by id', async () => {
    const newCompany = makeCompany();

    await inMemoryCompanyRepository.create(newCompany);

    const professional = makeProfessional({
      providerId: 'provider-1',
      companyId: newCompany.id,
    });

    await inMemoryProfessionalRepository.create(professional);

    const result = await sut.execute({
      providerId: professional.providerId,
    });

    expect(result.isRight()).toBe(true);
  });
});
