import { Address } from '@/domain/platform/enterprise/entities/address.entity';
import { Company } from '@/domain/platform/enterprise/entities/company.entity';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours.entity';
import { Professional } from '@/domain/platform/enterprise/entities/professional.entity';
import { ProfessionalServices } from '@/domain/platform/enterprise/entities/professional-services.entity';
import { Service } from '@/domain/platform/enterprise/entities/service.entity';

export abstract class RegisterRepository {
  abstract registerCompanyWithDetails(data: {
    professional: Professional;
    company: Company;
    address: Address;
    services?: Service[];
    professionalServices?: ProfessionalServices[];
    openingHours: OpeningHours[];
  }): Promise<void>;
}
