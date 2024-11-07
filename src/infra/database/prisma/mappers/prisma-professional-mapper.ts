import { Prisma, Professional as PrismaProfessional } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Professional } from '@/domain/platform/enterprise/entities/professional';

export class PrismaProfessionalMapper {
  static toDomain(raw: PrismaProfessional): Professional {
    return Professional.create(
      {
        providerId: raw.providerId,
        companyId: new UniqueEntityID(raw.companyId),
        email: raw.email,
        role: raw.role,
        document: raw.document ? raw.document : null,
        name: raw.name ? raw.name : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    professional: Professional,
  ): Prisma.ProfessionalUncheckedCreateInput {
    return {
      id: professional.id.toString(),
      name: professional.name,
      email: professional.email,
      providerId: professional.providerId,
      companyId: professional.companyId.toString(),
      role: professional.role ? professional.role : 'EMPLOYEE',
      createdAt: professional.createdAt,
      updatedAt: professional.updatedAt,
    };
  }
}
