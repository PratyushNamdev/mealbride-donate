import { z } from "zod";

export const updateDonorAddressRequestSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  contact: z
    .string()
    .regex(/^\d{10}$/, "Enter valid number")
    .or(z.literal(""))
    .optional(),
});

export type UpdateDonorAddressRequestDto = z.infer<
  typeof updateDonorAddressRequestSchema
>;
