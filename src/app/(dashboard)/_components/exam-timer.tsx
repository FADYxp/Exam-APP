"use client";
import React, { useEffect, useState } from "react";

const END_TIME_KEY = "examEndTime";
export const EXAM_END_TIME_KEY = END_TIME_KEY;

// React.memo: skip re-rendering this component entirely when its props
// haven't changed, even if the parent (QuestionsComponent) re-renders
// on every keystroke/answer-select via react-hook-form's watch().
// Without this, ExamTimer's function body re-runs on every parent
// render regardless of whether onTimeUp actually changed.
function ExamTimer({ onTimeUp }: { onTimeUp: () => void }) {
  const Duration = Number(localStorage.getItem("examDuration"));
  const totalSeconds = Duration! * 60;

  // Resolve (and persist) the exam's actual end timestamp once, on
  // first render — not the remaining seconds directly. Storing a wall-
  // clock end time survives refresh AND tab-throttling without drift,
  // unlike persisting a decrementing counter.
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const storedEndTime = localStorage.getItem(END_TIME_KEY);

    if (storedEndTime) {
      const remaining = Math.round((Number(storedEndTime) - Date.now()) / 1000);
      return Math.max(0, remaining);
    }

    const endTime = Date.now() + totalSeconds * 1000;
    localStorage.setItem(END_TIME_KEY, String(endTime));
    return totalSeconds;
  });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // circle settings
  const size = 60;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalSeconds) * circumference;
  const finished = circumference - progress;

  useEffect(() => {
    const endTime = Number(localStorage.getItem(END_TIME_KEY));

    const timer = setInterval(() => {
      const remaining = Math.round((endTime - Date.now()) / 1000);

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        // Time is genuinely over — clear the stored end time so the
        // NEXT exam attempt starts a fresh countdown instead of
        // reading this finished one.
        localStorage.removeItem(END_TIME_KEY);
        onTimeUp();
        return;
      }

      setTimeLeft(remaining);
    }, 1000);

    // Cleanup: only stop the interval. We deliberately do NOT touch
    // localStorage here — an ordinary unmount (e.g. navigating away
    // mid-exam) must leave the stored end time intact so refreshing
    // or coming back resumes the same countdown, not a fresh one.
    return () => {
      clearInterval(timer);
    };
  }, [onTimeUp]);

  return (
    <div className="relative w-[60px] h-[60px] flex items-center justify-center">
      {/* Back-Ground */}
      <svg className="absolute top-0 left-0" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#DBEAFE"
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {/* Circle */}
      <svg className="absolute top-0 left-0" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#155DFC"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={finished}
          strokeLinecap="square"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>

      {/* الوقت */}
      <div className="text-xs text-black">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
}

export default React.memo(ExamTimer);
