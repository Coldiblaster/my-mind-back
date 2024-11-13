import { $Enums } from '@prisma/client';

import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface PaymentProps {
  schedulingId: UniqueEntityID;
  amount: number;
  status: $Enums.PaymentStatus;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Payment extends Entity<PaymentProps> {
  get schedulingId() {
    return this.props.schedulingId;
  }

  get amount() {
    return this.props.amount;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set amount(amount: number) {
    this.props.amount = amount;
    this.touch();
  }

  set status(status: $Enums.PaymentStatus) {
    this.props.status = status;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<PaymentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const payment = new Payment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return payment;
  }
}
