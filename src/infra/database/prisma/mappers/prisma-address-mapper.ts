import { Address as PrismaAddress, Prisma } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Address } from '@/domain/platform/enterprise/entities/address';

export class PrismaAddressMapper {
  static toDomain(raw: PrismaAddress): Address {
    return Address.create(
      {
        cep: raw.cep,
        city: raw.city,
        neighborhood: raw.neighborhood,
        number: raw.number,
        state: raw.street,
        street: raw.street,
        complement: raw.complement || null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(address: Address): Prisma.AddressUncheckedCreateInput {
    return {
      id: address.id.toString(),
      cep: address.cep,
      city: address.city,
      neighborhood: address.neighborhood,
      number: address.number,
      state: address.state,
      street: address.street,
      complement: address?.complement,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    };
  }
}
