"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useChangePassword } from "@/app/(dashboard)/hooks/use-change-password";
import { Button } from "@/components/ui/button";
import FormErrorsParagraph from "@/app/(authentication)/_components/form-errors";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema } from "@/lib/schemes/change-password.schema";

export default function ChangePasswordForm() {
  const { changePassword, isPending } = useChangePassword();
  const form = useForm({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = () => {
    const values = form.getValues();
    changePassword(values, {
      onError: (err) => {
        form.setError("root", {
          message: err.message,
        });
      },
    });
  };

  return (
    <>
      {/* INPUTS */}
      <Form {...form}>
        <form
          className={"flex flex-col gap-2"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* OLD PASSWORD */}
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* NEW PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* REPEAT PASSWORD */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormErrorsParagraph error={form.formState.errors.root?.message} />
          <Button className="mt-4 " disabled={isPending || !form.formState.isDirty} type="submit">
            {isPending ? "Updating.." : "Update Password"}
          </Button>
        </form>
      </Form>
    </>
  );
}
