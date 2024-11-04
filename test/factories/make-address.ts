import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Address,
  AddressProps,
} from '@/domain/platform/enterprise/entities/address';
import { PrismaAddressMapper } from '@/infra/database/prisma/mappers/prisma-address-mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeAddress(
  override: Partial<AddressProps> = {},
  id?: UniqueEntityID,
) {
  const address = Address.create(
    {
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      neighborhood: faker.location.country(),
      number: faker.number.int().toString(),
      state: faker.location.state(),
      street: faker.location.street(),
      ...override,
    },
    id,
  );

  return address;
}

@Injectable()
export class AddressFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaAddress(data: Partial<AddressProps> = {}): Promise<Address> {
    const address = makeAddress(data);

    await this.prisma.address.create({
      data: PrismaAddressMapper.toPrisma(address),
    });

    return address;
  }
}
