import { ServiceSuggestion } from '../../enterprise/entities/service-suggestion.entity';

export abstract class ServiceSuggestionRepository {
  abstract findAll(businessTypeId: number): Promise<ServiceSuggestion[] | null>;
  abstract create(serviceSuggestion: ServiceSuggestion): Promise<void>;
}
