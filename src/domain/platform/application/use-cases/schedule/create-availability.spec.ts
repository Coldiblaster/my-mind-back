import { makeAvailability } from 'test/factories/make-availability';
import { makeProfessional } from 'test/factories/make-professional';
import { InMemoryAvailabilityRepository } from 'test/repositories/in-memory-availability-repository';
import { InMemoryProfessionalRepository } from 'test/repositories/in-memory-professional-repository';
import { InMemoryProfessionalServicesRepository } from 'test/repositories/in-memory-professional-services-repository';
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository';

import { AvailabilityConflictError } from '../../errors/availability-conflict-error';
import { InvalidDateError } from '../../errors/invalid-date-error';
import { CreateAvailabilityUseCase } from './create-availability';

let inMemoryProfessionalRepository: InMemoryProfessionalRepository;
let inMemoryAvailabilityRepository: InMemoryAvailabilityRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;
let inMemoryProfessionalServicesRepository: InMemoryProfessionalServicesRepository;

let sut: CreateAvailabilityUseCase;

describe('Create availability', () => {
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
    inMemoryAvailabilityRepository = new InMemoryAvailabilityRepository();

    sut = new CreateAvailabilityUseCase(
      inMemoryProfessionalRepository,
      inMemoryAvailabilityRepository,
    );
  });

  it('should be able to create a new service availability', async () => {
    const professional = makeProfessional({ providerId: '1' });

    await inMemoryProfessionalRepository.create(professional);

    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const result = await sut.execute({
      date: tomorrow,
      providerId: '1',
      timeSlots: [
        {
          startTime: new Date(tomorrow.setHours(8, 0, 0, 0)),
          endTime: new Date(tomorrow.setHours(9, 0, 0, 0)),
        },
        {
          startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
          endTime: new Date(tomorrow.setHours(11, 0, 0, 0)),
        },
        {
          startTime: new Date(tomorrow.setHours(11, 0, 0, 0)),
          endTime: new Date(tomorrow.setHours(12, 0, 0, 0)),
        },
      ],
    });

    expect(result.isRight()).toBe(true);
  });

  it('should create new availability and associate it with the given service', async () => {
    const professional = makeProfessional({ providerId: '1' });
    await inMemoryProfessionalRepository.create(professional);

    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    const result = await sut.execute({
      providerId: '1',
      date: tomorrow,
      timeSlots: [
        {
          startTime: new Date(tomorrow.setHours(8, 0, 0, 0)),
          endTime: new Date(tomorrow.setHours(9, 0, 0, 0)),
        },
      ],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAvailabilityRepository.items).toHaveLength(1);
  });

  it('should not be able to choose the date before the current day', async () => {
    const professional = makeProfessional({ providerId: '1' });
    await inMemoryProfessionalRepository.create(professional);

    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(today.getDate() - 1);

    const now = new Date();

    const result = await sut.execute({
      providerId: '1',
      date: yesterday,
      timeSlots: [
        {
          startTime: new Date(now.setHours(8, 0, 0, 0)),
          endTime: new Date(now.setHours(9, 0, 0, 0)),
        },
      ],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidDateError);
  });

  it('should not be possible to choose the same time', async () => {
    const professional = makeProfessional({ providerId: '1' });
    await inMemoryProfessionalRepository.create(professional);

    const now = new Date();

    const result = await sut.execute({
      providerId: '1',
      date: new Date(),
      timeSlots: [
        {
          startTime: new Date(now.setHours(8, 0, 0, 0)),
          endTime: new Date(now.setHours(9, 0, 0, 0)),
        },
        {
          startTime: new Date(now.setHours(8, 3, 0, 0)),
          endTime: new Date(now.setHours(10, 0, 0, 0)),
        },
      ],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AvailabilityConflictError);
  });

  it('should not be possible to choose the same time already saved in the bank', async () => {
    const professional = makeProfessional({ providerId: '1' });

    await inMemoryProfessionalRepository.create(professional);

    const now = new Date();

    const today = new Date();

    const availability = makeAvailability({
      date: today,
      startTime: new Date(now.setHours(8, 0, 0, 0)),
      endTime: new Date(now.setHours(9, 0, 0, 0)),
      professionalId: professional.id,
    });

    await inMemoryAvailabilityRepository.create([availability]);

    const result = await sut.execute({
      providerId: professional.providerId,
      date: new Date(),
      timeSlots: [
        {
          startTime: new Date(now.setHours(8, 0, 0, 0)),
          endTime: new Date(now.setHours(10, 0, 0, 0)),
        },
      ],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(AvailabilityConflictError);
  });
});
