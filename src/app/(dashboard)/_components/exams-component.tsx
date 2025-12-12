"use client";
import { ExamsResponse } from "@/lib/types/exams";
import { useQuery } from "@tanstack/react-query";
import { Timer } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/shared/loader";

export default function ExamsComponent() {
  const router = useRouter();
  const { data, isLoading } = useQuery<ExamsResponse>({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await fetch("/api/exams");

      return res.json();
    },
    refetchOnMount: true,
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        data?.exams.map((exam) => (
          <div
            key={exam._id}
            className="flex flex-col gap-4 bg-blue-50 cursor-pointer"
            onClick={() => {
              localStorage.setItem(
                "examDuration",
                JSON.stringify(exam.duration)
              );
              const slug = exam.title.toLowerCase().replace(/\s+/g, "-");
              router.push(
                `/exams/${slug}/Questions?id=${exam._id}&title=${slug}`
              );
            }}
          >
            <div className="flex items-center justify-between p-4">
              <div>
                <h2 className="text-blue-600 text-xl font-semibold">
                  {exam.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {exam.numberOfQuestions} Questions
                </p>
              </div>

              <div className="flex gap-1 items-center">
                <Timer strokeWidth={1.5} className="text-2xl text-gray-400" />
                <p className="text-sm">Duration: {exam.duration} minutes</p>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
