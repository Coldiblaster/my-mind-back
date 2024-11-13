import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ClientProps {
  name: string;
  email: string;
  phone: string;
  document: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Client extends Entity<ClientProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }

  get document() {
    return this.props.document;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  set phone(phone: string) {
    this.props.phone = phone;
    this.touch();
  }

  set document(document: string) {
    this.props.document = document;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<ClientProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const client = new Client(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return client;
  }
}
