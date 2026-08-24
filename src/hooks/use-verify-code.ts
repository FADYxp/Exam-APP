import VerifyCode from "@/lib/services/verify-code.service";
import { useMutation } from "@tanstack/react-query";

export function useCodeVerification() {
  const { data, mutate, isPending, error } = useMutation({
    mutationFn: async (values : CodeVerify) => {
      const payload = await VerifyCode(values);
      
      if (payload.status === false) {
          throw new Error(payload.message);
        }
        console.log("good" + payload)
      return payload;
    },
   
  });
  return {
    codePending: isPending,
    codeError: error,
    codeSubmit: mutate,
    codeResponse: data ,
  };
}
