import { $Enums } from '@prisma/client';

import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface SchedulingProps {
  availabilityId: UniqueEntityID;
  clientId: UniqueEntityID;
  serviceId: UniqueEntityID;
  professionalId?: UniqueEntityID;
  isBooked: boolean;
  observations: string;
  status: $Enums.SchedulingStatus;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Scheduling extends Entity<SchedulingProps> {
  get availabilityId() {
    return this.props.availabilityId;
  }

  get clientId() {
    return this.props.clientId;
  }

  get serviceId() {
    return this.props.serviceId;
  }

  get professionalId() {
    return this.props.professionalId;
  }

  get isBooked() {
    return this.props.isBooked;
  }

  get observations() {
    return this.props.observations;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.observations;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set isBooked(isBooked: boolean) {
    this.props.isBooked = isBooked;
    this.touch();
  }

  set observations(observations: string) {
    this.props.observations = observations;
    this.touch();
  }

  set status(status: $Enums.SchedulingStatus) {
    this.props.status = status;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<SchedulingProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const scheduling = new Scheduling(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return scheduling;
  }
}
