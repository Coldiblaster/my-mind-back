import { Injectable } from '@nestjs/common';

import { AddressRepository } from '@/domain/platform/application/repositories/address-repository';
import { Address } from '@/domain/platform/enterprise/entities/address';

import { PrismaAddressMapper } from '../mappers/prisma-address-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private prisma: PrismaService) { }

  async create(address: Address): Promise<void> {
    const data = PrismaAddressMapper.toPrisma(address);

    await this.prisma.address.create({
      data,
    });
  }

  async save(address: Address): Promise<void> {
    const data = PrismaAddressMapper.toPrisma(address);

    await this.prisma.address.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async findByID(id: string): Promise<Address | null> {
    const address = await this.prisma.address.findUnique({
      where: {
        id,
      },
    });

    if (!address) {
      return null;
    }

    return PrismaAddressMapper.toDomain(address);
  }
}
