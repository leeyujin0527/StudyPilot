import { http } from "@/src/shared/api/http";
import { PauseResponse } from "../type/pause-response";

export const pauseSession = async (sessionId : string) : Promise<PauseResponse> => {
    const {data} = await http.patch<PauseResponse>(`/api/sessions/${sessionId}/pause`);
    return data;
}