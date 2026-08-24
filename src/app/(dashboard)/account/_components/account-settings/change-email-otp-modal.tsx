"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useChangeEmailOtp } from "./../../change-email/hooks/use-change-email";
// Update this path to match exactly where you saved the confirm hook
import { useChangeEmailOtpConfirm } from './../../change-email/hooks/use-otp-confirm';
import { useSession } from "next-auth/react";

// 1. Define the Email Schema
const emailSchema = z.object({
  newEmail: z.string().min(1, "Email is required").email("Invalid email address"),
});

// 2. Define the OTP Schema
const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export default function ChangeEmailModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const { data: session, update } = useSession();

  // Initialize hooks
  const { ChangeEmailOtpPending, ChangeEmailOtpError, changeEmailOtp } = useChangeEmailOtp();
  const { confirmEmailOtpPending, confirmEmailOtpError, confirmEmailOtp } = useChangeEmailOtpConfirm();

  // Step 1 Form (Email)
  const formEmail = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { newEmail: "" },
  });

  // Step 2 Form (OTP)
  const formOtp = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Watch the new email to display it in step 2 and use it for resending
  const currentEmail = formEmail.watch("newEmail");

  // Timer countdown logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  // Submit Email (Step 1)
  const onSubmitEmail = (values: z.infer<typeof emailSchema>) => {
    changeEmailOtp(values.newEmail, {
      onSuccess: () => {
        setStep(2);
        setTimer(60);
      },
    });
  };

  // Submit OTP (Step 2)
  const onSubmitOtp = (values: z.infer<typeof otpSchema>) => {
    confirmEmailOtp(values.otp, {
      onSuccess: async (data) => {
        const response = data?.payload ?? data;
        const updatedUser = response?.user ?? {
          ...session?.user,
          email: currentEmail,
        };

        await update({
          user: updatedUser,
          ...(response?.token ? { accessToken: response.token } : {}),
        });
        setIsOpen(false);
      },
    });
  };

  // Resend OTP logic
  const handleResendCode = () => {
    if (!currentEmail) return;
    changeEmailOtp(currentEmail, {
      onSuccess: () => {
        setTimer(60);
      },
    });
  };

  // Go back to edit email
  const handleEditEmail = () => {
    setStep(1);
    formOtp.reset();
  };

  // Handle Modal Open/Close state and reset on close
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => {
        setStep(1);
        formEmail.reset();
        formOtp.reset();
        setTimer(60);
      }, 300);
    }
  };

  return (
<Dialog open={isOpen} onOpenChange={handleOpenChange}>
  <DialogTrigger className="inline" asChild>
    <button 
      type="button" 
      className="flex items-center gap-1.5 text-blue-400 hover:text-blue-700 font-medium text-sm transition-colors ml-auto"
    >
      <Pencil className="w-4 h-4" />
      Change
    </button>
  </DialogTrigger>

        < DialogContent className = "sm:max-w-[500px] p-8" >
          <DialogHeader>
          <div className="flex flex-col mb-4" >
            {/* Stepper UI */ }
            <div  className = "flex items-center justify-center mb-8 px-12" >
              <div className="w-3.5 h-3.5 bg-blue-600 rotate-45 shrink-0" />
                <div
                className={
    `flex-1 h-[2px] mx-1 transition-colors duration-300 ${step === 2 ? "bg-blue-600" : "border-t-2 border-dashed border-blue-300 bg-transparent"
      }`
  }
              />
    < div
  className = {`w-3.5 h-3.5 rotate-45 shrink-0 transition-colors duration-300 ${step === 2 ? "bg-blue-600" : "border-2 border-blue-600 bg-white"
    }`
}
              />
  </div>
  <DialogTitle className = "text-2xl font-bold text-gray-900" >
    Change Email
      </DialogTitle>
      </div>
      </DialogHeader>

{/* --- Step 1: Enter New Email --- */ }
{
  step === 1 && (
    <Form { ...formEmail } >
    <form onSubmit={ formEmail.handleSubmit(onSubmitEmail) } className = "animate-in fade-in slide-in-from-left-4 duration-300" >
      <h3 className="text-blue-600 font-semibold text-lg mb-6" >
        Enter your new email
          </h3>

          <div  className = "mb-8" >
            <label className="block text-sm font-medium text-gray-700 mb-2" >
              Email
              </label>
              < FormField
  control = { formEmail.control }
  name = "newEmail"
  render = {({ field }) => (
    <FormItem>
    <FormControl>
    <Input
                          placeholder= "user@example.com"
  {...field }
  disabled = { ChangeEmailOtpPending }
    />
    </FormControl>
    < FormMessage className = "text-red-500 text-sm mt-1" />
      </FormItem>
                  )
}
                />

{/* Display email request error */ }
{
  ChangeEmailOtpError && (
    <p className="text-red-500 text-sm mt-2 font-medium" >
      { ChangeEmailOtpError.message }
      </p>
                )
}
</div>

  <Button
type = "submit"
className = "w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
disabled = { ChangeEmailOtpPending }
  >
{
  ChangeEmailOtpPending?(
                  <>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Sending OTP...
</>
                ) : (
  <>
  Next < ChevronRight className = "w-4 h-4 ml-1" />
    </>
                )}
</Button>
  </form>
  </Form>
        )}

{/* --- Step 2: Verify OTP --- */ }
{
  step === 2 && (
    <Form { ...formOtp } >
    <form onSubmit={ formOtp.handleSubmit(onSubmitOtp) } className = "animate-in fade-in slide-in-from-right-4 duration-300" >
      <h3 className="text-blue-600 font-semibold text-lg mb-3" >
        Verify OTP
          </h3>
          < p className = "text-sm text-gray-600 mb-8 leading-relaxed" >
            Please enter the 6 - digits code we have sent to: <br />
              <span className = "font-medium text-gray-900" > { currentEmail } </span>.{" "}
                <button 
  type = "button"
  onClick = { handleEditEmail }
  className = "text-blue-600 hover:underline font-medium"
  disabled = { confirmEmailOtpPending }
    >
    Edit
    </button>
    </p>

      <FormField
                  control={ formOtp.control }
  name = "otp"
  render = {({ field }) => (
    <FormItem className= "w-full flex flex-col items-center" >
    <FormControl>
    <InputOTP maxLength={ 6 } {...field } disabled = { confirmEmailOtpPending } >
      <InputOTPGroup>
      <InputOTPSlot index={ 0 } />
        < InputOTPSlot index = { 1} />
          <InputOTPSlot index={ 2 } />
            < InputOTPSlot index = { 3} />
              <InputOTPSlot index={ 4 } />
                < InputOTPSlot index = { 5} />
                  </InputOTPGroup>
                  </InputOTP>
                  </FormControl>
                  < FormMessage className = "text-red-500 text-sm text-center mt-2" />
                    </FormItem>
                  )
}
                />

{/* Display OTP verification error */ }
{
  confirmEmailOtpError && (
    <p className="text-red-500 text-sm text-center mt-2 font-medium" >
      { confirmEmailOtpError.message }
      </p>
                )
}

{/* Timer & Resend Button */ }
<div className="text-center mt-6 mb-8 text-sm" >
  { timer > 0 ? (
    <span className= "text-gray-500 font-mono" >
You can request another code in: { timer } s
  </span>
                ) : (
  <button
                    type= "button"
onClick = { handleResendCode }
disabled = { ChangeEmailOtpPending || confirmEmailOtpPending}
className = "text-blue-600 hover:underline font-medium disabled:opacity-50"
  >
  { ChangeEmailOtpPending? "Sending...": "Resend code" }
  </button>
                )}
</div>

  < Button
type = "submit"
className = "w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
disabled = { formOtp.watch("otp")?.length !== 6 || confirmEmailOtpPending }
  >
{
  confirmEmailOtpPending?(
                  <>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Verifying...
</>
                ) : (
  "Verify Code"
)}
</Button>
  </form>
  </Form>
        )}
</DialogContent>
  </Dialog>
  );
}