import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface AvailabilityServicesProps {
  availabilityId: UniqueEntityID;
  serviceId: UniqueEntityID;
}

export class AvailabilityServices extends Entity<AvailabilityServicesProps> {
  get availabilityId() {
    return this.props.availabilityId;
  }

  get serviceId() {
    return this.props.serviceId;
  }

  static create(props: AvailabilityServicesProps, id?: UniqueEntityID) {
    const professionalServices = new AvailabilityServices(
      {
        ...props,
      },
      id,
    );

    return professionalServices;
  }
}
