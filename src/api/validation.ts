import { z } from 'zod';

export const BrandExtractionSchema = z.object({
  url: z.string().url(),
  depth: z.number().int().min(1).max(3).default(1),
  tenant_id: z.string().uuid(), // Enforces tenant context
});

export type BrandExtractionRequest = z.infer<typeof BrandExtractionSchema>;
