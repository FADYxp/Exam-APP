"use client";
import React, { useEffect, useState } from "react";

export default function ExamTimer({ onTimeUp }: { onTimeUp: () => void }) {
  const Duration = Number(localStorage.getItem("examDuration"));
  const totalSeconds = Duration! * 60;

  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // circle settings
  const size = 60;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalSeconds) * circumference;
  const finished = circumference - progress;

  // timer useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      localStorage.setItem("examDuration", JSON.stringify(Duration));
    };
  }, [onTimeUp, Duration]);

  return (
    <div className="relative w-[60px] h-[60px] flex items-center justify-center">
      {/* الخلفية */}
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

      {/* الدائرة */}
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
