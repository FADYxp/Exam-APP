import z from "zod";

export const VerifyEmailSchema = z.object({
  email: z
    .email({ error: "Email is required" })
    .min(7, "Please enter a valid email"),

});


export const VerifyEmailCodeSchema = z.object({
    email: z
    .email({ error: "Email is required" }) ,
    code: z.string().min(6, "Code must be 6 characters").max(6, "Code must be 6 characters"),
});
