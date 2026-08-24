import z from "zod";

export const RegistrationSchema = z
  .object({
    username: z
      .string()
      .nonempty({ error: "Please enter your username" })
      .min(3, "Name must be at least 3 characters long"),
    firstName: z
      .string()
      .nonempty({ error: "Please enter your first name" })
      .regex(/^[a-zA-Z]+$/, "Name must contain only letters")
      .min(3, "Name must be at least 3 characters long")
      .max(12, "Name must be at most 15 characters long"),
    lastName: z
      .string()
      .nonempty({ error: "Please enter your last name" })
      .regex(/^[a-zA-Z]+$/, "Name must contain only letters")
      .min(3, "Name must be at least 3 characters long")
      .max(12, "Name must be at most 15 characters long"),
    email: z.email(),
    password: z
      .string()
      .nonempty({ error: "Please enter your password" })
      .min(8, "Password must be at least 8 characters long")
      .regex(/[0-9]/, "Password must contain at least 1 number")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(
        /[#!?@$%^&*-]/,
        "Password must contain at least 1 special character (#?!@$%^&*-)"
      ),

    confirmPassword: z
      .string({ error: "Please re-enter your password" })
      .nonempty({ error: "Please re-enter your password" }),
    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Please enter a valid phone number")
      .length(11, "Phone number must be 10 digits long"),
  })
  .refine(
    function (object) {
      if (object.password === object.confirmPassword) {
        return true;
      }
      return false;
    },
    { path: ["rePassword"], message: "Passwords does not match" }
  );

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
