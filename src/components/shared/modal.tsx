import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { TriangleAlert } from "lucide-react";

export default function Modal({
  deleteAccount,
  isPending,
}: {
  deleteAccount: () => void;
  isPending: boolean;
}) {
  return (
    <Dialog >
      <DialogTrigger className="w-full">
        <Button variant="red" type="button">
          Delete My Account
        </Button>
      </DialogTrigger>
      <DialogContent className=" font-geist">
        <div className="flex flex-col items-center justify-center ">
          <div className=" flex items-center justify-center mt-12">
            <span className=" rounded-full bg-red-50 w-28 h-28 flex items-center justify-center">
              <span className="w-20 h-20 rounded-full flex items-center justify-center bg-red-100 text-red-600">
                <TriangleAlert strokeWidth={1} size={50} />
              </span>
            </span>
          </div>

        <DialogHeader className="mt-9 flex flex-col items-center justify-center ">
          <DialogTitle className="text-red-600 font-medium text-lg text-center">
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm text-center">
            This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-2 border border-r-0 border-b-0 border-l-0 border-t-gray-200 p-4 sm:flex-row sm:p-6">
<DialogClose>
              <Button type="button"  disabled={isPending} variant={"gray"} className="w-full sm:w-56">
            Cancel
          </Button>
</DialogClose>
          <Button
            disabled={isPending}
            onClick={() => {
              deleteAccount();
            }}
            variant={"destructive"}
            className="w-full sm:w-56"
          >
            Yes, delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
