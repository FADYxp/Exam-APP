import { CircleX } from "lucide-react";
import React from "react";

export default function FormErrorsParagraph({
  error,
}: {
  error: string | undefined | null;
}) {
  return (
    <>
      {error && (
        <fieldset className="mb-4 w-full text-destructive bg-red-50 border border-destructive ">
          <legend className="  m-auto">
            <CircleX className="rounded-full bg-white " />
          </legend>
          <p className="text-center pb-2 text-sm ">{error}</p>
        </fieldset>
      )}
    </>
  );
}
