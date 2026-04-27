import { useMutation, useQueryClient } from "@tanstack/react-query"
import { resumeSession } from "../api/resume-session"

export const useResume = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : resumeSession,
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey : ["resume"]
            })
        }
    })
}