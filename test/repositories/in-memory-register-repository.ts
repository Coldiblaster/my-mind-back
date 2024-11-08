import { DomainEvents } from '@/core/events/domain-events';
import { Address } from '@/domain/platform/enterprise/entities/address.entity';
import { Company } from '@/domain/platform/enterprise/entities/company.entity';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours.entity';
import { Professional } from '@/domain/platform/enterprise/entities/professional.entity';
import { ProfessionalServices } from '@/domain/platform/enterprise/entities/professional-services.entity';
import { Service } from '@/domain/platform/enterprise/entities/service.entity';
import { RegisterRepository } from '@/domain/register/application/repositories/register-repository';

interface InMemoryRegisterProps {
  professional: Professional;
  company: Company;
  address: Address;
  services?: Service[];
  ProfessionalServices?: ProfessionalServices[];
  openingHours: OpeningHours[];
}

export class InMemoryRegisterRepository implements RegisterRepository {
  public items: InMemoryRegisterProps[] = [];

  async registerCompanyWithDetails(data: InMemoryRegisterProps): Promise<void> {
    this.items.push(data);

    DomainEvents.dispatchEventsForAggregate(data.company.id);
  }
}
