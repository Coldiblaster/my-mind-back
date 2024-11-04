import { makeAddress } from 'test/factories/make-address';
import { makeCompany } from 'test/factories/make-company';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';
import { InMemoryRegisterRepository } from 'test/repositories/in-memory-register-repository';

import { RegisterCompanyUseCase } from './register-company';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;
let inMemoryRegisterRepository: InMemoryRegisterRepository;

let sut: RegisterCompanyUseCase;

describe('Register company', () => {
  beforeEach(() => {
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository();
    inMemoryRegisterRepository = new InMemoryRegisterRepository();

    sut = new RegisterCompanyUseCase(
      inMemoryRegisterRepository,
      inMemoryProfessionalRepository,
    );
  });

  it('should be able to register a new company', async () => {
    const newAddress = makeAddress();

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
