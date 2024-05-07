import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const UpdateUserSchema = z.object({
  name: z
    .string({ invalid_type_error: "Please enter a valid name" })
    .min(3, "Name should be at least 3 characters long"),
  phone: z.string().regex(phoneRegex, "Invalid Number!"),
  email: z.string().email("Invalid Email"),
});
