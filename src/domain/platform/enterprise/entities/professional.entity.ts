import { $Enums } from '@prisma/client';

import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ProfessionalProps {
  providerId: string;
  email: string;
  companyId: UniqueEntityID;
  role: $Enums.ProfessionalRole;
  document?: string | null;
  name?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Professional extends Entity<ProfessionalProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get providerId() {
    return this.props.providerId;
  }

  get document() {
    return this.props.document;
  }

  get companyId() {
    return this.props.companyId;
  }

  get role() {
    return this.props.role;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<ProfessionalProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const professional = new Professional(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return professional;
  }
}
