import { ProfessionalServices } from '../../enterprise/entities/professional-services';

export abstract class ProfessionalServicesRepository {
  abstract findByID(id: string): Promise<ProfessionalServices | null>;
  abstract create(company: ProfessionalServices): Promise<void>;
}
