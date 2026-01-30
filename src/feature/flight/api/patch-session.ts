import { http } from "@/src/shared/api/http";
import { stopSessionType } from "../type/stop-type";

export const stopSession = async (sessionId : string) : Promise<stopSessionType> => {
    const {data} = await http.patch<stopSessionType>(`/api/sessions/${sessionId}/end`);
    return data;
}