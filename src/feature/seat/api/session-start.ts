import { http } from '@/src/shared/api/http'
import { startRequest } from '../type/start-req'
import { startResponse } from '../type/start-res'

export const sessionStart = async(startRequest: startRequest) : Promise<startResponse> => {
    const { data } = await http.post("api/sessions", startRequest)
    return data;
}