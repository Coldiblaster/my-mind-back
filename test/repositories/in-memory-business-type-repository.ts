import { BusinessTypeRepository } from '@/domain/platform/application/repositories/business-type-repository';
import { BusinessType } from '@/domain/platform/enterprise/entities/business-type.entity';

export class InMemoryBusinessTypeRepository implements BusinessTypeRepository {
  public items: BusinessType[] = [];

  async findAll(): Promise<BusinessType[] | null> {
    return this.items;
  }

  async findByID(id: number) {
    const businessType = this.items.find(item => item.id === id);

    if (!businessType) {
      return null;
    }

    return businessType;
  }

  async create(businessType: BusinessType) {
    this.items.push(businessType);
  }
}
