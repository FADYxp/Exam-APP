import ExamAppIcon from "@/components/shared/exam-app-icon";
import Header from "@/components/shared/header";
import {
  BookOpenCheck,
  Brain,
  RectangleEllipsis,
} from "lucide-react";
import React from "react";

export default function AuthenticationStatic() {
  const content = [
    {
      icon: <Brain size={27} />,
      header: "Tailored Diplomas",
      paragraph:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
    {
      icon: <BookOpenCheck size={27} />,
      header: "Focused Exams",
      paragraph:
        "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    },
    {
      icon: <RectangleEllipsis size={27} />,
      header: "Smart Multi-Step Forms",
      paragraph:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
  ];
  return (
<>
  <div className="relative hidden min-h-screen items-center justify-center overflow-hidden bg-white lg:flex">

    {/* Top Right Blur Circle */}
    <div className="absolute w-[25.125rem] h-[25.125rem] bg-blue-400 rounded-full top-[100px] right-[-100px] blur-[170px]"></div>

    {/* Bottom Left Blur Circle */}
    <div className="absolute w-[25.125rem] h-[25.125rem] bg-blue-400 rounded-full bottom-0 left-[-120px] blur-[170px]"></div>

    {/* Your content */}
    <div className="relative z-10 w-full max-w-2xl px-8 xl:px-16">
      <ExamAppIcon />
      <div className="flex-wrap py-16 xl:py-24">
        <div className="mb-12">
          <Header>
            Empower your learning journey with our smart exam platform.
          </Header>
        </div>

        <div className="flex flex-col gap-7">
          {content.map((item, index) => {
            return (
              <div key={index} className="flex min-w-0 gap-4">
                <div className="p-1 w-10 h-10 text-blue-600 border-2 border-blue-600 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-blue-600">
                    {item.header}
                  </h2>
                  <p className="mt-3 text-gray-700">{item.paragraph}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</>

  );
}
