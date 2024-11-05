import { Address } from '../../enterprise/entities/address';

export abstract class AddressRepository {
  abstract findByID(id: string): Promise<Address | null>;
  abstract save(address: Address): Promise<void>;
  abstract create(address: Address): Promise<void>;
}
