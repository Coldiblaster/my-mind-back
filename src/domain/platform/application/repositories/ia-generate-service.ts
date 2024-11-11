import { IaGenerateServiceProps } from '../../enterprise/entities/ia-generate-service.entity';

export abstract class IaGenerateService {
  abstract generateServiceSuggestion(
    segment: string,
    businessTypeId: number,
  ): Promise<IaGenerateServiceProps[]>;
}
