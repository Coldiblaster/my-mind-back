import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface CompanyProps {
  name?: string | null;
  addressId: UniqueEntityID;
  businessTypeId?: number | null;
  customSegment?: string | null;
  link?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Company extends Entity<CompanyProps> {
  get name() {
    return this.props.name;
  }

  get addressId() {
    return this.props.addressId;
  }

  get businessTypeId() {
    return this.props.businessTypeId;
  }

  get customSegment() {
    return this.props.customSegment;
  }

  get link() {
    return this.props.link;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set link(link: string | undefined | null) {
    if (link) {
      this.props.link = link;
      this.touch();
    }
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<CompanyProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const company = new Company(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return company;
  }
}
