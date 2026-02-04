import { Checklist } from "../type/getChecklistResponse"
import { http } from "@/src/shared/api/http"
export const getSessionChecklist = async(sessionId : string) : Promise<Checklist[]>  =>{
    const {data} = await http.get(`/api/sessions/${sessionId}/checklists`)
    return data
}