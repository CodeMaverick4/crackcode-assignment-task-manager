import React, { useState } from 'react'
import { auth } from '../services/firebase.config'
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'


export default function SignUp() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errMsg,setError] = useState("")

    const createUser = async ()=>{
        await createUserWithEmailAndPassword(auth,email,password)
        .then(()=>alert("sign up successfull"))
        .catch(err=>{
            console.log(err)
            const errorMessage = getFriendlyErrorMessage(err.code);
            setError(errorMessage)
        })        
    }

    const getFriendlyErrorMessage = (errorCode) => {
        switch (errorCode) {
          case 'auth/email-already-in-use':
            return 'This email is already in use. Please use a different email.';
          case 'auth/invalid-email':
            return 'The email address is not valid. Please enter a valid email.';
          case 'auth/weak-password':
            return 'The password is too weak. Please use a stronger password.';
          case 'auth/network-request-failed':
            return 'Network error. Please check your internet connection and try again.';
          default:
            return 'An unexpected error occurred. Please try again later.';
        }
      };

  return (
    <div className=' round-xl bg-[#fcf5eb] flex justify-center items-center h-screen font-mono'>
        <div className='flex flex-col gap-8 border-2 border-black rounded-xl bg-white items-center px-10 py-10 md:w-1/3'>
            {/* <form action="" className='' >                 */}
                <h1 className='text-5xl text-center'>Sign UP</h1>
                {errMsg && <span className='text-red-400'>{errMsg}</span>}
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="" className='text-xl font-semibold'> Email </label>
                    <input value={email} type="email"  onChange={(e)=>setEmail(e.target.value)}className='py-4 px-2 border-2  border-black focus:border-purple-600 outline-none peer  rounded-lg' required/>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="" className='text-xl font-semibold'> Password </label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" className='py-4 px-2 border-2  border-black focus:border-purple-600 outline-none peer w-full rounded-lg' required/>
                </div>

                <div className='flex flex-col gap-3 justify-center'>
                    <button onClick={()=>createUser()}  className='bg-[#25d366] px-10 py-2 rounded-lg border border-black hover:rounded-2xl'>Sign Up</button>
                    <div>                        
                        <Link to={'/signin'} className='text-center'> Have Account? <span className='font-semibold'>Sign In</span></Link>                        
                    </div> 
                </div>                           
            {/* </form> */}
        </div>
      </div>    
  )
}
