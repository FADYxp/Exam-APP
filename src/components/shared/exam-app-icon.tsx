import { FolderCode } from "lucide-react";
import React from "react";

export default function ExamAppIcon() {
  return (
    <div className="text-blue-600 py-1 font-semibold text-xl flex gap-2">
      <FolderCode
        strokeWidth={1}
        stroke="#fff"
        fill="#2563EB"
        className="h-7 w-7 "
      />
      <h2 className="">Exam App</h2>
    </div>
  );
}
