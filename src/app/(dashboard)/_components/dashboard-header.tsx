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
  const examsTitle = searchParams.get("title");
  const { title, Icon } = useMemo(() => {
    if (pathName === "/") return { title: "dashboard", Icon: GraduationCap };
    if (pathName === "/exams") return { title: "exams", Icon: BookOpenCheck };
    if (pathName === "/account" || "/account/change-password")
      return { title: "Account Settings", Icon: UserRound };

    return { title: `[${examsTitle}] Questions`, Icon: null };
  }, [pathName, examsTitle]);

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
