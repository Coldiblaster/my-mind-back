import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ServiceProps {
  description: string;
  value: number;
  time: number;
  breakTime?: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
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

  get isActive() {
    return this.props.isActive;
  }

  get breakTime() {
    return this.props.breakTime || 0;
  }

  get deletedAt() {
    return this.props.deletedAt;
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

  set breakTime(breakTime: number) {
    this.props.breakTime = breakTime;
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

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
    this.onDelete(isActive);
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  private onDelete(isActive: boolean) {
    if (!isActive) {
      this.props.deletedAt = new Date();
    } else this.props.deletedAt = null;

    this.touch();
  }

  static create(
    props: Optional<ServiceProps, 'createdAt' | 'isActive'>,
    id?: UniqueEntityID,
  ) {
    const service = new Service(
      {
        ...props,
        isActive: true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return service;
  }
}
