import { ValueObject } from '@/core/entities/value-object';

import { Service } from '../service.entity';

export interface ProfessionalDetailsProps {
  email: string;
  name?: string | null;
  bio?: string | null;
  occupation?: string | null;
  services: Service[];
}

export class ProfessionalDetails extends ValueObject<ProfessionalDetailsProps> {
  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get bio() {
    return this.props.bio;
  }

  get occupation() {
    return this.props.occupation;
  }

  get services() {
    return this.props.services;
  }

  static create(props: ProfessionalDetailsProps) {
    return new ProfessionalDetails(props);
  }
}
