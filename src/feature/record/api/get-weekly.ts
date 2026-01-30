import { WeeklySummaryResponse } from "../type/getWeeklyResponse"
import { http } from "@/src/shared/api/http"
export const getSessionWeekly = async() : Promise<WeeklySummaryResponse>  =>{
    const {data} = await http.get("/api/sessions/weekly")
    return data
}