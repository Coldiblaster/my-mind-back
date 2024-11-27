import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface PhoneProps {
  professionalId?: UniqueEntityID;
  companyId?: UniqueEntityID;
  phone: string;
  type: string;
}

export class Phone extends Entity<PhoneProps> {
  get professionalId() {
    return this.props.professionalId;
  }

  get companyId() {
    return this.props.companyId;
  }

  get phone() {
    return this.props.phone;
  }

  get type() {
    return this.props.type;
  }

  set phone(phone: string) {
    this.props.phone = phone;
  }

  set type(type: string) {
    this.props.type = type;
  }

  static create(props: PhoneProps, id?: UniqueEntityID) {
    const phone = new Phone(
      {
        ...props,
      },
      id,
    );

    return phone;
  }
}
