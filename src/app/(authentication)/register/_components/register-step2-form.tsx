"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import FormErrorsParagraph from "../../_components/form-errors";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterStep2Schema,
  RegisterStep2Type,
} from "@/lib/schemes/register-step2.schema";
import { useRegisterStep2 } from "../_hooks/use-register-step2";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface RegisterStep2FormProps {
  email: string;
  onNext: () => void;
}

export function RegisterStep2Form({
  email,
  onNext,
}: RegisterStep2FormProps) {
  const { toast } = useToast();
  const { isPending, verifyOTP } = useRegisterStep2();
  const [formError, setFormError] = useState("");

  const form = useForm<RegisterStep2Type>({
    defaultValues: { email, code: "" },
    resolver: zodResolver(RegisterStep2Schema),
  });

  const onSubmit = async (data: RegisterStep2Type) => {
    setFormError("");
    try {
      await verifyOTP(data, {
        onSuccess: () => {
          toast({ title: "Email verified successfully" });
          onNext();
        },
        onError: (error) => {
          setFormError(error instanceof Error ? error.message : "Failed to verify OTP");
        },
      });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Failed to verify OTP");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="mt-6 w-full">
            {isPending ? "Verifying..." : "Next"}
          </Button>
        </form>
      </Form>
      <FormErrorsParagraph error={formError} />
    </>
  );
}
