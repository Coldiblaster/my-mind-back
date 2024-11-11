import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ServiceSuggestionProps {
  title: string;
  description: string;
  value: number;
  time: number;
  businessTypeId?: number | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class ServiceSuggestion extends Entity<ServiceSuggestionProps> {
  get description() {
    return this.props.description;
  }

  get value() {
    return this.props.value;
  }

  get title() {
    return this.props.title;
  }

  get time() {
    return this.props.time;
  }

  get businessTypeId() {
    return this.props.businessTypeId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
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
    props: Optional<ServiceSuggestionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const serviceSuggestion = new ServiceSuggestion(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return serviceSuggestion;
  }
}
