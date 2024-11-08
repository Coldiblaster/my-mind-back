import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface BusinessTypeProps {
  icon: string;
  label: string;
  companyIds?: string[];
}

export class BusinessType extends Entity<BusinessTypeProps> {
  get icon() {
    return this.props.icon;
  }

  get label() {
    return this.props.label;
  }

  get companyIds() {
    return this.props.companyIds;
  }

  static create(props: BusinessTypeProps, id?: UniqueEntityID) {
    const businessType = new BusinessType(props, id);
    return businessType;
  }
}
