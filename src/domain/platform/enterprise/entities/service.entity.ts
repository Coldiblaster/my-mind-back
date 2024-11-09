import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ServiceProps {
  description: string;
  value: number;
  time: number;
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

  set time(time: number) {
    this.props.time = time;
    this.touch();
  }

  set value(value: number) {
    this.props.value = value;
    this.touch();
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
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
