import { Injectable } from '@nestjs/common';

import { ServiceSuggestionRepository } from '@/domain/platform/application/repositories/service-suggestion-repository';
import { ServiceSuggestion } from '@/domain/platform/enterprise/entities/service-suggestion.entity';

import { PrismaServiceSuggestionMapper } from '../mappers/prisma-service-suggestion-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaServiceSuggestionRepository
  implements ServiceSuggestionRepository {
  constructor(private prisma: PrismaService) { }

  async create(serviceSuggestion: ServiceSuggestion): Promise<void> {
    const data = PrismaServiceSuggestionMapper.toPrisma(serviceSuggestion);

    await this.prisma.serviceSuggestion.create({
      data,
    });
  }

  async findAll(id: number): Promise<ServiceSuggestion[] | null> {
    const serviceSuggestion = await this.prisma.serviceSuggestion.findMany({
      where: {
        businessTypeId: id,
      },
    });

    if (!serviceSuggestion) {
      return null;
    }

    return serviceSuggestion.map(PrismaServiceSuggestionMapper.toDomain);
  }
}
