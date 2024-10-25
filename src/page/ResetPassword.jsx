import React from 'react'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { uppercaseRegex, lowercaseRegex, digitRegex, specialCharRegex, commonPasswords } from '../utils/constnt'
import BackeLogin from '../component/ForgotPassword/BackeLogin';
import ButtonAuth from '../component/ForgotPassword/ButtonAuth'

const ResetPassword = () => {

 const { register, handleSubmit, watch, setError, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm();
 const [update, Setupdate] = useState(false)
 const navaigate = useNavigate()
 //api call
 //check link expired or not
 //server side error
 //login components
 let location = useLocation();
 const token = location.pathname.split("/").at(-1);
 console.log(token)

 useEffect(() => {
  reset()
 }, [isSubmitSuccessful])

 async function api(data) {
  console.log("this is data....", data)
  try {
   const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}setPassword`,
    {
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
     method: "POST",
     //conver js string into json string
     body: JSON.stringify({
      newPassword: data.password,
      checkNewPassword: data.Confirmpassword,
      token: token
     })
    })
   const jsondata = await response.json();
   if (jsondata.success) {
    console.log('Success');
    toast(`✅ Reset password successful`, {
     position: "top-center",
     autoClose: 3000,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: false,
     draggable: true,
     progress: undefined,
     theme: "light",
     className: 'toast-success'
    });
    Setupdate(true)

   } else {
    console.log(jsondata)

    toast(`❌ Password reset is unsuccessful`, {
     position: "top-center",
     autoClose: 3000,
     hideProgressBar: true,
     closeOnClick: true,
     pauseOnHover: false,
     draggable: true,
     progress: undefined,
     theme: "light",
     className: 'toast-error'
    });
    setError("password", {
     type: "passValidation",
     message: jsondata.message
    });
    if(jsondata.message === "Link is expired"){
      toast(`❌ Link is expired`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: 'toast-error'
       });
       navaigate('/forgotpassword');
       
    }

   }
  } catch (error) {
   console.log("Error:-", error)
  }
 }
 // ========================================

 const onSubmit = async (data) => {
  if (!uppercaseRegex.test(data.password)) {
  return setError("password", {
    type: "passValidation",
    message: "Password must contain at least one uppercase letter."
   });
  }
  if (!lowercaseRegex.test(data.password)) {
    return setError("password", {
    type: "passValidation",
    message: "Password must contain at least one lowercase letter."
   });

  }
  if (!digitRegex.test(data.password)) {
    return setError("password", {
    type: "passValidation",
    message: "Password must contain at least one digit."
   });

  }
  if (!specialCharRegex.test(data.password)) {
    return setError("password", {
    type: "passValidation",
    message: "Password must contain at least one special character."
   });

  }
  if (data.password.includes(" ")) {
    return setError("password", {
    type: "passValidation",
    message: "Password cannot contain spaces."
   });

  }
  if (commonPasswords.includes(data.password)) {
    return setError("password", {
    type: "passValidation",
    message: "Password is too common."
   });
  }

  if (data.password !== data.Confirmpassword) {
    return setError("Confirmpassword", {
    type: "CPValidation",
    message: "Passwords do not match"
   });
  }

  await api(data) // simulating network delay

 }
 const [visible, setvisible] = useState(false);
 const [visible1, setvisible2] = useState(false);


 function checkvisible() {
  setvisible(!visible);
 }

 function checkvisible1() {
  setvisible2(!visible1);
 }
 return (
  <div className='bg-[#000814] w-[100%]  flex justify-center items-center h-screen'>
   <div className='max-w-[400px] w-[85%]'>

    <p className='text-white text-2xl font-bold sm:text-xl'>{update ? "Reset complete!" : "Choose  new password"}</p>
    <p className='w-[100%] text-lg text-[#AFB2BF] sm:text-base'>{update 
    ? ( <>
       <p>All done!</p>
       <p> Your password has been successfully reset. You can now log in to your account using your new password.If you did not request this change, please contact our support team immediately.</p></>) 
    : (<><p>Almost done,</p><p>Enter your new password and youre all set</p></>)}</p>
    {
     !update && (<> {isSubmitting && <div className='text-green-400'>Submitting...</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
       <div className='mt-4 flex gap-4 w-[100%] flex-col text-white sm:mt-4'>
        <div className='flex flex-col w-[100%] relative'>
         <label htmlFor="input">Create password<span className='text-red-500'>*</span></label>
         {
          (visible)
           ? <input {...register("password", {
            required: { value: true, message: "password is required." },
            minLength: { value: 6, message: "Password must be at least 6 characters long." },
            maxLength: { value: 20, message: "Password must be no more than 20 characters long." },
           })} type="text" id="input4" placeholder='Enter Password' className='bg-[#161D29] p-3 rounded-lg w-[100%]' name='password' />
           : <input {...register("password", {
            required: { value: true, message: "password is required." },
            minLength: { value: 6, message: "Password must be at least 6 characters long." },
            maxLength: { value: 20, message: "Password must be no more than 20 characters long." },
           })} type="password" id="input4" placeholder='Enter Password' className='bg-[#161D29] p-3 rounded-lg w-[100%]' name='password' />
         }
  
         <div onClick={checkvisible} className=' h-[auto] w-[8%]  rounded-r-lg absolute  right-1  flex  top-10'>
          {
           (visible) ? <FiEye size={20} /> : <FiEyeOff size={20} />
          }
         </div>
         {errors.password && <span className='text-red-400'>{errors.password.message}</span>}
         {errors.passValidation && <span className='text-red-400'>{errors.passValidation.message}</span>}
        </div>
  
        <div className='flex flex-col w-[100%] relative'>
         <label htmlFor="input5">Confirm password<span className='text-red-500'>*</span></label>
         {
          (visible1)
           ? <input type="text" {...register("Confirmpassword", {
            required: { value: true, message: "ConfirmPassword is required." },
           })} id="input5" placeholder='Confirm Password' className='bg-[#161D29] p-3 rounded-lg w-[100%]' />
           : <input {...register("Confirmpassword", {
            required: { value: true, message: "ConfirmPassword is required." },
           })} type="password" id="input5" placeholder='Confirm Password' className='bg-[#161D29] p-3 rounded-lg w-[100%]' />
         }
         <div onClick={checkvisible1} className=' h-[auto] w-[8%] rounded-r-lg absolute  right-1  flex items-center justify-center top-10'>
          {
           (visible1) ? <FiEye size={20} /> : <FiEyeOff size={20} />
          }
         </div>
         {errors.Confirmpassword && <span className='text-red-400'>{errors.Confirmpassword.message}</span>}
         {errors.CPValidation && <span className='text-red-400'>{errors.CPValidation.message}</span>}
        </div>
        <div className='flex flex-wrap gap-4 text-green-500 sm:my-4'>
         <p>&#9989; one uppercase character</p>
         <p>&#9989; one special character</p>
         <p>&#9989; 6 character minimum</p>
         <p>&#9989; one lowercase character</p>
         <p>&#9989; one number</p>
        </div>
       </div>
       <input disabled={isSubmitting} type="submit" value="submit" className='w-[100%] bg-[#FFD60A] mt-8 py-2 rounded-md text-black font-medium'></input>
      </form></>)
    }
     {
      update && (
        <NavLink to={'/login'}>
           <ButtonAuth text={'Return to login'}></ButtonAuth>
        </NavLink>
      )
     }
    <BackeLogin></BackeLogin>
   </div>
  </div>
 )
}

export default ResetPassword
