"use client";

import { Button } from "@/components/ui/button";
import useGetQuestions from "@/hooks/use-get-questions";
import { SavedAnswersType } from "@/lib/types/exams";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ExamTimer from "@/app/(dashboard)/_components/exam-timer";
import { ExamSubmitRequest } from "@/lib/types/answers-submit";
import { useSubmitAnswers } from "@/hooks/use-submit-answers";
import ProgressBar from "@/app/(dashboard)/_components/exam-progress-bar";
import Loader from "@/components/shared/loader";
import Review from "../exams/_components/review";

// Saved Answers Type

// Questions Component
export default function QuestionsComponent() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [savedAnswers, setSavedAnswers] = useState<SavedAnswersType>({});
  // form
  const { register, watch, setValue, getValues } = useForm({});

  //  Search Params
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // mutations
  // Exam Questions Function
  const { data, isLoading } = useGetQuestions(id!);
  const { submitAnswers, submitPending, submitData } = useSubmitAnswers();

  // Variables
  const currentQuestion = useMemo(() => {
    return data?.questions[questionIndex];
  }, [data, questionIndex]);

  const totalQuestions = data?.questions.length ?? 0;
  const formValues = watch();

  // useEffect to set default answer for current question
  useEffect(() => {
    if (currentQuestion) {
      const firstAnswerKey = currentQuestion.answers[0].key;
      if (!formValues[currentQuestion._id]) {
        setValue(currentQuestion._id, firstAnswerKey);
      }
    }
  }, [questionIndex, currentQuestion, formValues, setValue]);

  // Saves answers on question change {UseMemo}
  useMemo(() => {
    if (!currentQuestion) return;

    const questionId = currentQuestion._id;
    setSavedAnswers((prev) => {
      if (prev[questionId]) return prev;

      const answersObj: { [key: string]: string } = {};
      currentQuestion.answers.forEach((answer) => {
        answersObj[answer.key] = answer.answer;
      });

      return {
        ...prev,
        [questionId]: { answers: answersObj },
      };
    });
  }, [currentQuestion]);

  // FUNCTIONS
  // Handle Next Question
  const handleNext = () => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((prev) => prev + 1);
    }
  };
  // Handle previous Question
  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  //Sorting answers Function
  const sortAnswers = () => {
    const answers = Object.entries(getValues()).map(
      ([questionId, correct]) => ({
        questionId,
        correct: String(correct),
      })
    );
    return { answers };
  };

  // Handle submit Answers
  const handleSubmit = () => {
    const answers: ExamSubmitRequest = sortAnswers();
    submitAnswers(answers);
  };

  //   Rendering
  if (isLoading) return <Loader />;
  if (submitPending)
    return (
      <>
        <Loader />
        <p className="text-center animate-bounce">Calculating Results</p>
      </>
    );
  return (
    <div className="bg-white flex flex-col gap-4 p-6 ">
      <ProgressBar current={questionIndex + 1} total={totalQuestions} />
      {submitData ? (
        // results review component
        <Review submitData={submitData} savedAnswers={savedAnswers} />
      ) : (
        <>
          <h2 className="font-semibold text-2xl mt-10 mb-4 text-blue-600 ">
            {currentQuestion?.question}
          </h2>
          {currentQuestion?.answers.map((answer) => (
            <div
              key={answer.key}
              className="w-full bg-gray-50 hover:bg-gray-100 mb-3 "
            >
              <label
                htmlFor={answer.key}
                className="p-4 flex items-center gap-3 cursor-pointer select-none w-full"
              >
                <input
                  id={answer.key}
                  type="radio"
                  value={answer.key}
                  checked={formValues[currentQuestion._id] === answer.key}
                  {...register(currentQuestion._id)}
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

                <p>{answer.answer}</p>
              </label>
            </div>
          ))}

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between items-center mt-6">
            {/* Previous Button */}
            <Button
              onClick={handlePrev}
              disabled={questionIndex === 0 || isLoading || submitPending}
              variant={"gray"}
            >
              Previous
            </Button>

            {/* Exam Timer */}
            <div className="">
              <ExamTimer onTimeUp={handleSubmit} />
            </div>

            {/* Next Button */}
            <Button
              type={
                data?.questions.length === questionIndex + 1
                  ? "submit"
                  : "button"
              }
              onClick={
                data?.questions.length === questionIndex + 1
                  ? handleSubmit
                  : handleNext
              }
              disabled={isLoading || isLoading || submitPending}
            >
              {data?.questions.length === questionIndex + 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
