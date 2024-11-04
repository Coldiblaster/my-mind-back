import { Address } from '@/domain/platform/enterprise/entities/address';
import { Company } from '@/domain/platform/enterprise/entities/company';
import { CompanyServices } from '@/domain/platform/enterprise/entities/company-services';
import { OpeningHours } from '@/domain/platform/enterprise/entities/opening-hours';
import { Professional } from '@/domain/platform/enterprise/entities/professional';
import { Service } from '@/domain/platform/enterprise/entities/service';

export abstract class RegisterRepository {
  abstract registerCompanyWithDetails(data: {
    professional: Professional;
    company: Company;
    address: Address;
    services?: Service[];
    companyServices?: CompanyServices[];
    openingHours: OpeningHours[];
  }): Promise<void>;
}
