import { DomainEvents } from '@/core/events/domain-events';
import { Address } from '@/domain/platform/enterprise/entities/address';
import { Company } from '@/domain/platform/enterprise/entities/company';
import { CompanyServices } from '@/domain/platform/enterprise/entities/company-services';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours';
import { Professional } from '@/domain/platform/enterprise/entities/professional';
import { Service } from '@/domain/platform/enterprise/entities/service';
import { RegisterRepository } from '@/domain/register/application/repositories/register-repository';

interface InMemoryRegisterProps {
  professional: Professional;
  company: Company;
  address: Address;
  services?: Service[];
  companyServices?: CompanyServices[];
  openingHours: OpeningHours[];
}

export class InMemoryRegisterRepository implements RegisterRepository {
  public items: InMemoryRegisterProps[] = [];

  async registerCompanyWithDetails(data: InMemoryRegisterProps): Promise<void> {
    this.items.push(data);

    DomainEvents.dispatchEventsForAggregate(data.company.id);
  }
}
