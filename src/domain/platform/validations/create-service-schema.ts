import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createServiceSchema = z.object({
  description: z.string(),
  value: z.number().min(1),
  time: z.number().min(1),
});

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;

export class CreateServiceDTO extends createZodDto(createServiceSchema) { }
