import { DomainEvents } from '@/core/events/domain-events';
import { CompanyServicesRepository } from '@/domain/platform/application/repositories/company-services-repository';
import { CompanyServices } from '@/domain/platform/enterprise/entities/company-services';

export class InMemoryCompanyServicesRepository
  implements CompanyServicesRepository {
  public items: CompanyServices[] = [];

  async findByID(id: string): Promise<CompanyServices | null> {
    const companyServices = this.items.find(item => item.id.toString() === id);

    if (!companyServices) {
      return null;
    }

    return companyServices;
  }

  async create(companyServices: CompanyServices) {
    this.items.push(companyServices);

    DomainEvents.dispatchEventsForAggregate(companyServices.id);
  }
}
