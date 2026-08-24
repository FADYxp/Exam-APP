import z from "zod";

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().nonempty({ error: "Please enter your old password" }),
  newPassword: z
    .string()
    .nonempty({ error: "Please enter your new password" })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(
      /[#!?@$%^&*-]/,
      "Password must contain at least 1 special character (#?!@$%^&*-)"
    ),
  confirmPassword: z.string().nonempty({ error: "Please confirm your password" }),
})  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;