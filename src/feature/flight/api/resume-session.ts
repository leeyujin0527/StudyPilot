import { http } from "@/src/shared/api/http";
import { ResumeResponse } from "../type/resume-response";

export const resumeSession = async (sessionId : string) : Promise<ResumeResponse > => {
    const {data} = await http.patch<ResumeResponse >(`/api/sessions/${sessionId}/resume`);
    return data;
}