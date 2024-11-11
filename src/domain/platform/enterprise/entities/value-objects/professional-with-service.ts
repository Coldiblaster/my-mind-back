import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ValueObject } from '@/core/entities/value-object';

export interface ProfessionalWithServiceProps {
  serviceId: UniqueEntityID;
  professionalId: UniqueEntityID;
  description: string;
  time: number;
  value: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
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

  get isActive() {
    return this.props.isActive;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  static create(props: ProfessionalWithServiceProps) {
    return new ProfessionalWithService(props);
  }
}
