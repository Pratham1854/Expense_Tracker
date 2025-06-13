import React, { useContext } from 'react'
import {SIDE_MENU_DATA} from '../../utils/data'
import { UserContext } from '../../context/UserContext'
import {useNavigate} from "react-router-dom"
const Sidemenu = ({activemenu}) => {
  const{user,clearuser}=useContext(UserContext)
  const navigate=useNavigate();
  const handleclick=(route)=>{
    if(route==="logout"){
      handlelogout();
      return;
    }
    navigate(route);
  };
  const handlelogout=()=>{
    localStorage.clear();
    clearuser();
    navigate("/login");
  };
  return (
    <div>Sidemenu</div>
  )
}

export default Sidemenu