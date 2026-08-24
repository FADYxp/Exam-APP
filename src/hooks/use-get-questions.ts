import { QuestionsResponse } from "@/lib/types/questians";
import { useQuery } from "@tanstack/react-query";

export default function useGetQuestions(id: string) {
  return useQuery<QuestionsResponse>({
    queryKey: ["exam", id],
    queryFn: async () => {
      const res = await fetch(`/api/questions?id=${id}`, { method: "GET" });
      const data = await res.json()
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    enabled: !!id,
  });
}
