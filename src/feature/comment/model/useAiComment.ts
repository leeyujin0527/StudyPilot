import {useQuery } from "@tanstack/react-query";
import { aiComment } from "../api/aiComment";

export const useAiComment = () => {
  return useQuery({
    queryKey: ["ai-comment"],
    queryFn: aiComment,
  });
};
