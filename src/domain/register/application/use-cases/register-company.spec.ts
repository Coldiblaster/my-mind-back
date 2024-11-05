import { makeAddress } from 'test/factories/make-address';
import { makeProfessional } from 'test/factories/make-professional';
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';
import { InMemoryRegisterRepository } from 'test/repositories/in-memory-register-repository';

import { ProfessionalAlreadyExistsError } from './errors/professional-already-exists-error';
import { RegisterCompanyUseCase } from './register-company';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;
let inMemoryRegisterRepository: InMemoryRegisterRepository;
let inMemoryAddressRepository: InMemoryAddressRepository;

let sut: RegisterCompanyUseCase;

describe('Register company', () => {
  beforeEach(() => {
    inMemoryProfessionalRepository = new InMemoryProfessionalRepository();
    inMemoryRegisterRepository = new InMemoryRegisterRepository();
    inMemoryAddressRepository = new InMemoryAddressRepository();

    sut = new RegisterCompanyUseCase(
      inMemoryRegisterRepository,
      inMemoryProfessionalRepository,
    );
  });

  it('should be able to register a new company', async () => {
    const result = await sut.execute({
      address: makeAddress(),
      email: 'jonhdoe@example.com',
      customSegment: 'Manutenção de celular',
      clerkId: '1',
      operatingHours: {
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

  it('should return an error if a professional with the same email already exists', async () => {
    const newProfissional = makeProfessional({
      email: 'existing@example.com',
    });

    await inMemoryProfessionalRepository.create(newProfissional);

    const result = await sut.execute({
      address: makeAddress(),
      email: 'existing@example.com',
      customSegment: 'Manutenção de celular',
      clerkId: '1',
      operatingHours: {
        companyId: '1',
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

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ProfessionalAlreadyExistsError);
  });

  it('should it create a new address', async () => {
    const newAddress = makeAddress();

    await inMemoryAddressRepository.create(newAddress);

    const result = await sut.execute({
      address: newAddress,
      email: 'jonhdoe@example.com',
      customSegment: 'Manutenção de celular',
      clerkId: '1',
      operatingHours: {
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

    expect(inMemoryAddressRepository.items).toContainEqual(newAddress);

    expect(result.isRight()).toBe(true);
  });

  it('should create and associate opening hours with the company', async () => {
    const result = await sut.execute({
      address: makeAddress(),
      email: 'jonhdoe@example.com',
      customSegment: 'Manutenção de celular',
      clerkId: '1',
      operatingHours: {
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
