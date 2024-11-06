import { DomainEvents } from '@/core/events/domain-events';
import { ServiceRepository } from '@/domain/platform/application/repositories/service-repository';
import { Service } from '@/domain/platform/enterprise/entities/service';

export class InMemoryServiceRepository implements ServiceRepository {
  public items: Service[] = [];

  async findByID(id: string): Promise<Service | null> {
    const service = this.items.find(item => item.id.toString() === id);

    if (!service) {
      return null;
    }

    return service;
  }

  async save(service: Service) {
    const itemIndex = this.items.findIndex(item => item.id === service.id);

    this.items[itemIndex] = service;
  }

  async create(service: Service) {
    this.items.push(service);

    DomainEvents.dispatchEventsForAggregate(service.id);
  }
}
