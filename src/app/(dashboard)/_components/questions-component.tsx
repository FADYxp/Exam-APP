"use client";

import { Button } from "@/components/ui/button";
import useGetQuestions from "@/hooks/use-get-questions";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ExamTimer, { EXAM_END_TIME_KEY } from "@/app/(dashboard)/_components/exam-timer";
import { ExamSubmitRequest } from "@/lib/types/answers-submit";
import { useSubmitExamAnswers } from "@/app/(dashboard)/exams/_hooks/use-submit-exam-answers";
import ProgressBar from "@/app/(dashboard)/_components/exam-progress-bar";
import Loader from "@/components/shared/loader";
import Review from "../exams/_components/review";

export default function QuestionsComponent() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [startedAt, setStartedAt] = useState<string>("");
  const { register, watch, setValue, getValues } = useForm({});

  const searchParams = useSearchParams();
  const examId = searchParams.get("id");

  const { data, isLoading } = useGetQuestions(examId!);
  const { submitExamAnswers, submitPending, submitData } = useSubmitExamAnswers();

  useEffect(() => {
    if (!startedAt) {
      setStartedAt(new Date().toISOString());
    }
  }, [startedAt]);

  const currentQuestion = useMemo(() => {
    return data?.payload?.questions[questionIndex];
  }, [data, questionIndex]);

  const totalQuestions = data?.payload?.questions.length ?? 0;
  const formValues = watch();

  useEffect(() => {
    if (currentQuestion) {
      const firstAnswerKey = currentQuestion.answers[0].id;
      if (!formValues[currentQuestion.id]) {
        setValue(currentQuestion.id, firstAnswerKey);
      }
    }
  }, [questionIndex, currentQuestion, formValues, setValue]);

  const handleNext = () => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  // FIX: wrapped in useCallback so this function keeps the SAME
  // reference across re-renders (it only changes if examId/startedAt
  // genuinely change). This is what makes ExamTimer's React.memo
  // actually effective — otherwise a fresh `onTimeUp` function every
  // render defeats the memo and re-triggers the timer's internal
  // useEffect (tearing down/rebuilding its interval) on every keystroke.
  const handleSubmit = useCallback(() => {
    const answers = Object.entries(getValues()).map(
      ([questionId, answerId]) => ({
        questionId,
        answerId: String(answerId),
      })
    );
    const submissionData: ExamSubmitRequest = {
      examId: examId!,
      answers,
      startedAt,
    };
    submitExamAnswers(submissionData);

    // Only clear the timer's PROGRESS (examEndTime) — NOT examDuration.
    // examDuration is the exam's configured length (e.g. "30" minutes),
    // set elsewhere before this page loads. Clearing it here left
    // ExamTimer reading `0` on the very next mount (e.g. after the
    // "Restart" button's location.reload()), which made the timer
    // think time was already up instantly, auto-submitting an empty
    // exam and crashing Review on the missing selectedAnswer fields.
    localStorage.removeItem(EXAM_END_TIME_KEY);
  }, [examId, startedAt, getValues, submitExamAnswers]);

  if (isLoading) return <Loader />;
  if (submitPending)
    return (
      <>
        <Loader />
        <p className="text-center animate-bounce">Calculating Results</p>
      </>
    );
  return (
    <div className="flex min-w-0 flex-col gap-4 bg-white p-3 sm:p-6">
      <ProgressBar current={questionIndex + 1} total={totalQuestions} />
      {submitData ? (
        <Review submitData={submitData} />
      ) : (
        <>
          <h2 className="mt-8 mb-4 break-words text-xl font-semibold text-blue-600 sm:mt-10 sm:text-2xl">
            {currentQuestion?.text}
          </h2>
          {currentQuestion?.answers.map((answer) => (
            <div
              key={answer.id}
              className="w-full bg-gray-50 hover:bg-gray-100 mb-3 "
            >
              <label
                htmlFor={answer.id}
                className="p-4 flex items-center gap-3 cursor-pointer select-none w-full"
              >
                <input
                  id={answer.id}
                  type="radio"
                  value={answer.id}
                  checked={formValues[currentQuestion.id] === answer.id}
                  {...register(currentQuestion.id)}
                  className="
                appearance-none w-4 h-4 rounded-full border border-gray-500 cursor-pointer 
                transition-all duration-200 relative

                after:content-[''] after:w-2 after:h-2 after:bg-blue-600 
                after:rounded-full after:absolute after:top-1/2 after:left-1/2
                after:-translate-x-1/2 after:-translate-y-1/2
                after:opacity-0 after:scale-0 after:transition-all after:duration-200

                checked:after:opacity-100 checked:after:scale-100
                checked:border-blue-600
              "
                />

                <p>{answer.text}</p>
              </label>
            </div>
          ))}

          {/* Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
            <Button
              onClick={handlePrev}
              disabled={questionIndex === 0 || isLoading || submitPending}
              variant={"gray"}
              className="w-auto"
            >
              Previous
            </Button>

            {/* Exam Timer — now isolated from parent re-renders */}
            <div className="">
              <ExamTimer onTimeUp={handleSubmit} />
            </div>

            <Button
              type={
                data?.payload?.questions.length === questionIndex + 1
                  ? "submit"
                  : "button"
              }
              onClick={
                data?.payload?.questions.length === questionIndex + 1
                  ? handleSubmit
                  : handleNext
              }
              disabled={isLoading || isLoading || submitPending}
              className="w-auto"
            >
              {data?.payload?.questions.length === questionIndex + 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}