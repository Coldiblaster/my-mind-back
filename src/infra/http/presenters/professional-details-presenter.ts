import { ProfessionalDetails } from '@/domain/platform/enterprise/entities/value-objects/professional-details';

import { ServicePresenter } from './service-presenter';

export class ProfessionalDetailsPresenter {
  static toHTTP(professional: ProfessionalDetails) {
    return {
      professional: {
        name: professional.name,
        email: professional.email,
        bio: professional.bio,
        occupation: professional.occupation,
      },
      services: professional.services.map(ServicePresenter.toHTTP),
    };
  }
}
