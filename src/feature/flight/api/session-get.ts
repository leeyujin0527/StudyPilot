import { sessionInfo } from "../type/sessionInfo";
import { http } from "@/src/shared/api/http";

export const getSession = async (sessionId : string) : Promise<sessionInfo> => {
    const {data} = await http.get<sessionInfo>(`/api/sessions/${sessionId}`)
    return data;
}