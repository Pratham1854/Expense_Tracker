import { createContext, useState } from "react";
import React  from "react";
export const UserContext=createContext();
const Userprovider=({children})=>{
const[user,setuser]=useState(null);
//func to  update user data
const updateuser=(userdata)=>{
    setuser(userdata);
};
const clearuser=()=>{
    setuser(null);
};
return(
<UserContext.Provider value={{
    user,
    updateuser,
    clearuser,
}}>
{children}
</UserContext.Provider>
);
}
export default Userprovider;