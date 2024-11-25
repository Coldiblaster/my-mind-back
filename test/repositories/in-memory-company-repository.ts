import { DomainEvents } from '@/core/events/domain-events';
import { CompanyRepository } from '@/domain/platform/application/repositories/company-repository';
import { Company } from '@/domain/platform/enterprise/entities/company.entity';

export class InMemoryCompanyRepository implements CompanyRepository {
  public items: Company[] = [];

  async findByID(id: string): Promise<Company | null> {
    const company = this.items.find(item => item.id.toString() === id);

    if (!company) {
      return null;
    }

    return company;
  }

  async findByCompanyLink(link: string) {
    const company = this.items.find(item => item.link === link);

    if (!company) {
      return null;
    }

    return company;
  }

  async save(company: Company) {
    const itemIndex = this.items.findIndex(item => item.id === company.id);

    this.items[itemIndex] = company;
  }

  async create(company: Company) {
    this.items.push(company);

    DomainEvents.dispatchEventsForAggregate(company.id);
  }
}
