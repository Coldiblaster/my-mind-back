import { BusinessType as PrismaBusinessType, Prisma } from '@prisma/client';

import { BusinessType } from '@/domain/platform/enterprise/entities/business-type.entity';

export class PrismaBusinessTypeMapper {
  static toDomain(raw: PrismaBusinessType): BusinessType {
    return BusinessType.create(
      {
        icon: raw.icon,
        label: raw.label,
      },
      raw.id,
    );
  }

  static toPrisma(
    businessType: BusinessType,
  ): Prisma.BusinessTypeUncheckedCreateInput {
    return {
      id: businessType.id,
      label: businessType.label,
      icon: businessType.icon,
    };
  }
}
