import { DomainEvents } from '@/core/events/domain-events';
import { Company } from '@/domain/platform/enterprise/entities/company';
import { CompanyRepository } from '@/domain/register/application/repositories/company-repository';

export class InMemoryCompanyRepository implements CompanyRepository {
  public items: Company[] = [];

  async findByID(id: string): Promise<Company | null> {
    const company = this.items.find(item => item.id.toString() === id);

    if (!company) {
      return null;
    }

    return company;
  }

  async create(company: Company) {
    this.items.push(company);

    DomainEvents.dispatchEventsForAggregate(company.id);
  }
}
