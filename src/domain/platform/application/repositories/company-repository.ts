import { Company } from '../../enterprise/entities/company.entity';

export abstract class CompanyRepository {
  abstract findByID(id: string): Promise<Company | null>;
  abstract findByCompanyLink(link: string): Promise<Company | null>;
  abstract save(company: Company): Promise<void>;
  abstract create(company: Company): Promise<void>;
}
