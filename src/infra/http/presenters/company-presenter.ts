import { Company } from '@/domain/platform/enterprise/entities/company.entity';

export class CompanyPresenter {
  static toHTTP(company: Company) {
    return {
      id: company.id.toString(),
      link: company.link,
      name: company.name,
      businessTypeId: company.businessTypeId,
      customSegment: company.customSegment,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    };
  }
}
