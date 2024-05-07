import { z } from "zod";

export const ResetPasswordSchema = z.object({
  password: z.string().min(8, "Must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Must be at least 8 characters"),
}).refine((data)=>data.password===data.confirmPassword,{message:'Password do not match', path: ['confirmPassword']});
