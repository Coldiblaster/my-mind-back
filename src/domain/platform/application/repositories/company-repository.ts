import { Company } from '../../enterprise/entities/company.entity';

export abstract class CompanyRepository {
  abstract findByID(id: string): Promise<Company | null>;
  abstract save(company: Company): Promise<void>;
}
