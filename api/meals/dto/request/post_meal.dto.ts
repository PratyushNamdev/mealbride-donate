import { z } from "zod";

export const postMealRequestSchema = z.object({
  image: z.string().min(1, "Image is required"),
  foodDesc: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description must be at most 300 characters"),
  veg: z.boolean(),
  feedsUpto: z.number().min(3, "Min 3 Required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.number({
    invalid_type_error: "Postal code must be a number",
    required_error: "Postal code is required",
  }),
  preferredTime: z.coerce.date({
    errorMap: () => ({ message: "Preferred time must be a valid date" }),
  }),
  expiryDate: z.coerce.date({
    errorMap: () => ({ message: "Expiry date must be a valid date" }),
  }),
});

export type PostMealRequestDto = z.infer<typeof postMealRequestSchema>;
