import z from "zod";

export const RegisterStep2Schema = z.object({
  email: z
    .email({ error: "Please enter a valid email" })
    .min(7, "Please enter a valid email"),
  code: z
    .string()
    .min(6, "Code must be 6 characters")
    .max(6, "Code must be 6 characters"),
});

export type RegisterStep2Type = z.infer<typeof RegisterStep2Schema>;
