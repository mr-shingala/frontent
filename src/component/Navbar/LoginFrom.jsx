import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import { setToken } from '../../slices/authSlice'
import { setUser, setId,setName } from '../../slices/profileSlice'
import 'react-toastify/dist/ReactToastify.css';
import '../../page/style1.css'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';




const LoginFrom = () => {

  const { register, handleSubmit, setError, watch, reset,formState: { errors, isSubmitting ,isSubmitSuccessful} } = useForm();

  const dispatch = useDispatch()
  const navaigate = useNavigate()

  useEffect(() => {
    reset()
  }, [isSubmitSuccessful])

  const onSubmit = async (data) => {
    console.log("data..", data)

    if (data.email.includes('..')) {
    return setError("email", {
        type: "emailValidation",
        message: "Email cannot contain consecutive dots."
      });
      
    }
    if (data.email.startsWith('.') || data.email.endsWith('.')) {
      return setError("email", {
        type: "emailValidation",
        message: "Email cannot start or end with a dot."
      });
    }

    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}logIn`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          //conver js string into json string
          body: JSON.stringify({
            email: data.email,
            password: data.password
          }),
          credentials: 'include' 
        })
     
      const jsondata = await response.json();
     // console.log('Cookies:', document.cookie);
      if (jsondata.success) {
        console.log('Success');
        toast(`✅ Login successful`, {
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
        //firstname and last name
        console.log(jsondata)
        dispatch(setToken(jsondata.token))
        const id = jsondata.user._id;
        dispatch(setUser(jsondata.user.accountType))
        dispatch(setId(id))
        dispatch(setName(jsondata.user.firstName))
        localStorage.setItem("token", JSON.stringify(jsondata.token))
        localStorage.setItem("AccountType", JSON.stringify(jsondata.user.accountType))
        localStorage.setItem("Name", JSON.stringify(jsondata.user.firstName))
        localStorage.setItem("id", JSON.stringify(id))
        
        Cookies.set('token', `${jsondata.token}`, { expires: 1 }); // Expires in 1 day
        navaigate("/dashboard")

      } else {
        console.log(jsondata)

          const validation = data.message === "Password is not correct"?'passwors':'email'
          
        toast(`❌ Login unsuccessful`, {
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
        if(validation){
          setError("password", {
            type: "passwordValidation",
            message: jsondata.message
          });
        }else{
          setError("email", {
            type: "emailValidation",
            message: jsondata.message
          });
        }
      }
    } catch (error) {
      console.log("Error:-", error)
    }
   
  }



  const [visible, setvisible] = useState(false);
  function checkvisible() {
    setvisible(!visible);
  }




  return (

    <div className='w-[80%]  xl1:w-[100%] text-white'> 
      {isSubmitting && <div className='text-green-400'>Submitting...</div>}
      {/* {errors.serverValidation && <span className='text-red-400'>{errors.serverValidation.message}</span>} */}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className='flex flex-col mt-6'>
          <label htmlFor="inputbox1">Email Address<span className='text-red-500'>*</span></label>
          <input type="email" className='bg-[#161D29] outline-none p-3 rounded-lg w-[100%]' placeholder='Enter Email Address' id='inputbox1'
            {...register("email", {
              required: { value: true, message: "Email is required." },
              maxLength: { value: 254, message: "Email is too long." },
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format." },

            })} />

          {errors.email && <span className='text-red-400'>{errors.email.message}</span>}
          {errors.emailValidation && <span className='text-red-400'>{errors.emailValidation.message}</span>}

          <label htmlFor="inputbox2" className='mt-4'>Password<span className='text-red-500'>*</span></label>
          <div className='flex relative w-[100%]'>
            {
              (visible)
                ? <input type="text" id='inputbox2' className='bg-[#161D29] p-3 rounded-lg w-[100%] outline-none' placeholder='Enter Password' {...register("password", {
                  required: { value: true, message: "password is required." },
                  minLength: { value: 6, message: "Password must be at least 6 characters long." },
                  maxLength: { value: 20, message: "Password must be no more than 20 characters long." },
                })} />
                : <input id='inputbox2' type="password" className='bg-[#161D29] p-3 rounded-lg w-[100%] outline-none' placeholder='Enter Password'  {...register("password", {
                  required: { value: true, message: "password is required." },
                  minLength: { value: 6, message: "Password must be at least 6 characters long." },
                  maxLength: { value: 20, message: "Password must be no more than 20 characters long." },
                })} />
            }
            <div onClick={checkvisible} className=' h-[100%] w-[10%]  rounded-r-lg absolute right-0 flex items-center justify-center'>
              {
                (visible) ? <FiEye size={20} /> : <FiEyeOff size={20} />
              }
            </div>
          </div>

          <div className='w-[100%] text-right'>
           <NavLink to="/forgotpassword">
            <span className='text-right text-xs text-[#47A5C5]'>Forgot Password</span>
           </NavLink>
          </div>
          {errors.password && <span className='text-red-400'>{errors.password.message}</span>}
          {errors.passwordValidation && <span className='text-red-400'>{errors.passwordValidation.message}</span>}

          <input type='submit' disabled={isSubmitting} value="submit" className='w-[100%] cursor-pointer bg-[#FFD60A] mt-8 py-2 rounded-md text-black font-medium'></input>

        </div>
      </form>
    </div>
  )
}

export default LoginFrom
