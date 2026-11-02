import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.email("Enter a valid email address.").transform((v) => v.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string().min(1, "Confirm your password."),
  organizationName: z.string().trim().min(2, "Enter your organization name."),
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match.", path: ["confirmPassword"] });
export const loginSchema = z.object({ email: z.email().transform((v) => v.toLowerCase()), password: z.string().min(1) });
export const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required."),
  sku: z.string().trim().min(1, "SKU is required."),
  description: z.string().trim().optional(),
  quantity: z.coerce.number().int().min(0, "Quantity cannot be negative."),
  costPrice: z.union([z.literal(""), z.coerce.number().finite().min(0, "Cost price cannot be negative.")]).optional(),
  sellingPrice: z.union([z.literal(""), z.coerce.number().finite().min(0, "Selling price cannot be negative.")]).optional(),
  lowStockLevel: z.union([z.literal(""), z.coerce.number().int().min(0)]).optional(),
});
