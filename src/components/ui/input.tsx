import * as React from "react";
import { cn } from "@/lib/utils/tailwind-merge";
import { useFormField } from "./form";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const { error } = useFormField();
    return (
      <input
        type={type}
        {...props}
        className={cn(
          `  flex h-12 w-full !mt-0 border   text-lg  bg-background ${
            error ? "border-red-600" : "border-gray-200 focus:border-blue-600"
          }
           p-2 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
            placeholder:text-muted-foreground focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
`,
          className
        )}
        ref={ref}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
