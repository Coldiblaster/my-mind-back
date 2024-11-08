import { PaginationParams } from '@/core/repositories/pagination-params';

import { Service } from '../../enterprise/entities/service.entity';
import { ProfessionalWithService } from '../../enterprise/entities/value-objects/professional-with-service';

export abstract class ServiceRepository {
  abstract findByID(id: string): Promise<Service | null>;
  abstract findServicesByProfessionalId(
    professionalId: string,
    params: PaginationParams,
  ): Promise<ProfessionalWithService[]>;

  abstract create(service: Service): Promise<void>;
  abstract save(service: Service): Promise<void>;
}
