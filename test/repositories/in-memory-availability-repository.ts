import { AvailabilityRepository } from '@/domain/platform/application/repositories/availability-repository';
import { Availability } from '@/domain/platform/enterprise/entities/availability.entity';

export class InMemoryAvailabilityRepository implements AvailabilityRepository {
  public items: Availability[] = [];

  constructor() { }

  async findByDateAndProfessional(
    professionalId: string,
    date: Date,
  ): Promise<Availability[] | null> {
    // Extrai apenas a parte da data (YYYY-MM-DD) para comparação
    const targetDate = date.toISOString().split('T')[0];

    const availabilities = this.items.filter(item => {
      // Extrai a data (YYYY-MM-DD) do registro no banco
      const itemDate = new Date(item.date).toISOString().split('T')[0];

      return (
        item.professionalId.toString() === professionalId &&
        itemDate === targetDate
      );
    });

    return availabilities.length > 0 ? availabilities : null;
  }

  async findByID(id: string): Promise<Availability | null> {
    const availability = this.items.find(item => item.id.toString() === id);

    if (!availability) {
      return null;
    }

    return availability;
  }

  async save(availability: Availability) {
    const itemIndex = this.items.findIndex(item => item.id === availability.id);

    this.items[itemIndex] = availability;
  }

  async create(availability: Availability[]) {
    this.items.push(...availability.map(item => item));
  }
}
