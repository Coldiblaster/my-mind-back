import { Professional } from '../../enterprise/entities/professional.entity';
import { ProfessionalDetails } from '../../enterprise/entities/value-objects/professional-details';

export abstract class ProfessionalRepository {
  abstract findByEmail(email: string): Promise<Professional | null>;
  abstract findByID(id: string): Promise<Professional | null>;
  abstract findByProviderID(id: string): Promise<Professional | null>;
  abstract findDetailsByUserName(
    userName: string,
  ): Promise<ProfessionalDetails | null>;

  abstract save(professional: Professional): Promise<void>;
  abstract create(professional: Professional): Promise<void>;
}
