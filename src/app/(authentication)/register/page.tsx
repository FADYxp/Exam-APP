"use client";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/header";
import { PhoneInput } from "../../../components/ui/phone-input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  RegistrationSchema,
  RegistrationSchemaType,
} from "@/lib/schemes/registration.schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { registerAction } from "@/lib/actions/register.action";
import FormErrorsParagraph from "../_components/form-errors";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  //toast
  const {toast} = useToast()
  //Router
  const router = useRouter();
  // Form
  const form = useForm<RegistrationSchemaType>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(RegistrationSchema),
  });

  const onSubmit = async (data: RegistrationSchemaType) => {
    const payload = await registerAction({ values: data });
    if (payload?.code) {
      switch (payload.message) {
        case "username already exists":
          form.setError("username", { message: payload.message });
          break;
        case "email already exists":
          form.setError("email", { message: payload.message });
          break;
        default:
          form.setError("root", { message: "Registration failed" });
          break;
      }
    }
    form.reset();
    toast({ title: "Welcome to our platform ♥" });
    router.push("/login");
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="px-36 w-full">
        <div className="mb-10">
          <Header>Register</Header>
        </div>
        {/* INPUTS */}
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-3 ">
                {/* FULL name */}
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
              {/* The rest */}

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
              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        {...field}
                      />
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
                    <div className="grid grid-cols-1 !mt-0 ">
                      <FormControl>
                        <div className="flex">
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
                name="rePassword"
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
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="mt-6"
              >
                Create Account
              </Button>
            </form>
          </Form>
          <p className="text-center text-sm mt-9">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          <FormErrorsParagraph error={form.formState.errors.root?.message} />
        </div>
      </div>
    </div>
  );
}
