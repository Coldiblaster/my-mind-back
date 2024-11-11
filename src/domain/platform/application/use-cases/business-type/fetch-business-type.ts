import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { BusinessType } from '@/domain/platform/enterprise/entities/business-type.entity';

import { BusinessTypeRepository } from '../../repositories/business-type-repository';

type FetchBusinessTypeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    businessType: BusinessType[];
  }
>;

@Injectable()
export class FetchBusinessTypeUseCase {
  constructor(private businessTypeRepository: BusinessTypeRepository) { }

  async execute(): Promise<FetchBusinessTypeUseCaseResponse> {
    const businessType = await this.businessTypeRepository.findAll();

    if (!businessType) {
      return left(new ResourceNotFoundError());
    }

    return right({
      businessType,
    });
  }
}
