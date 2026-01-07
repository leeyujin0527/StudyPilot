import { DesType, DesResponse } from "./des-type";
import { http } from "@/src/shared/api/http";

export const destination = async (DesType : DesType) : Promise<DesResponse> => {
    const {data} = await http.post<DesResponse>("api/recommendations/country", DesType);
    return data;
}