import { makeCompany } from 'test/factories/make-company';
import { makeProfessional } from 'test/factories/make-professional';
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';

import { FetchCompanyByIdUseCase } from './fetch-company-by-id';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;
let inMemoryCompanyRepository: InMemoryCompanyRepository;

let sut: FetchCompanyByIdUseCase;

describe('Fetch Company by Id', () => {
  beforeEach(() => {
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository();

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
  //   const professional = makeProfessional({
  //     providerId: 'provider-1',
  //   });

  //   await inMemoryProfessionalRepository.create(professional);
  //   for (let i = 1; i <= 22; i++) {
  //     const service = makeService();

  //     await inMemoryServiceRepository.create(service);

  //     const professionalService = makeProfessionalServices({
  //       professionalId: professional.id,
  //       serviceId: service.id,
  //     });

  //     inMemoryProfessionalServicesRepository.items.push(professionalService);
  //   }

  //   const result = await sut.execute({
  //     providerId: 'provider-1',
  //     page: 2,
  //   });

  //   if (result.isRight()) {
  //     expect(result.value.services).toHaveLength(2);
  //   } else {
  //     throw new Error(
  //       'Expected result to be right, but got left with an error',
  //     );
  //   }
  // });
});
