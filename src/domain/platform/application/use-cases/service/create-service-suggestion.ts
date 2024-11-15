import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { ServiceSuggestion } from '@/domain/platform/enterprise/entities/service-suggestion.entity';

import { IaGenerateService } from '../../repositories/ia-generate-service';
import { ServiceSuggestionRepository } from '../../repositories/service-suggestion-repository';

interface CreateServiceSuggestionUseCaseRequest {
  businessTypeId: number;
  segment: string;
}

type CreateServiceSuggestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    serviceSuggestions: ServiceSuggestion[];
  }
>;

@Injectable()
export class CreateServiceSuggestionUseCase {
  constructor(
    private serviceSuggestionRepository: ServiceSuggestionRepository,
    private ia: IaGenerateService,
  ) { }

  async execute({
    businessTypeId,
    segment,
  }: CreateServiceSuggestionUseCaseRequest): Promise<CreateServiceSuggestionUseCaseResponse> {
    let serviceSuggestions: ServiceSuggestion[] | null = [];

    const existingSuggestedServices =
      await this.serviceSuggestionRepository.findAll(businessTypeId);

    if (!existingSuggestedServices) {
      const newGenerateService = await this.ia.generateServiceSuggestion(
        segment,
        businessTypeId,
      );

      if (businessTypeId < 21) {
        serviceSuggestions = await Promise.all(
          newGenerateService.map(async generateService => {
            const newServiceSuggestion =
              ServiceSuggestion.create(generateService);

            await this.serviceSuggestionRepository.create(newServiceSuggestion);

            return newServiceSuggestion;
          }),
        );
      } else {
        serviceSuggestions = await Promise.all(
          newGenerateService.map(async generateService => {
            const newServiceSuggestion =
              ServiceSuggestion.create(generateService);

            return newServiceSuggestion;
          }),
        );
      }
    } else serviceSuggestions = existingSuggestedServices;

    if (!serviceSuggestions) {
      return left(new ResourceNotFoundError());
    }

    return right({
      serviceSuggestions,
    });
  }
}
