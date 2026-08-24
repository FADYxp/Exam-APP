"use client";

interface RegisterProgressBarProps {
  currentStep: number;
}

export function RegisterProgressBar({
  currentStep,
}: RegisterProgressBarProps) {
  const steps = [
    { step: 1, label: "Email" },
    { step: 2, label: "Verify" },
    { step: 3, label: "Profile" },
    { step: 4, label: "Password" },
  ];

  return (
    <div className="mb-4">
      {/* Progress Container */}
      <div className="flex items-center gap-1 relative">
        {steps.map((item, index) => (
          <div key={item.step} className="flex flex-col items-center relative flex-1">
            {/* Diamond Shape */}
            <div
              className={`w-4 h-4 transition-all duration-700 ease-out z-10 relative flex-shrink-0 ${
                item.step <= currentStep
                  ? "bg-blue-500"
                  : "bg-blue-200 border-1.5 border-blue-300"
              }`}
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              }}
            />
            
            {/* Connector Line */}
            {index < steps.length && (
              <div
                className="absolute top-1.5 left-2 h-px transition-all duration-300 flex-1"
                style={{
                  width: "100%",
                  borderTop: item.step < currentStep 
                    ? "2px solid rgb(59, 130, 246)" 
                    : "2px dashed rgb(147, 197, 253)",
                }}
              />
            )}

            {/* Label */}
            <span
              className={`text-xs mt-2 font-medium whitespace-nowrap ${
                item.step <= currentStep ? "text-blue-500" : "text-gray-400"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
