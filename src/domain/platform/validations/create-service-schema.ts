import { z } from 'zod';

export const createServiceSchema = z.object({
  description: z.string(),
  value: z.number(),
  time: z.string(),
});

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;
