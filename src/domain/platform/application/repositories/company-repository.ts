import { Company } from '../../enterprise/entities/company';

export abstract class CompanyRepository {
  abstract findByID(id: string): Promise<Company | null>;
  abstract save(company: Company): Promise<void>;
}
