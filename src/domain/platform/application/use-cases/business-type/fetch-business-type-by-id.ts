import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { BusinessType } from '@/domain/platform/enterprise/entities/business-type.entity';

import { BusinessTypeRepository } from '../../repositories/business-type-repository';

interface FetchBusinessTypeByIdUseCaseRequest {
  businessTypeId: number;
}

type FetchBusinessTypeByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    businessType: BusinessType;
  }
>;

@Injectable()
export class FetchBusinessTypeByIdUseCase {
  constructor(private businessTypeRepository: BusinessTypeRepository) { }

  async execute({
    businessTypeId,
  }: FetchBusinessTypeByIdUseCaseRequest): Promise<FetchBusinessTypeByIdUseCaseResponse> {
    const businessType = await this.businessTypeRepository.findByID(
      Number(businessTypeId),
    );

    if (!businessType) {
      return left(new ResourceNotFoundError());
    }

    return right({
      businessType,
    });
  }
}
