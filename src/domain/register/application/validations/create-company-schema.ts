import { z } from 'zod';

const addressSchema = z.object({
  cep: z.string(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  complement: z.string().nullable().optional(),
});

// Schema de validação para ServicesProps
const serviceSchema = z.object({
  description: z.string(),
  value: z.number(),
  time: z.string(),
});

// Schema de validação para OperatingHoursProps
const operatingHoursSchema = z.object({
  companyId: z.any().nullable().optional(), // Você pode substituir `z.any()` por um tipo mais específico se tiver
  days: z.array(
    z.object({
      weekday: z.string(),
      startTime: z.string(),
      endTime: z.string(),
      isOpen: z.boolean(),
    }),
  ),
});

export const createCompanySchema = z.object({
  businessTypeId: z.number().optional(),
  customSegment: z.string().optional(),
  address: addressSchema,
  services: z.array(serviceSchema).optional(),
  operatingHours: operatingHoursSchema,
  email: z.string().email('O e-mail deve ser um endereço válido'),
  clerkId: z.string(),
});

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
