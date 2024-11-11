import { DomainEvents } from '@/core/events/domain-events';
import { ServiceSuggestionRepository } from '@/domain/platform/application/repositories/service-suggestion-repository';
import { ServiceSuggestion } from '@/domain/platform/enterprise/entities/service-suggestion.entity';

export class InMemoryServiceSuggestionRepository
  implements ServiceSuggestionRepository {
  public items: ServiceSuggestion[] = [];

  async findAll(businessTypeId: number): Promise<ServiceSuggestion[] | null> {
    const serviceSuggestion = this.items.filter(
      item =>
        item.businessTypeId !== undefined &&
        item.businessTypeId !== null &&
        item.businessTypeId === Number(businessTypeId),
    );

    if (!serviceSuggestion) {
      return null;
    }

    return serviceSuggestion;
  }

  async create(serviceSuggestion: ServiceSuggestion) {
    this.items.push(serviceSuggestion);

    DomainEvents.dispatchEventsForAggregate(serviceSuggestion.id);
  }
}
