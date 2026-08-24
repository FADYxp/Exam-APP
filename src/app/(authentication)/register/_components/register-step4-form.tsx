"use client";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import FormErrorsParagraph from "../../_components/form-errors";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRegisterStep3And4 } from "../_hooks/use-register-step3-4";
import { useState } from "react";

// Password Schema (Step 4)
const PasswordSchema = z
  .object({
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

type PasswordType = z.infer<typeof PasswordSchema>;

interface ProfileDataType {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
}

interface RegisterStep4FormProps {
  email: string;
  profileData: ProfileDataType;
  onBack: () => void;
}

export function RegisterStep4Form({
  email,
  profileData,
  onBack,
}: RegisterStep4FormProps) {
  const { isPending, register } = useRegisterStep3And4();
  const [formError, setFormError] = useState("");

  const form = useForm<PasswordType>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(PasswordSchema),
  });

  const onSubmit = async (data: PasswordType) => {
    setFormError("");
    const fullData = {
      ...profileData,
      email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      await register(fullData, {
        onSuccess: () => {
          localStorage.removeItem("registerEmail");
          form.reset();
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : "Registration failed";
          if (message.includes("username already exists")) {
            form.setError("password", {
              message: "Username already exists",
            });
          } else if (message.includes("email already exists")) {
            form.setError("password", { message: "Email already exists" });
          } else {
            setFormError(message);
          }
        },
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Registration failed");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONFIRM PASSWORD */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onBack}
            >
              Back
            </Button>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Creating..." : "Next"}
            </Button>
          </div>
        </form>
      </Form>
      <FormErrorsParagraph error={formError} />
    </>
  );
}
