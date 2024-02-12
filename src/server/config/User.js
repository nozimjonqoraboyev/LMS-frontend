import {HttpRequestHub} from "../HttpRequestHub";

export const userInfo=()=>{
    const config={
        url:'/auth/get-user-info',
        method:'GET',
    }
    return HttpRequestHub(config);
}