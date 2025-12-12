"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import Header from "@/components/shared/header";
import FormErrorsParagraph from "../_components/form-errors";
import { MoveLeft, MoveRight} from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendOtp } from "./_hooks/use-send-otp";
import { useVerifyOtp } from "./_hooks/use-verify-otp";
import { PasswordInput } from "@/components/ui/password-input";
import { useResetPassword } from "@/hooks/use-reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailSchema,
  OtpSchema,
  ResetPasswordSchema,
} from "@/lib/schemes/forgot-password.schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  //toast
  const {toast} = useToast();
  //router
  const router = useRouter();

  //states
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);
  const [header, setHeader] = useState("Forgot Password");

  //Forms ---------
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(EmailSchema),
  });
  const formTwo = useForm({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(OtpSchema),
  });

  const formThree = useForm({
    defaultValues: {
      email: form.watch("email") || "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });

  //Mutations
  const { isPending, error, sendOtp } = useSendOtp();
  const { verifyIsPending, verifyError, verifyOtp } = useVerifyOtp();
  const { ResetPasswordPending, ResetPasswordError, resetPassword } =
    useResetPassword();

  // useEffect
  useEffect(() => {
    const savedExpiry = localStorage.getItem("resend-timer");

    if (savedExpiry) {
      const diff = Math.floor((+savedExpiry - Date.now()) / 1000);
      if (diff > 0) {
        setTimer(diff);
        setStep(2);
        form.setValue("email", localStorage.getItem("email") || "");

        setTimeout(() => {
          localStorage.removeItem("resend-timer");
          localStorage.removeItem("step");
          if (form.getValues("email") === "") {
            setStep(1);
            localStorage.removeItem("email");
          }
        }, diff * 1000);
      }
    }
  }, [form]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Functions

  // FIRST STEP Email Submit
  const emailSubmit = async () => {
    sendOtp(form.getValues("email"), {
      onSuccess: () => {
        setHeader("Verify OTP");
        const newStep = 2;
        const newTimerDuration = 60;
        setStep(newStep);
        setTimer(newTimerDuration);
        const expiry = Date.now() + newTimerDuration * 1000;
        localStorage.setItem("resend-timer", expiry.toString());
        localStorage.setItem("step", newStep.toString());
        localStorage.setItem("email", form.getValues("email"));
        formThree.setValue("email", localStorage.getItem("email")!);
      },

      onError: (error) => {
        form.setError("root", {
          message: error?.message || "Something went wrong , please try again",
        });
      },
    });
  };

  // SECOND STEP 2 Verify OTP
  const otpSubmit = async () => {
    verifyOtp(formTwo.getValues("resetCode"), {
      onSuccess: () => {
        setHeader("Create New Password");
        setStep(3);
      },
      onError: (error) => {
        formTwo.setError("root", {
          message: error?.message || "Something went wrong , please try again",
        });
      },
    });
  };

  // THIRD STEP 3 Reset Password
  const passwordSubmit = async () => {
    const values = {
      email: formThree.getValues().email,
      newPassword: formThree.getValues().newPassword,
    };

    resetPassword(values, {
      onSuccess: () => {
        toast({
          title: "Your password has been reset successfully"
        })
        router.push("/login");
      },
      onError: (error) => {
        formThree.setError("root", {
          message: error?.message || "Something went wrong , please try again",
        });
      },
    });
  };

  // JSX
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="px-36 w-full">
        {/*  HEADER */}
        {step === 2 && (
          <div className="mb-10">
            <Button
              onClick={() => router.back()}
              variant={"gray"}
              className=" h-10 w-10"
            >
              <MoveLeft />
            </Button>
          </div>
        )}

        <div className="">
          <Header>{header}</Header>
          {/* // PARAGRAPH ----- */}
          <p className="pt-3 pb-10  text-gray-500">
            {step === 1 &&
              "Don’t worry, we will help you recover your account."}
            {step === 2 && (
              <>
                <span className="block">
                  Please enter the 6-digits code we have sent to :
                </span>
                <span className="text-gray-800">
                  {" "}
                  {form.getValues("email")}.
                </span>{" "}
                {step === 2 && timer == 0 && (
                  <span
                    className="text-blue-600 cursor-pointer underline"
                    onClick={() => {
                      setStep(1);
                    }}
                  >
                    Edit
                  </span>
                )}{" "}
                {step === 2 && timer > 0 && (
                  <span className="text-gray-300 cursor-pointer underline">
                    Edit
                  </span>
                )}
              </>
            )}
            {step === 3 && "Create a new strong password for your account."}
          </p>
        </div>

        {/* //First Step ►►►►►►► */}
        {step === 1 && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(emailSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
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
              <FormErrorsParagraph
                error={error?.message || form.formState.errors?.root?.message}
              />
              <Button
                disabled={isPending && form.formState.isSubmitted}
                type="submit"
                className="mt-6"
              >
                Continue <MoveRight />
              </Button>
            </form>
          </Form>
        )}

        {/* // Second Step ►►►►►►►  */}
        {step === 2 && (
          <Form {...formTwo}>
            <form onSubmit={formTwo.handleSubmit(otpSubmit)}>
              <FormField
                control={formTwo.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        className="!mb-4 w-full"
                      >
                        <InputOTPGroup className="">
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
              <p className="mb-4 text-center font-medium text-sm text-gray-500">
                {timer > 0
                  ? `You can request another code in: ${timer}s`
                  : "Didn’t receive the code? "}
                <span
                  onClick={emailSubmit}
                  className={`
                    ${
                      timer > 0
                        ? ""
                        : "!text-blue-600 cursor-pointer hover:underline"
                    }
                    `}
                >
                  {timer === 0 && "Resend"}
                </span>
              </p>
              <FormErrorsParagraph
                error={
                  verifyError?.message ||
                  formTwo.formState.errors?.root?.message
                }
              />

              <Button
                type="submit"
                className="mt-6"
                disabled={verifyIsPending && formTwo.formState.isSubmitted}
              >
                Verify Code
              </Button>
            </form>
          </Form>
        )}
        {/* // Third Step ►►►►►►► */}

        {step === 3 && (
          <Form {...formThree}>
            <form onSubmit={formThree.handleSubmit(passwordSubmit)}>
              <FormField
                control={formThree.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input className="mb-4" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formThree.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formThree.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        className=""
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormErrorsParagraph
                error={
                  ResetPasswordError?.message ||
                  formThree.formState.errors?.root?.message
                }
              />
              <Button
                disabled={
                  ResetPasswordPending && formThree.formState.isSubmitted
                }
                type="submit"
                className="mt-6"
              >
                Continue
              </Button>
            </form>
          </Form>
        )}

        <p className=" text-center mt-9 text-sm">
          Don’t have an account?{" "}
          <Link
            className="text-blue-600 cursor-pointer hover:underline"
            href="/register"
          >
            Create yours.
          </Link>
        </p>
      </div>
    </div>
  );
}
