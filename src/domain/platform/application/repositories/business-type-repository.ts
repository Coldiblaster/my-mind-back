import { BusinessType } from '../../enterprise/entities/business-type.entity';

export abstract class BusinessTypeRepository {
  abstract create(businessType: BusinessType): Promise<void>;
  abstract findAll(): Promise<BusinessType[] | null>;
  abstract findByID(id: number): Promise<BusinessType | null>;
}
