import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ServiceProps {
  description: string;
  value: number;
  time: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Service extends Entity<ServiceProps> {
  get description() {
    return this.props.description;
  }

  get value() {
    return this.props.value;
  }

  get time() {
    return this.props.time;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<ServiceProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const service = new Service(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return service;
  }
}
