import { DomainEvents } from '@/core/events/domain-events';
import { ProfessionalServicesRepository } from '@/domain/platform/application/repositories/professional-services-repository';
import { ProfessionalServices } from '@/domain/platform/enterprise/entities/professional-services.entity';

export class InMemoryProfessionalServicesRepository
  implements ProfessionalServicesRepository
{
  public items: ProfessionalServices[] = [];

  async findByID(id: string): Promise<ProfessionalServices | null> {
    const ProfessionalServices = this.items.find(
      item => item.id.toString() === id,
    );

    if (!ProfessionalServices) {
      return null;
    }

    return ProfessionalServices;
  }

  async create(ProfessionalServices: ProfessionalServices) {
    this.items.push(ProfessionalServices);

    DomainEvents.dispatchEventsForAggregate(ProfessionalServices.id);
  }
}
