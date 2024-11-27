import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ReviewProps {
  clientId: UniqueEntityID;
  schedulingId: UniqueEntityID;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Review extends Entity<ReviewProps> {
  get clientId() {
    return this.props.clientId;
  }

  get schedulingId() {
    return this.props.schedulingId;
  }

  get rating() {
    return this.props.rating;
  }

  get comment() {
    return this.props.comment;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set comment(comment: string) {
    this.props.comment = comment;
    this.touch();
  }

  set rating(rating: number) {
    this.props.rating = rating;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<ReviewProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const review = new Review(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return review;
  }
}
