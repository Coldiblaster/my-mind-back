import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Availability } from '@/domain/platform/enterprise/entities/availability.entity';
import { AvailabilityValidator } from '@/domain/platform/enterprise/entities/value-objects/availability-validator';

import { AvailabilityConflictError } from '../../errors/availability-conflict-error';
import { InvalidDateError } from '../../errors/invalid-date-error';
import { InvalidStartTimeError } from '../../errors/invalid-start-time-error';
import { ProfessionalDoesNotExistError } from '../../errors/professional-does-not-exist-error';
import { AvailabilityRepository } from '../../repositories/availability-repository';
import { ProfessionalRepository } from '../../repositories/professional-repository';

interface CreateAvailabilityUseCaseRequest {
  providerId: string;
  date: Date;
  timeSlots: {
    startTime: Date;
    endTime: Date;
  }[];
}

type CreateAvailabilityUseCaseResponse = Either<
  | ProfessionalDoesNotExistError
  | AvailabilityConflictError
  | InvalidDateError
  | InvalidStartTimeError,
  {
    availability: Availability[];
  }
>;

type ErrorsType =
  | ProfessionalDoesNotExistError
  | AvailabilityConflictError
  | InvalidDateError
  | InvalidStartTimeError;

@Injectable()
export class CreateAvailabilityUseCase {
  constructor(
    private professionalRepository: ProfessionalRepository,
    private availabilityRepository: AvailabilityRepository,
  ) { }

  async execute({
    date,
    timeSlots,
    providerId,
  }: CreateAvailabilityUseCaseRequest): Promise<CreateAvailabilityUseCaseResponse> {
    const professional =
      await this.professionalRepository.findByProviderID(providerId);

    if (!professional) {
      return left(new ProfessionalDoesNotExistError(providerId));
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (date < today) {
      return left(new InvalidDateError(date));
    }

    try {
      AvailabilityValidator.validateDate(date, today);

      const existingAvailabilities =
        await this.availabilityRepository.findByDateAndProfessional(
          professional.id.toString(),
          date,
        );

      AvailabilityValidator.validateTimeSlots({
        timeSlots,
        date,
        existingAvailabilities: existingAvailabilities || [],
        currentDate: now,
      });
    } catch (error) {
      return left(error as ErrorsType);
    }

    const availability = await this.createAvailability(
      timeSlots,
      date,
      professional.id,
    );

    return right({ availability });
  }

  private async createAvailability(
    timeSlots: { startTime: Date; endTime: Date }[],
    date: Date,
    professionalId: UniqueEntityID,
  ): Promise<Availability[]> {
    const availabilities = timeSlots.map(({ startTime, endTime }) => {
      const newAvailability = Availability.create({
        date,
        startTime,
        endTime,
        professionalId,
      });

      return { newAvailability };
    });

    await this.availabilityRepository.create(
      availabilities.map(item => item.newAvailability),
    );

    return availabilities.map(item => item.newAvailability);
  }
}
