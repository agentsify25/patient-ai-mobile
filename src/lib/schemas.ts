
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  avatarUrl: z.string().url({ message: "Please enter a valid URL for avatar" }).optional().or(z.literal('')),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  nationalId: z.string().optional().or(z.literal('')),
  avatarUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
});

export const vitalSignsSchema = z.object({
  blood_pressure_systolic: z.coerce.number().int().positive({ message: "Must be a positive number" }),
  blood_pressure_diastolic: z.coerce.number().int().positive({ message: "Must be a positive number" }),
  heart_rate: z.coerce.number().int().positive({ message: "Must be a positive number" }),
  spo2: z.coerce.number().int().min(0, "Cannot be negative").max(100, "Cannot exceed 100"),
  temperature_celsius: z.coerce.number().positive({ message: "Must be a positive number" }),
  respiratory_rate: z.coerce.number().int().positive({ message: "Must be a positive number" }),
  notes: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type VitalSignsFormData = z.infer<typeof vitalSignsSchema>;
