import { BusinessType } from '@/domain/platform/enterprise/entities/business-type.entity';

export class BusinessTypePresenter {
  static toHTTP(businessType: BusinessType) {
    return {
      id: businessType.id,
      label: businessType.label,
      icon: businessType.icon,
    };
  }
}
