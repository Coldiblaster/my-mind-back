import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const currentDate = new Date();

const today = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
);

export const createAvailabilitySchema = z.object({
  date: z.preprocess(
    arg => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date().refine(date => date >= today, {
      message: 'A data deve ser a atual ou uma data futura.',
    }),
  ),
  timeSlots: z.array(
    z.object({
      startTime: z.preprocess(
        arg => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
      ),
      endTime: z.preprocess(
        arg => (typeof arg === 'string' ? new Date(arg) : arg),
        z.date(),
      ),
    }),
  ),
});

export type CreateAvailabilitySchema = z.infer<typeof createAvailabilitySchema>;

export class CreateAvailabilityDTO extends createZodDto(
  createAvailabilitySchema,
) { }
