import { RegisterStep3And4Type } from "@/lib/schemes/register-step3-4.schema";
import { useMutation } from "@tanstack/react-query";
import { registerStep3And4Service } from "@/lib/services/register-final.service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function useRegisterStep3And4() {
  const router = useRouter();
  const { toast } = useToast();

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: RegisterStep3And4Type) => {
      const response = await registerStep3And4Service(values);
      if (response?.code > 205) {
        throw new Error(response.message || "Registration failed");
      }
      return response;
    },
    onSuccess: () => {
      toast({ title: "Welcome to our platform ♥" });
      router.push("/login");
    },
  });

  return { isPending, register: mutate };
}
