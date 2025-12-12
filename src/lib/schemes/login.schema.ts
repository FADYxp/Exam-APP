import z from "zod";

export const LoginSchema = z.object({
  email: z
    .email({ error: "Email is required" })
    .min(7, "Please enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Please enter a valid password"),
});
