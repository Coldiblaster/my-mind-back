import { Professional } from '@/domain/platform/enterprise/entities/professional.entity';

export class ProfessionalPublicPresenter {
  static toHTTP(professional: Professional) {
    return {
      professional: {
        name: professional.name,
        email: professional.email,
        bio: professional.bio,
        occupation: professional.occupation,
      },
    };
  }
}
