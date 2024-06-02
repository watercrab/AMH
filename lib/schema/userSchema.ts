import { z, ZodError } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(2, "Invalid phone number."),
});

export type UserFormData = z.infer<typeof userSchema>;

export type FormErrors = ZodError<UserFormData>;
