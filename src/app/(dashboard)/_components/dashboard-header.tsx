import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpenCheck,
  ChevronLeft,
  GraduationCap,
  UserRound,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

export default function MainHeader() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const diplomaTitle = searchParams.get("diplomaTitle");
  
  const formatExamName = (segment: string): string => {
    return decodeURIComponent(segment)
      .replace(/%20/g, "-")
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const { title, Icon } = useMemo(() => {
    if (pathName === "/") return { title: "dashboard", Icon: GraduationCap };
    if (pathName === "/account" || pathName === "/account/change-password")
      return { title: "account settings", Icon: UserRound };
    
    // Check if in a specific exam (has segments after /exams/)
    const segments = pathName.split("/").filter(Boolean);
    if (segments[0] === "exams" && segments.length > 1) {
      const examName = formatExamName(segments[1]);
      return { title: `${examName} Questions`, Icon: BookOpenCheck };
    }
    
    if (pathName === "/exams" && diplomaTitle) 
      return { title: `${diplomaTitle} Exams`, Icon: BookOpenCheck };
    if (pathName === "/exams") 
      return { title: "exams", Icon: BookOpenCheck };

    return { title: "dashboard", Icon: GraduationCap };
  }, [pathName, diplomaTitle]);

  return (
    <div className="m-3 mb-0 flex gap-2 sm:m-6 sm:mb-0">
      {title !== "dashboard" && (
        <Button
          variant={"outline"}
          className="h-fit w-9 bg-white py-3 text-blue-600 sm:py-[1.6563rem]"
          onClick={() => {
            history.back();
          }}
        >
          <ChevronLeft width={24} height={24} />
        </Button>
      )}

      <div className="flex min-w-0 w-full items-center gap-3 bg-blue-600 p-3 text-white sm:gap-4 sm:p-4">
        {Icon && <Icon className="shrink-0" size={32} />}
        <h1 className="min-w-0 truncate font-inter text-xl font-semibold capitalize sm:text-[2rem]">
          {title}
        </h1>
      </div>
    </div>
  );
}
