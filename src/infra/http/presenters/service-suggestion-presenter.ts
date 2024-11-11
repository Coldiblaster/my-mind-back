import { ServiceSuggestion } from '@/domain/platform/enterprise/entities/service-suggestion.entity';

export class ServiceSuggestionPresenter {
  static toHTTP(serviceSuggestion: ServiceSuggestion) {
    return {
      id: serviceSuggestion.id.toString(),
      title: serviceSuggestion.title,
      value: serviceSuggestion.value,
      description: serviceSuggestion.description,
      time: serviceSuggestion.time,
      createdAt: serviceSuggestion.createdAt,
      updatedAt: serviceSuggestion.updatedAt,
    };
  }
}
