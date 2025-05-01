import React  ,{useState }from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import card_2 from '../../assets/images/image.png'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import { validateEmail } from '../../utils/helper';
//import { useState } from 'react'
const SignUp = () => {
    const[profilepic,setprofilepic]=useState(null);
    const[fullname,setfullname]=useState();
    const[email,SetEmail]=useState();
    const[password,SetPassword]=useState();

    const[error,seterror]=useState();
    const navigate=useNavigate();
    
    const handlesignup=async(e)=>{}
  return (
  <AuthLayout>
<div className='lg:w-[100%] h-auto md:h-full  mt-10 md:mt-0 flex flex-col justify-center'>
    <h3 className='text-xl font-semibold text-black'>Create an account</h3>
    <p className=' text-xs text-slate-700 mt-[5px] mb-6'> join us today by entering details</p>
    <form onSubmit={handlesignup}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input
            value={fullname}
            onChange={({target})=>setfullname(target.value)}
            label="Full Name"
            placeholder="john"
            type="text"
            />
        <Input
            value={email}
            onchange={({target})=>SetEmail(target.value)}
            label='email address'
            placeholder="john@example.com"
            type="text"/>
        <div className='col-span-2'>
        <Input
            value={password}
            onchange={({target})=>SetPassword(target.value)}
            label='password'
            placeholder="Min 8 characters"
            type="password"/>
            </div>
        </div>
    </form>
    </div>
  </AuthLayout>
  )
}

export default SignUp