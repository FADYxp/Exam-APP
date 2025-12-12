"use client";
import ResultsCircle from "@/app/(dashboard)/_components/results-circle";
import { ExamResultResponse } from "@/lib/types/answers-submit";
import React from "react";
import Ellipse from "./ellipse";
import { Button } from "@/components/ui/button";
import { FolderSearch, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { SavedAnswersType } from "@/lib/types/exams";

export default function Review({
  submitData,
  savedAnswers,
}: {
  submitData: ExamResultResponse;
  savedAnswers: SavedAnswersType;
}) {
  //router
  const router = useRouter();

  return (
    <div className="font-geist">
      <h1 className="font-semibold  pt-6 mb-4 text-2xl text-blue-600">
        Results:
      </h1>
      <div className="flex gap-9 items-center">
        <ResultsCircle results={submitData} />
        <div className="overflow-y-scroll w-full p-1 border border-gray-100 max-h-[50vh] scrollbar-track-gray-50 scrollbar-thumb-gray-200 scrollbar   ">
          {submitData.WrongQuestions.map((question, index) => {
            const saved = savedAnswers[question.QID];

            if (!saved) return null;

            return (
              <div
                key={index}
                className=" p-2 flex flex-col gap-2 text-sm capitalize"
              >
                <h4 className="text-blue-600 font-semibold text-xl mb-2">
                  {question.Question}
                </h4>
                <p className="flex gap-2 p-4 items-center bg-red-50">
                  <Ellipse correct={false} />{" "}
                  {saved.answers[question.inCorrectAnswer]}
                </p>
                <p className=" flex gap-2 p-4 items-center bg-emerald-50">
                  <Ellipse correct={true} />{" "}
                  {saved.answers[question.correctAnswer]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex font-medium gap-4 mt-10">
        <Button
          onClick={() => location.reload()}
          variant={"gray"}
          className="flex gap-2"
        >
          <RotateCcw />
          Restart
        </Button>
        <Button onClick={() => router.push("/exams")} className="gap-2">
          <FolderSearch />
          Explore
        </Button>
      </div>
    </div>
  );
}
