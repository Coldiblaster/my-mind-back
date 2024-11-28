import { ProfessionalSocialMedia } from '../../enterprise/entities/professional-social-media.entity';

export abstract class ProfessionalSocialMediaRepository {
  abstract findByID(id: string): Promise<ProfessionalSocialMedia | null>;

  abstract create(service: ProfessionalSocialMedia[]): Promise<void>;
  abstract save(service: ProfessionalSocialMedia): Promise<void>;
  abstract delete(service: ProfessionalSocialMedia): Promise<void>;
}
