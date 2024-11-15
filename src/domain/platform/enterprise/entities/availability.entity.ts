import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface AvailabilityProps {
  professionalId: UniqueEntityID;
  date: Date;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Availability extends Entity<AvailabilityProps> {
  get professionalId() {
    return this.props.professionalId;
  }

  get date() {
    return this.props.date;
  }

  get startTime() {
    return this.props.startTime;
  }

  get endTime() {
    return this.props.endTime;
  }

  get isAvailable() {
    return this.props.isAvailable;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set date(date: Date) {
    this.props.date = date;
    this.touch();
  }

  set startTime(startTime: Date) {
    this.props.startTime = startTime;
    this.touch();
  }

  set endTime(endTime: Date) {
    this.props.endTime = endTime;
    this.touch();
  }

  set isAvailable(isAvailable: boolean) {
    this.props.isAvailable = isAvailable;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<AvailabilityProps, 'isAvailable' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const availability = new Availability(
      {
        ...props,
        isAvailable: true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return availability;
  }
}
