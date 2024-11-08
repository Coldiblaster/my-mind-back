import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ValueObject } from '@/core/entities/value-object';

export interface ProfessionalWithServiceProps {
  serviceId: UniqueEntityID;
  professionalId: UniqueEntityID;
  description: string;
  time: string;
  value: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class ProfessionalWithService extends ValueObject<ProfessionalWithServiceProps> {
  get serviceId() {
    return this.props.serviceId;
  }

  get description() {
    return this.props.description;
  }

  get professionalId() {
    return this.props.professionalId;
  }

  get time() {
    return this.props.time;
  }

  get value() {
    return this.props.value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: ProfessionalWithServiceProps) {
    return new ProfessionalWithService(props);
  }
}
