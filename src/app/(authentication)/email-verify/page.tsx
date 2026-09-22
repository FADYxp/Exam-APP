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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEmailVerification } from "@/hooks/use-verivy-email";
import {
  VerifyEmailCodeSchema,
  VerifyEmailSchema,
} from "@/lib/schemes/email-verify.schema";
import { useCodeVerification } from "@/hooks/use-verify-code";
import { useRouter } from "next/navigation";
// ... التوليفات السابقة

export default function EmailVerify() {
  const router = useRouter();
  //STATE
  const [step, setStep] = useState(1);

  //MUTATIONS
  const { verifyEmail, verifyPending } = useEmailVerification();
  const { codeSubmit, codePending , codeResponse } = useCodeVerification();

  // FORMs
  const form = useForm<EmailVerify>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: { email: "" },
  });

  const secForm = useForm<CodeVerify>({
    resolver: zodResolver(VerifyEmailCodeSchema),
    defaultValues: { email: "", code: "" },
  });

  // Handlers
  const onEmailSubmit = (data: EmailVerify) => {
    verifyEmail(data, {
      onSuccess: () => {
       
        secForm.setValue("email", data.email);
        setStep(2);
      },
      onError: () => {
        form.setError("root", { message: "Invalid Email Address" });
      },
    });
  };

 
  const onCodeSubmit = (data: CodeVerify) => {
        console.log(codePending)
    
    codeSubmit(data, {
      onSuccess: () => {
        router.push("/register");
        console.log(codeResponse)
      },
      onError: () => {

        secForm.setError("root", { message: "Invalid verification code" });
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-8 lg:px-12">
      <div className="w-full max-w-xl">
        <Header>Verify your Email</Header>

        {step === 1 ? (
          <Form {...form}>
            <form key="email-form" onSubmit={form.handleSubmit(onEmailSubmit)}>
            {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={verifyPending} type="submit" className="mt-6">
                Verify Email
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...secForm}>
            <form key="code-form" onSubmit={secForm.handleSubmit(onCodeSubmit)}>
                {/* CODE */}
              <FormField
                control={secForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={codePending} type="submit" className="mt-6">
                Verify Code
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
