import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface AddressProps {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Address extends Entity<AddressProps> {
  get cep() {
    return this.props.cep;
  }

  get street() {
    return this.props.street;
  }

  get number() {
    return this.props.number;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get city() {
    return this.props.city;
  }

  get state() {
    return this.props.state;
  }

  get complement() {
    return this.props.complement;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<AddressProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const address = new Address(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return address;
  }
}
