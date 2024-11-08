import { DomainEvents } from '@/core/events/domain-events';
import { AddressRepository } from '@/domain/platform/application/repositories/address-repository';
import { Address } from '@/domain/platform/enterprise/entities/address.entity';

export class InMemoryAddressRepository implements AddressRepository {
  public items: Address[] = [];

  async findByID(id: string): Promise<Address | null> {
    const address = this.items.find(item => item.id.toString() === id);

    if (!address) {
      return null;
    }

    return address;
  }

  async save(address: Address) {
    const itemIndex = this.items.findIndex(item => item.id === address.id);

    this.items[itemIndex] = address;
  }

  async create(address: Address) {
    this.items.push(address);

    DomainEvents.dispatchEventsForAggregate(address.id);
  }
}
