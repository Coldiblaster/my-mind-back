import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface CompanyServicesProps {
  companyId: UniqueEntityID;
  serviceId: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class CompanyServices extends Entity<CompanyServicesProps> {
  get companyId() {
    return this.props.companyId;
  }

  get serviceId() {
    return this.props.serviceId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<CompanyServicesProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const companyServices = new CompanyServices(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return companyServices;
  }
}
