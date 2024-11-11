import { EntityIdNumber } from '@/core/entities/entity-id-number';

export interface BusinessTypeProps {
  icon: string;
  label: string;
  companyIds?: string[];
}

export class BusinessType extends EntityIdNumber<BusinessTypeProps> {
  get icon() {
    return this.props.icon;
  }

  get label() {
    return this.props.label;
  }

  get companyIds() {
    return this.props.companyIds;
  }

  static create(props: BusinessTypeProps, id?: number) {
    const businessType = new BusinessType(props, id);
    return businessType;
  }
}
