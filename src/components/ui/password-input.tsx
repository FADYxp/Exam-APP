"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";

type PasswordInputProps = React.ComponentProps<typeof Input>;

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, ...props }, ref) => {
  const [show, setShow] = useState(true);

  return (
    <div className="relative w-full !mt-0">
      <Input
        type={show ? "password" : "text"}
        className={cn(className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="link"
        size="sm"
        onClick={() => setShow(!show)}
        className="absolute w-fit top-1/2 right-3 -translate-y-1/2 p-1"
      >
        {show ? (
          <EyeOff className="w-5 h-5 text-gray-300" />
        ) : (
          <Eye className="w-5 h-5 text-gray-300" />
        )}
      </Button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
