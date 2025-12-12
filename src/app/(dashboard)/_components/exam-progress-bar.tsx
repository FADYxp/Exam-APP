import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  current: number;
  total: number;
};
export default function ProgressBar({ current, total }: Props) {
  const examName = useSearchParams().get("title");

  const percentage = (current / total) * 100;
  return (
    <>
      <div className="flex justify-between text-gray-500 mb-2 capitalize">
        <p className="">{examName}</p>{" "}
        <p>
          Question <span className="text-blue-600">{current}</span> of{" "}
          <span>{total}</span>
        </p>
      </div>
      <div className="w-full h-4 bg-blue-50  overflow-hidden">
        <div
          className="h-4 bg-blue-600 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </>
  );
}
