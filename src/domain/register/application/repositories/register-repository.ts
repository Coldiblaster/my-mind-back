import { Address } from '@/domain/platform/enterprise/entities/address';
import { Company } from '@/domain/platform/enterprise/entities/company';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours';
import { Professional } from '@/domain/platform/enterprise/entities/professional';
import { ProfessionalServices } from '@/domain/platform/enterprise/entities/professional-services';
import { Service } from '@/domain/platform/enterprise/entities/service';

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
