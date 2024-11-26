import { Professional } from '@/domain/platform/enterprise/entities/professional.entity';

export class ProfessionalPresenter {
  static toHTTP(professional: Professional) {
    return {
      name: professional.name,
      email: professional.email,
    };
  }
}
