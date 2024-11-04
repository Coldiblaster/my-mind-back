import { CompanyServices } from '../../enterprise/entities/company-services';

export abstract class CompanyServicesRepository {
  abstract findByID(id: string): Promise<CompanyServices | null>;
  abstract create(company: CompanyServices): Promise<void>;
}
