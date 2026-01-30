import { currentStreak } from "../type/getCurrentResponse"
import { http } from "@/src/shared/api/http"
export const getSessionCurrent = async() : Promise<currentStreak>  =>{
    const {data} = await http.get("/api/sessions/streak")
    return data
}