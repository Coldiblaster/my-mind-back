import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface IaGenerateServiceProps {
  title: string;
  description: string;
  value: number;
  time: number;
  businessTypeId: number;
}

export class IaGenerateService extends Entity<IaGenerateServiceProps> {
  get description() {
    return this.props.description;
  }

  get value() {
    return this.props.value;
  }

  get title() {
    return this.props.title;
  }

  get businessTypeId() {
    return this.props.businessTypeId;
  }

  get time() {
    return this.props.time;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set time(time: number) {
    this.props.time = time;
  }

  set value(value: number) {
    this.props.value = value;
  }

  set description(description: string) {
    this.props.description = description;
  }

  static create(props: IaGenerateServiceProps, id?: UniqueEntityID) {
    const serviceSuggestion = new IaGenerateService(
      {
        ...props,
      },
      id,
    );

    return serviceSuggestion;
  }
}
