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
    <div className="flex gap-2 m-6 mb-0">
      {title !== "dashboard" && (
        <Button
          variant={"outline"}
          className="w-9 h-fit bg-white text-blue-600 py-[1.6563rem]"
          onClick={() => {
            history.back();
          }}
        >
          <ChevronLeft width={24} height={24} />
        </Button>
      )}

      <div className="bg-blue-600 p-4 text-white flex items-center gap-4 w-full">
        {Icon && <Icon size={45} />}
        <h1 className="font-inter capitalize text-[2rem] font-semibold">
          {title}
        </h1>
      </div>
    </div>
  );
}
