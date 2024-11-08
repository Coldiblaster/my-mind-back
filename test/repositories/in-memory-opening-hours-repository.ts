import { DomainEvents } from '@/core/events/domain-events';
import { OpeningHoursRepository } from '@/domain/platform/application/repositories/opening-hours-repository';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours.entity';

export class InMemoryOpeningHoursRepository implements OpeningHoursRepository {
  public items: OpeningHours[] = [];

  async findByID(id: string): Promise<OpeningHours | null> {
    const openingHours = this.items.find(item => item.id.toString() === id);

    if (!openingHours) {
      return null;
    }

    return openingHours;
  }

  async create(openingHours: OpeningHours) {
    this.items.push(openingHours);

    DomainEvents.dispatchEventsForAggregate(openingHours.id);
  }

  async save(openingHours: OpeningHours): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === openingHours.id);

    this.items[itemIndex] = openingHours;
  }
}
