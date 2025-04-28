import { fetchQuizById } from "@api/QuizApi";
import { QuizResponse } from "@models/Response/quizResponse";
import { useQuery } from "@tanstack/react-query";

const useFetchQuizById = (id: string | undefined) => {
  const { data, isLoading, error } = useQuery<QuizResponse>({
    queryKey: ["quiz", id],
    queryFn: () => fetchQuizById(id!),
    enabled: !!id,
  });
  return { data, isLoading, error };
};

export default useFetchQuizById;
