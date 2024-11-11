import { IaGenerateService } from '@/domain/platform/application/repositories/ia-generate-service';
import { IaGenerateServiceProps } from '@/domain/platform/enterprise/entities/ia-generate-service.entity';

export class InMemoryIaRepository implements IaGenerateService {
  public items: IaGenerateServiceProps[] = [];

  async generateServiceSuggestion(
    segment: string,
    businessTypeId: number,
  ): Promise<IaGenerateServiceProps[]> {
    this.items.push({
      title: segment,
      description: 'Corte de cabelo',
      time: 10,
      value: 100,
      businessTypeId,
    });

    return this.items;
  }
}
