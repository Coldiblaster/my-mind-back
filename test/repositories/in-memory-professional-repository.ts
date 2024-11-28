import { DomainEvents } from '@/core/events/domain-events';
import { ProfessionalRepository } from '@/domain/platform/application/repositories/professional-repository';
import { Professional } from '@/domain/platform/enterprise/entities/professional.entity';
import { ProfessionalDetails } from '@/domain/platform/enterprise/entities/value-objects/professional-details';

import { InMemoryProfessionalServicesRepository } from './in-memory-professional-services-repository';
import { InMemoryServiceRepository } from './in-memory-service-repository';

export class InMemoryProfessionalRepository implements ProfessionalRepository {
  public items: Professional[] = [];

  constructor(
    private serviceRepository: InMemoryServiceRepository,
    private professionalServicesRepository: InMemoryProfessionalServicesRepository,
  ) { }

  async findByID(id: string): Promise<Professional | null> {
    const professional = this.items.find(item => item.id.toString() === id);

    if (!professional) {
      return null;
    }

    return professional;
  }

  async findByProviderID(providerId: string): Promise<Professional | null> {
    const professional = this.items.find(
      item => item.providerId.toString() === providerId,
    );

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

  async findDetailsByUserName(userName: string) {
    const professional = this.items.find(item => item.userName === userName);

    if (!professional) {
      return null;
    }

    const professionalServices =
      this.professionalServicesRepository.items.filter(professionalService => {
        return professionalService.professionalId.equals(professional.id);
      });

    if (!professionalServices) {
      throw new Error(
        `Professional with ID "${professional.id.toString()} does not exist."`,
      );
    }

    const services = professionalServices.map(professionalService => {
      const services = this.serviceRepository.items.find(service => {
        return service.id.equals(professionalService.serviceId);
      });

      if (!services) {
        throw new Error(
          `Service with ID "${professionalService.serviceId.toString()} does not exist."`,
        );
      }

      return services;
    });

    return ProfessionalDetails.create({
      email: professional.email,
      bio: professional.bio,
      name: professional.name,
      occupation: professional.occupation,
      services,
    });
  }

  async create(professional: Professional) {
    this.items.push(professional);

    DomainEvents.dispatchEventsForAggregate(professional.id);
  }
}
