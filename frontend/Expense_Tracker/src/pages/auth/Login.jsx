import React, { use, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import card_2 from '../../assets/images/image.png'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
const Login = () => {
    const[email,SetEmail]=useState();
    const[password,SetPassword]=useState();
    const[error,seterror]=useState(false);
    const  navigate=useNavigate();
    const handlelogin=async(e)=>{}
  return (
    <AuthLayout>
    <div className='g:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className="text-xl font-semibody text-black">welcome back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'> Please enter your details to login in</p>
        <form onSubmit={handlelogin}>
            <Input
            value={email}
            onchange={({target})=>SetEmail(target.value)}
            label='email address'
            placeholder="john@example.com"
            type="text"/>
               <Input
            value={password}
            onchange={({target})=>SetPassword(target.value)}
            label='password'
            placeholder="Min 8 characters"
            type="password"/>
        </form>
    </div>
    </AuthLayout>
  )
}

export default Login