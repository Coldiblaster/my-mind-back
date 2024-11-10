import { DomainEvents } from '@/core/events/domain-events';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { ServiceRepository } from '@/domain/platform/application/repositories/service-repository';
import { Service } from '@/domain/platform/enterprise/entities/service.entity';
import { ProfessionalWithService } from '@/domain/platform/enterprise/entities/value-objects/professional-with-service';

import { InMemoryProfessionalServicesRepository } from './in-memory-professional-services-repository';

export class InMemoryServiceRepository implements ServiceRepository {
  public items: Service[] = [];

  constructor(
    private professionalServicesRepository: InMemoryProfessionalServicesRepository,
  ) { }

  async findByID(id: string): Promise<Service | null> {
    const service = this.items.find(item => item.id.toString() === id);

    if (!service) {
      return null;
    }

    return service;
  }

  async findServicesByProfessionalId(
    professionalId: string,
    { page }: PaginationParams,
  ) {
    const services = this.professionalServicesRepository.items
      .filter(item => item.professionalId.toString() === professionalId)
      .slice((page - 1) * 20, page * 20)
      .map(professionalService => {
        const service = this.items.find(service => {
          return service.id.equals(professionalService.serviceId);
        });

        if (!service) {
          throw new Error(
            `Professional with ID "${professionalId}" does not exist.`,
          );
        }

        return ProfessionalWithService.create({
          serviceId: service.id,
          description: service.description,
          time: service.time,
          value: service.value,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt,
          professionalId: professionalService.id,
        });
      });

    return services;
  }

  async save(service: Service) {
    const itemIndex = this.items.findIndex(item => item.id === service.id);

    this.items[itemIndex] = service;
  }

  async create(service: Service) {
    this.items.push(service);

    DomainEvents.dispatchEventsForAggregate(service.id);
  }

  async delete(service: Service): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === service.id);

    if (itemIndex !== -1) {
      this.items[itemIndex].isActive = false;

      await this.save(this.items[itemIndex]);

      DomainEvents.dispatchEventsForAggregate(service.id);
    }
  }
}
