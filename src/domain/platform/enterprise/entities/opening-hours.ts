import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface OpeningHoursProps {
  companyId?: UniqueEntityID | null;
  weekday: string;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class OpeningHours extends Entity<OpeningHoursProps> {
  get companyId() {
    return this.props.companyId;
  }

  get weekday() {
    return this.props.weekday;
  }

  get startTime() {
    return this.props.startTime;
  }

  get endTime() {
    return this.props.endTime;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<OpeningHoursProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    function parseTimeToDate(time: string): Date {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0); // Define a hora, minuto, segundo e milissegundo
      return date;
    }

    const startTime = parseTimeToDate(props.startTime);
    const endTime = parseTimeToDate(props.endTime);

    if (startTime >= endTime) {
      throw new Error('Start time must be earlier than end time');
    }

    const openingHours = new OpeningHours(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return openingHours;
  }
}
