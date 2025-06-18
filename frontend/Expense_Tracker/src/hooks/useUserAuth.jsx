import { API_PATHS } from "../utils/apiPath"
import axiosInstance from "../utils/axiosInstance"
import { UserContext } from '../context/UserContext';
import {useNavigate} from "react-router-dom"
import {useEffect,useContext} from "react"
export const useUserAuth=()=>{
//const { useContext, useEffect } = require("react")

const navigate=useNavigate()
const{user,updateuser,clearuser}=useContext(UserContext)
useEffect(()=>{
    if(user) return;
    let ismounted=true;
const fetchuserinfo=async()=>{
    try{
        const response=await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if(ismounted &&response.data){
            updateuser(response.data);
        }
    }catch(error){
        console.error("failed to fetch");
        if(ismounted){
            clearuser();
            navigate("/login");
        }

    }

};
fetchuserinfo();
return ()=>{
    ismounted=false;
}
},[updateuser,clearuser,navigate]);


};