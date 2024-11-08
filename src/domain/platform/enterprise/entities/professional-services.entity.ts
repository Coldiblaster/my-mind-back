import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ProfessionalServicesProps {
  professionalId: UniqueEntityID;
  serviceId: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class ProfessionalServices extends Entity<ProfessionalServicesProps> {
  get professionalId() {
    return this.props.professionalId;
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
    props: Optional<ProfessionalServicesProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const professionalServices = new ProfessionalServices(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return professionalServices;
  }
}
