import React, { use, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
//import card_2 from '../../assets/images/image.png'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import { validateEmail } from '../../utils/helper';
const Login = () => {
    const[email,SetEmail]=useState();
    const[password,SetPassword]=useState();
    const[error,seterror]=useState(false);
    const  navigate=useNavigate();
    const handlelogin=async(e)=>{
       e.preventDefault();
       if(!validateEmail(email)){
        seterror("please enter a valid email address")
        return;
       }
       if(!password){
        seterror("please enter the password")
        return
       } 
       seterror("")
       //login api call
    }
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
            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
            <button type="submit" className='btn-primary'>LOGIN</button>
            <p className='text-[13px] text-slate-800 mt-3'>don't have an account?{" "}
                <Link className='font-meduim text-primary underline' to="/signup">signup</Link>
            </p>
        </form>

    </div>
    </AuthLayout>
  )
}

export default Login