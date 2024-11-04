import { OpeningHours } from '../../enterprise/entities/opening-hours';

export abstract class OpeningHoursRepository {
  abstract findByID(id: string): Promise<OpeningHours | null>;
  abstract create(openingHours: OpeningHours): Promise<void>;
  abstract save(openingHours: OpeningHours): Promise<void>;
}
