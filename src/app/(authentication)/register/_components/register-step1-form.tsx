"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterStep1Schema,
  RegisterStep1Type,
} from "@/lib/schemes/register-step1.schema";
import { useRegisterStep1 } from "../_hooks/use-register-step1";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import FormErrorsParagraph from "../../_components/form-errors";

interface RegisterStep1FormProps {
  onNext: (email: string) => void;
}

export function RegisterStep1Form({ onNext }: RegisterStep1FormProps) {
  const { toast } = useToast();
  const { isPending, sendOTP } = useRegisterStep1();
  const [formError, setFormError] = useState("");

  const form = useForm<RegisterStep1Type>({
    defaultValues: { email: "" },
    resolver: zodResolver(RegisterStep1Schema),
  });

  const onSubmit = async (data: RegisterStep1Type) => {
    setFormError("");
    try {
      await sendOTP(data, {
        onSuccess: () => {
          localStorage.setItem("registerEmail", data.email);
          toast({ title: "OTP sent to your email" });
          onNext(data.email);
        },
        onError: (error) => {
          setFormError(error instanceof Error ? error.message : "Failed to send OTP");
        },
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Failed to send OTP");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button disabled={isPending} type="submit" className="mt-6 w-full">
            {isPending ? "Sending..." : "Next"}
          </Button>
        </form>
      </Form>
      <FormErrorsParagraph error={formError} />
    </>
  );
}
