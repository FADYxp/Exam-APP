"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
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
import {
  RegisterStep3And4Schema,
  RegisterStep3And4Type,
} from "@/lib/schemes/register-step3-4.schema";
import { useRegisterStep3And4 } from "../_hooks/use-register-step3-4";
import { useState } from "react";

interface RegisterStep3And4FormProps {
  email: string;
  onBack: () => void;
}

export function RegisterStep3And4Form({
  email,
  onBack,
}: RegisterStep3And4FormProps) {
  const { isPending, register } = useRegisterStep3And4();
  const [formError, setFormError] = useState("");

  const form = useForm<RegisterStep3And4Type>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email,
      password: "",
      confirmPassword: "",
      phone: "",
    },
    resolver: zodResolver(RegisterStep3And4Schema),
  });

  const onSubmit = async (data: RegisterStep3And4Type) => {
    setFormError("");
    try {
      await register(data, {
        onSuccess: () => {
          localStorage.removeItem("registerEmail");
          form.reset();
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : "Registration failed";
          if (message.includes("username already exists")) {
            form.setError("username", {
              message: "Username already exists",
            });
          } else if (message.includes("email already exists")) {
            form.setError("email", { message: "Email already exists" });
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
          {/* Names */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Fady" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Refaat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* USERNAME */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="user123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PHONE */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <div className="grid grid-cols-1 !mt-0">
                  <FormControl>
                    <div className="flex min-w-0">
                      <PhoneInput className="" />
                      <Input
                        className="border-s-0"
                        type="tel"
                        placeholder="01012345678"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

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
