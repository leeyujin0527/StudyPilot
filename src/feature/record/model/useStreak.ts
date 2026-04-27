import { useQuery } from "@tanstack/react-query";
import { getSessionCurrent } from "../api/get-currentStreak";

export const useStreak = () => {
  return useQuery({
    queryKey: ["streak"],
    queryFn: getSessionCurrent,
  });
};
