"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormErrorsParagraph from "@/app/(authentication)/_components/form-errors";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Loader from "@/components/shared/loader";
import { useEditProfile } from "../../../hooks/use-edit-profile";
import { useToast } from "@/hooks/use-toast";
import { useDeleteAccount } from "@/app/(dashboard)/hooks/use-delete-account";
import Modal from "@/components/shared/modal";
import { ProfileFormType } from "@/lib/types/profile-form";
import { EditProfilePayload } from "@/lib/types/edit-profile";
import ChangeEmailModal from "./change-email-otp-modal";

// type
type ProfileKeys = "username" | "firstName" | "lastName" | "email" | "phone";

// component
export default function ProfileForm() {
  //TOAST
  const { toast } = useToast();

  // SESSION user
  const { data: session, status, update } = useSession();
  const user = session?.user;

  // FORM
  const form = useForm<ProfileFormType>({
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    },
  });

  // useEFFECT Updates form default values when user data loads
  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username!,
        firstName: user.firstName!,
        lastName: user.lastName!,
        email: user.email!,
        phone: user.phone!,
      });
    }
  }, [user, form]);

  // form values variables
  const { editProfile, isPending } = useEditProfile();
  const { deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const onSubmit = async () => {
    const values = form.getValues();
    const defaults = form.formState.defaultValues ?? {};

    const changedValues: EditProfilePayload = (
      Object.keys(values) as ProfileKeys[]
    ).reduce((acc: EditProfilePayload, key) => {
      if (values[key] !== defaults[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    if (Object.keys(changedValues).length === 0) {
      form.setError("root", {
        message: "No changes has been done",
      });
      return;
    }
    editProfile(changedValues, {
      onSuccess: async (data) => {
        const updatedUser = data.payload.user;
        toast({ title: "Your profile has been updated." });

        // updating session
        await update({ user: updatedUser });

        if (updatedUser) {
          form.reset({
            username: updatedUser.username,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            phone: updatedUser.phone,
          });
        }
      },
      onError: (error) => {
        form.setError("root", {
          message: error.message || "Edit profile failed",
        });
      },
    });
  };

  return (
    <>
      {/* INPUTS */}
      {status === "loading" ? (
        <Loader />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* FULL name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                      <Input type="text" {...field} />
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
                    <Input disabled type="text" {...field} />
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
                  <FormLabel className="flex">Email<ChangeEmailModal/></FormLabel>
                  <FormControl>
                    <Input readOnly type="email" {...field} />
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
                  <div className="grid min-w-0 grid-cols-1 !mt-0 ">
                    <FormControl>
                      <div className="flex">
                        <PhoneInput className="" />
                        <Input className="border-s-0" type="tel" {...field} />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormErrorsParagraph error={form.formState.errors.root?.message} />
            <div className="flex mt-8 gap-4">
              <Modal deleteAccount={deleteAccount} isPending={isDeleting} />

              <Button
                disabled={isPending || !form.formState.isDirty}
                type="submit"
              >
                {isPending ? "Updating.." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
