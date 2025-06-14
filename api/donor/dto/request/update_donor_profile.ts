import { z } from "zod";

export const updateDonorProfileRequestSchema = z.object({
  username: z.string().min(3, "Username is required"),
  contact: z.string().regex(/^\d{10}$/, "Enter valid number"),
});

export type UpdateDonorProfileRequestDto = z.infer<
  typeof updateDonorProfileRequestSchema
>;
