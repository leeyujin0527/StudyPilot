import { GetSessionAllResponse } from "../type/getSessionAllResponse"
import { http } from "@/src/shared/api/http"
export const getSessionAll = async() : Promise<GetSessionAllResponse>  =>{
    const {data} = await http.get("/api/sessions/all")
    return data
}