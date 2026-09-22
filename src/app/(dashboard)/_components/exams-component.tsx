"use client";
import { ExamsResponse } from "@/lib/types/exams";
import { useQuery } from "@tanstack/react-query";
import { Timer, BookOpen } from "lucide-react";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Loader from "@/components/shared/loader";

export default function ExamsComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const diplomaId = searchParams.get("diplomaId");
  const diplomaTitle = searchParams.get("diplomaTitle");

  const { data, isLoading } = useQuery<ExamsResponse>({
    queryKey: ["exams", diplomaId],
    queryFn: async () => {
      const url = new URL("/api/exams", window.location.origin);
      if (diplomaId) {
        url.searchParams.append("diplomaId", diplomaId);
      }
      const res = await fetch(url.toString());
      const data = await res.json();
      console.log(data);
      return data;
    },
    refetchOnMount: true,
    enabled: !!diplomaId,
  });

  if (!diplomaId) {
    return <div className="text-gray-500 text-center py-8">No diploma selected</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.payload?.data || data.payload.data.length === 0) {
    return <div className="text-gray-500 text-center py-8">No exams available</div>;
  }

  return (
    <div className="space-y-4">
      {data.payload.data.map((exam) => (
            <div
              key={exam.id}
              className="flex min-w-0 flex-wrap gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md sm:flex-nowrap"
            >
              {/* Exam Image/Icon */}
              <div className="relative flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
                {exam.image ? (
                  <Image
                    src={exam.image}
                    alt={exam.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <BookOpen className="w-10 h-10 text-white" />
                )}
              </div>

              {/* Exam Content */}
              <div className="min-w-0 flex-1">
                <h2
                  className="text-blue-600 text-lg font-semibold hover:underline cursor-pointer mb-1"
                  onClick={() => {
                    localStorage.setItem(
                      "examDuration",
                      JSON.stringify(exam.duration)
                    );
                    router.push(
                      `/exams?examId=${exam.id}&title=${exam.title}`
                    );
                  }}
                >
                  {exam.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {exam.description}
                </p>
              </div>

              {/* Exam Info & Action */}
              <div className="flex w-full flex-row items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end">
                <div className="flex flex-col gap-2 text-right text-sm">
                  <div className="flex items-center gap-1 justify-end">
                    <BookOpen strokeWidth={1.5} className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{exam.questionsCount} Questions</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <Timer strokeWidth={1.5} className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{exam.duration} mins</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "examDuration",
                      JSON.stringify(exam.duration)
                    );
                    router.push(
                      `/exams/${exam.title}?diplomaId=${diplomaId}&diplomaTitle=${diplomaTitle}&id=${exam.id}`
                    );
                  }}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  START →
                </button>
              </div>
            </div>
          ))}
    </div>
  );
}
