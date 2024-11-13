import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface AvailabilityProps {
  professionalId: UniqueEntityID;
  date: Date;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
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

  set date(date: Date) {
    this.props.date = date;
  }

  set startTime(startTime: Date) {
    this.props.startTime = startTime;
  }

  set endTime(endTime: Date) {
    this.props.endTime = endTime;
  }

  set isAvailable(isAvailable: boolean) {
    this.props.isAvailable = isAvailable;
  }

  static create(
    props: Optional<AvailabilityProps, 'isAvailable'>,
    id?: UniqueEntityID,
  ) {
    const availability = new Availability(
      {
        ...props,
        isAvailable: true,
      },
      id,
    );

    return availability;
  }
}
