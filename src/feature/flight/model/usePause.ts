import { useMutation, useQueryClient } from "@tanstack/react-query"
import { pauseSession } from "../api/pause-session"

export const usePause = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : pauseSession,
        onSuccess : () =>{
            queryClient.invalidateQueries({
                queryKey : ["pause"]
            });
        }
    })
}