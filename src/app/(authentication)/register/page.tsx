"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Header from "@/components/shared/header";
import { RegisterProgressBar } from "./_components/register-progress-bar";
import { RegisterStep1Form } from "./_components/register-step1-form";
import { RegisterStep2Form } from "./_components/register-step2-form";
import { RegisterStep3Form } from "./_components/register-step3-form";
import { RegisterStep4Form } from "./_components/register-step4-form";

interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
}

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [savedEmail, setSavedEmail] = useState("");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // Load saved email from localStorage
  useEffect(() => {
    const email = localStorage.getItem("registerEmail");
    if (email) {
      setSavedEmail(email);
    }
  }, []);

  const handleStep1Next = (email: string) => {
    setSavedEmail(email);
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  const handleStep3Next = (profile: ProfileData) => {
    setProfileData(profile);
    setCurrentStep(4);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-8 lg:px-12">
      <div className="w-full max-w-xl">
        <div className="mb-10">
          <Header>Register</Header>
        </div>

        {/* Progress Bar */}
        <RegisterProgressBar currentStep={currentStep} />

        {/* STEP 1 - EMAIL */}
        {currentStep === 1 && (
          <RegisterStep1Form onNext={handleStep1Next} />
        )}

        {/* STEP 2 - VERIFY OTP */}
        {currentStep === 2 && (
          <RegisterStep2Form
            email={savedEmail}
            onNext={handleStep2Next}
          />
        )}

        {/* STEP 3 - PROFILE */}
        {currentStep === 3 && (
          <RegisterStep3Form
            onNext={handleStep3Next}
            onBack={handleBack}
          />
        )}

        {/* STEP 4 - PASSWORD */}
        {currentStep === 4 && profileData && (
          <RegisterStep4Form
            email={savedEmail}
            profileData={profileData}
            onBack={handleBack}
          />
        )}

        <p className="text-center text-sm mt-9">
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
