import { Service } from '@/domain/platform/enterprise/entities/service.entity';

export class ServicePresenter {
  static toHTTP(service: Service) {
    return {
      id: service.id.toString(),
      value: service.value,
      description: service.description,
      time: service.time,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };
  }
}
