import axios from "axios"
import {BASE_URL} from "./apiPath"
const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    },
});
axiosInstance.interceptors.request.use(
    (config)=>{
        const accesstoken=localStorage.getItem("token");
        if(accesstoken){
            config.headers.Authorization=`Bearer ${accesstoken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response)=>{
        return  response;
    },
    (error)=>{
        if(error.response){
            if(error.response.status===401){
                window.location.href="/login";
            }else if(error.response.status===500){
                console.error("server error");
            }
        }
        else if(error.code==="ECONNABORTED"){
                console.error("REQUEST TIME OUT");
            }
            return Promise.reject(error);
        
    }
);
export default axiosInstance;