import { Availability } from '../../enterprise/entities/availability.entity';

export abstract class AvailabilityRepository {
  abstract findByID(id: string): Promise<Availability | null>;
  abstract findByDateAndProfessional(
    professionalId: string,
    date: Date,
  ): Promise<Availability[] | null>;

  abstract create(availability: Availability[]): Promise<void>;
  abstract save(availability: Availability): Promise<void>;
}
