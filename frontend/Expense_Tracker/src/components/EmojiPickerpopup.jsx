import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import { LuImage,LuX} from "react-icons/lu"
const Emojipickerpopup = ({icon,onselect}) => {
  const[isopen,setisopen]=useState(false);
    return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
        <div className='flex items-center gap-4 cursor-pointer' onClick={()=>setisopen(true)}>
            <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg'>
                {icon?(
                    <img src={icon} alt="icon" className='w-12 h-12'/>
                ):(
                    <LuImage/>
                )}
            </div>
            <p className=''>{icon ?"Change Icon":"Pick Icon"}</p>
        </div>
        {isopen && (
            <div className='relative'>
                <button className='w-7 h-7 justify-center items-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer' onClick={()=>setisopen(false)}>
                    <LuX/>
                </button>
            <EmojiPicker open={isopen} onEmojiClick={(emoji)=>onselect(emoji?.imageUrl || "")}/>
                </div>

           
        )}
    </div>
  )
}

export default Emojipickerpopup