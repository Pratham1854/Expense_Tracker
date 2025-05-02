import React  ,{useState }from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import card_2 from '../../assets/images/image.png'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/input/ProfilePhotoSelector';
//import { useState } from 'react'
const SignUp = () => {
    const[profilepic,setprofilepic]=useState(null);
    const[fullname,setfullname]=useState();
    const[email,SetEmail]=useState();
    const[password,SetPassword]=useState();

    const[error,seterror]=useState();
    const navigate=useNavigate();
    
    const handlesignup=async(e)=>{
        e.preventDefault();
        let profileimageurl=""
        if(!fullname){
            seterror("please enter full name")
            return;
        }
        //console.log(email)
        if(!validateEmail(email)){
            seterror("enter valid email")
            return
        }
        //console.log(password)
       if(!password){
        seterror("enter password");
        return
       }
        seterror("");
        //signup api call

    }

  return (
  <AuthLayout>
<div className='lg:w-[100%] h-auto md:h-full  mt-10 md:mt-0 flex flex-col justify-center'>
    <h3 className='text-xl font-semibold text-black'>Create an account</h3>
    <p className=' text-xs text-slate-700 mt-[5px] mb-6'> join us today by entering details</p>
    <form onSubmit={handlesignup}>
        <ProfilePhotoSelector image={profilepic} setimage={setprofilepic}/>
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
            onChange={({target})=>SetEmail(target.value)}
            label='email address'
            placeholder="john@example.com"
            type="text"/>
        <div className='col-span-2'>
        <Input
            value={password}
            onChange={({target})=>SetPassword(target.value)}
            label='password'
            placeholder="Min 8 characters"
            type="password"/>
            </div>
        </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                    <button type="submit" className='btn-primary'>SIGN UP   </button>
                    <p className='text-[13px] text-slate-800 mt-3'>ALREADY HAVE AN ACCOUNT?{" "}
                        <Link className='font-meduim text-primary underline' to="/login">LOGIN</Link>
                    </p>
    </form>
    </div>
  </AuthLayout>
  )
}

export default SignUp