import { ProfessionalWithService } from '@/domain/platform/enterprise/entities/value-objects/professional-with-service';
import { formatTime } from '@/infra/utils/time';

export class ProfessionalWithServicePresenter {
  static toHTTP(professionalWithService: ProfessionalWithService) {
    return {
      serviceId: professionalWithService.serviceId.toString(),
      professionalId: professionalWithService.professionalId.toString(),
      description: professionalWithService.description,
      value: professionalWithService.value,
      time: formatTime(professionalWithService.time),
      createdAt: professionalWithService.createdAt,
      updatedAt: professionalWithService.updatedAt,
    };
  }
}
