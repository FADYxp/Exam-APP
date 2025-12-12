import { QuestionsResponse } from "@/lib/types/questians";
import { useQuery } from "@tanstack/react-query";

export default function useGetQuestions(id: string) {
  return useQuery<QuestionsResponse>({
    queryKey: ["exam", id],
    queryFn: async () => {
      const res = await fetch(`/api/questions?exam=${id}`, { method: "GET" });
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    enabled: !!id,
  });
}
