import { DomainEvents } from '@/core/events/domain-events';
import { ProfessionalRepository } from '@/domain/platform/application/repositories/professional-repository';
import { Professional } from '@/domain/platform/enterprise/entities/professional';

export class InMemoryProfessionalRepository implements ProfessionalRepository {
  public items: Professional[] = [];

  async findByID(id: string): Promise<Professional | null> {
    const professional = this.items.find(item => item.id.toString() === id);

    if (!professional) {
      return null;
    }

    return professional;
  }

  async save(professional: Professional) {
    const itemIndex = this.items.findIndex(item => item.id === professional.id);

    this.items[itemIndex] = professional;
  }

  async findByEmail(email: string) {
    const professional = this.items.find(item => item.email === email);

    if (!professional) {
      return null;
    }

    return professional;
  }

  async create(professional: Professional) {
    this.items.push(professional);

    DomainEvents.dispatchEventsForAggregate(professional.id);
  }
}
