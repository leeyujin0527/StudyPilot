import { http } from "@/src/shared/api/http";
import { stopSessionType } from "../type/stop-type";
import { Checklist } from "../type/checklist-type";

export const stopSession = async (sessionId : string, checklists : Checklist[]) : Promise<stopSessionType> => {
    const {data} = await http.patch<stopSessionType>(`/api/sessions/${sessionId}/end`, {checklists});
    return data;
}