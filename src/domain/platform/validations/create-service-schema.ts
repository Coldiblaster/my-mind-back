import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createServiceSchema = z.object({
  description: z.string(),
  value: z.number(),
  time: z.number(),
});

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;

export class CreateServiceDTO extends createZodDto(createServiceSchema) { }
