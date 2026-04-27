import { useQuery } from "@tanstack/react-query";
import { getSessionAll } from "../api/get-sessionAll";

export const useGetAllSession = () => {
  return useQuery({
    queryKey: ["allSession"],
    queryFn: getSessionAll,
  });
};
