"use client";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import FormErrorsParagraph from "../_components/form-errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/schemes/login.schema";
import { useLogin } from "./_hooks/use-login";
import { LoginFields } from "@/lib/types/auth";
export default function Login() {
  // MUTATIONS
  const { isPending, login } = useLogin();
  //FORM
  const form = useForm<LoginFields>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async () => {
    login(form.getValues(), {
      onError: () => {

        form.setError("root", {
          message: "Invalid username or Password",
        });
      },
    });
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="px-36 w-full">
        <div className="mb-10">
          <Header>Login</Header>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* UserName */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      
                      placeholder="userName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="!mt-0 mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex mb-4">
              <Link
                className="text-blue-600 text-sm ms-auto hover:underline"
                href="/forgot-password"
              >
                Forgot your password?
              </Link>
            </div>
            <FormErrorsParagraph error={form.formState.errors.root?.message} />
            <div className="">
              <Button
                disabled={isPending && form.formState.isSubmitted}
                type="submit"
                className="mt-6"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
        <p className="text-center mt-9 text-sm">
          Don’t have an account?{" "}
          <Link href={"/register"} className="text-blue-600 hover:underline">
            Create yours
          </Link>
        </p>
      </div>
    </div>
  );
}
