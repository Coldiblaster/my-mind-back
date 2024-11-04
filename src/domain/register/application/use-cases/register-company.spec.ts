import { makeAddress } from 'test/factories/make-address';
import { makeCompany } from 'test/factories/make-company';
import { InMemoryCompanyRepository } from 'test/repositories/in-memory-company-repository';
import { InMemoryCompanyServicesRepository } from 'test/repositories/in-memory-company-services-repository';
import { InMemoryOpeningHoursRepository } from 'test/repositories/in-memory-opening-hours-repository';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';

import { RegisterCompanyUseCase } from './register-company';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;
let inMemoryCompanyRepository: InMemoryCompanyRepository;
let inMemoryCompanyServicesRepository: InMemoryCompanyServicesRepository;
let inMemoryOpeningHoursRepository: InMemoryOpeningHoursRepository;

let sut: RegisterCompanyUseCase;

describe('Register company', () => {
  beforeEach(() => {
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository();
    inMemoryCompanyRepository = new InMemoryCompanyRepository();
    inMemoryCompanyServicesRepository = new InMemoryCompanyServicesRepository();
    inMemoryOpeningHoursRepository = new InMemoryOpeningHoursRepository();

    sut = new RegisterCompanyUseCase(
      inMemoryCompanyRepository,
      inMemoryProfessionalRepository,
      inMemoryCompanyServicesRepository,
      inMemoryOpeningHoursRepository,
    );
  });

  it('should be able to register a new company', async () => {
    const newAddress = makeAddress({
      city: 'Rio de Janeiro',
    });

    const newCompany = makeCompany();

    const result = await sut.execute({
      address: newAddress,
      email: 'jonhdoe@example.com',
      customSegment: 'Manutenção de celular',
      clerkId: '1',
      operatingHours: {
        companyId: newCompany.id,
        days: [
          {
            startTime: '8:00',
            endTime: '18:00',
            isOpen: true,
            weekday: 'Segunda-Feira',
          },
        ],
      },
    });

    expect(result.isRight()).toBe(true);
  });
});
