import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().optional(),
  communication_style: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
