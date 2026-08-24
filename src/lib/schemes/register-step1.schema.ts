import z from "zod";

export const RegisterStep1Schema = z.object({
  email: z
    .email({ error: "Please enter a valid email" })
    .min(7, "Please enter a valid email"),
});

export type RegisterStep1Type = z.infer<typeof RegisterStep1Schema>;
