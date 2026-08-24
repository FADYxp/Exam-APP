"use client";
import React from "react";

interface ResultsCircleProps {
  results: {
    correct: number;
    wrong: number;
    total: number;
    score: number;
  };
}

export default function ResultsCircle({ results }: ResultsCircleProps) {
  const size = 203;
  const strokeWidth = 40;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const total = results.correct + results.wrong;

  const correctPercent = (results.correct / total) * 100;
  const wrongPercent = (results.wrong / total) * 100;

  const correctLength = (correctPercent / 100) * circumference;
  const wrongLength = (wrongPercent / 100) * circumference;

  return (
    <div>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          {/* wrong */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#EF4444" // Red 500
            strokeWidth={strokeWidth}
            strokeDasharray={`${wrongLength} ${circumference}`}
            strokeDashoffset={0}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />

          {/* correct */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#10B981" // Emerald 500
            strokeWidth={strokeWidth}
            strokeDasharray={`${correctLength} ${circumference}`}
            strokeDashoffset={-wrongLength}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
      </div>

      {/* النص داخل الدائرة */}
      <div className=" flex flex-col items-center justify-center mt-6 mx-auto gap-2 w-fit text-black">
        <div className="flex items-center gap-2 me-auto">
          <span className="p-4 bg-emerald-500" />
          <span className=" text-sm">
            Correct: {results.correct}
          </span>
        </div>
        <div className="flex items-center gap-2 me-auto">
          <span className="p-4 bg-red-500" />
          <span className=" text-sm">
            Incorrect: {results.wrong}
          </span>
        </div>
      </div>
    </div>
  );
}
