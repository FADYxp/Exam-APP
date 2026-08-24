import z from "zod";

export const LoginSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .min(3, "Please enter a valid username"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Please enter a valid password"),
});
