"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
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
import z from "zod";

// Profile Schema (Step 3)
const ProfileSchema = z.object({
  firstName: z
    .string()
    .nonempty({ error: "Please enter your first name" })
    .regex(/^[a-zA-Z]+$/, "Name must contain only letters")
    .min(3, "Name must be at least 3 characters long")
    .max(12, "Name must be at most 15 characters long"),
  lastName: z
    .string()
    .nonempty({ error: "Please enter your last name" })
    .regex(/^[a-zA-Z]+$/, "Name must contain only letters")
    .min(3, "Name must be at least 3 characters long")
    .max(12, "Name must be at most 15 characters long"),
  username: z
    .string()
    .nonempty({ error: "Please enter your username" })
    .min(3, "Name must be at least 3 characters long"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Please enter a valid phone number")
    .length(11, "Phone number must be 10 digits long"),
});

type ProfileType = z.infer<typeof ProfileSchema>;

interface RegisterStep3FormProps {
  onNext: (profileData: ProfileType) => void;
  onBack: () => void;
}

export function RegisterStep3Form({ onNext, onBack }: RegisterStep3FormProps) {
  const form = useForm<ProfileType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
    },
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = async (data: ProfileType) => {
    onNext(data);
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

          <div className="flex gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onBack}
            >
              Back
            </Button>
            <Button type="submit" className="w-full">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
