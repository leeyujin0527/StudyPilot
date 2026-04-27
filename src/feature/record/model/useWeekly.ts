import { useQuery } from "@tanstack/react-query"
import { getSessionWeekly } from "../api/get-weekly"


export const useWeekly = () =>{
    return useQuery({
        queryKey : ["weekly"],
        queryFn: getSessionWeekly
    })
}