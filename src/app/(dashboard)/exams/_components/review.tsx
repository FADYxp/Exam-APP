"use client";
import ResultsCircle from "@/app/(dashboard)/_components/results-circle";
import { ExamResultResponse } from "@/lib/types/answers-submit";
import React from "react";
import Ellipse from "./ellipse";
import { Button } from "@/components/ui/button";
import { FolderSearch, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Review({
  submitData,
}: {
  submitData: ExamResultResponse;
}) {
  //router
  const router = useRouter();
const params = useSearchParams()

  const { submission, analytics } = submitData;

  return (
    <div className="font-geist">
      {/* Header with Exam Title */}
      <div className="mb-6">
        <h1 className="font-semibold text-3xl text-blue-600 mb-2">
          {submission.examTitle}
        </h1>
        <p className="text-gray-600 text-sm">
          Submitted on {new Date(submission.submittedAt).toLocaleString()}
        </p>
      </div>

      {/* Results Summary */}
      <h1 className="font-semibold pt-6 mb-4 text-2xl text-blue-600">
        Results:
      </h1>
      <div className="flex gap-9 items-start">
        <div className="flex-shrink-0">
          <ResultsCircle 
            results={{
              correct: submission.correctAnswers,
              wrong: submission.wrongAnswers,
              total: submission.totalQuestions,
              score: submission.score,
            }} 
          />
        </div>

        {/* Summary Statistics */}
        <div className="bg-blue-50 p-6 rounded-lg flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Questions</p>
              <p className="font-bold text-2xl text-blue-600">
                {submission.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Your Score</p>
              <p className="font-bold text-2xl text-blue-600">
                {submission.score}%
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Correct Answers</p>
              <p className="font-bold text-2xl text-emerald-600">
                {submission.correctAnswers}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Wrong Answers</p>
              <p className="font-bold text-2xl text-red-600">
                {submission.wrongAnswers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Review */}
      <h2 className="font-semibold text-xl text-blue-600 mt-8 mb-4">
        Detailed Review:
      </h2>
      <div className="overflow-y-scroll w-full p-4 border border-gray-200 rounded-lg max-h-[60vh] scrollbar-track-gray-50 scrollbar-thumb-gray-200 scrollbar space-y-4">
        {analytics.map((question, index) => (
          <div
            key={question.questionId}
            className={`p-4 rounded-lg border-2 ${
              question.isCorrect ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
            }`}
          >
            <div className="mb-3">
              <h4 className="text-blue-600 font-semibold text-lg mb-2">
                Question {index + 1}: {question.questionText}
              </h4>
            </div>

            <div className="space-y-2">
              {/* Selected Answer */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Your Answer:
                </p>
                <div
                  className={`flex gap-3 p-3 rounded items-center ${
                    question.isCorrect ? "bg-white" : "bg-red-100"
                  }`}
                >
                  <Ellipse correct={question.isCorrect} />
                  <span className={question.isCorrect ? "text-emerald-700" : "text-red-700"}>
                    {question.selectedAnswer.text}
                  </span>
                </div>
              </div>

              {/* Correct Answer (only show if wrong) */}
              {!question.isCorrect && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Correct Answer:
                  </p>
                  <div className="flex gap-3 p-3 rounded items-center bg-white border border-emerald-300">
                    <Ellipse correct={true} />
                    <span className="text-emerald-700">
                      {question.correctAnswer.text}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex font-medium gap-4 mt-8">
        <Button
          onClick={() => location.reload()}
          variant={"gray"}
          className="flex gap-2"
        >
          <RotateCcw size={18} />
          Restart
        </Button>
        <Button onClick={() => router.push(`/exams?diplomaId=${params.get("diplomaId")}`)} className="gap-2">
          <FolderSearch size={18} />
          Explore
        </Button>
      </div>
    </div>
  );
}
