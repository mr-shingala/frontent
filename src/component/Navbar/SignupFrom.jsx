import React from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { uppercaseRegex, lowercaseRegex, digitRegex, specialCharRegex, commonPasswords } from '../../utils/constnt'
import { setSignupData } from '../../slices/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignupFrom = ({state}) => {

  const { register, handleSubmit, setError,reset, formState: { errors, isSubmitting,isSubmitSuccessful,isSubmitted } } = useForm();
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const nameRegex = /^[a-zA-Z-']+$/
  
  useEffect(() => {
    reset()
  }, [isSubmitSuccessful])


  const otpSend = async (data) => {
    // console.log("email reach the function",data)

    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}otpCreate`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        //conver js string into json string
        body: JSON.stringify({
          email: data,
        })
      })
      const jsondata = await response.json();
      if (jsondata.success) {
        console.log('Success');
        toast(`✅ Send OTP successful`, {
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
        
        console.log("Navigate on",data)
        Navigate('/otp-verification')
      } else {
        console.log(jsondata)
       
        toast.error(jsondata.message, {
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
        toast(`❌ not send OTP successful`, {
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
      }
    } catch (error) {
      console.log("Error:-", error)
    }

  }

  const onSubmit = async (data) => {

     //console.log(data)
    if (!nameRegex.test(data.LastName)) {
      return setError("LastName", {
        type: "LNValidation",
        message: "LastName can only contain alphabetic characters, hyphens, and apostrophes."
      });

    }
    if (!nameRegex.test(data.FirstName)) {
      return setError("FirstName", {
        type: "FNValidation",
        message: "FirstName can only contain alphabetic characters, hyphens, and apostrophes."
      });
    }
    if (data.FirstName.includes(" ")) {
      return setError("FirstName", {
        type: "FNValidation",
        message: "FirstName cannot have multiple consecutive spaces."
      });
    }
    if (data.LastName.includes(" ")) {
      return setError("FirstName", {
        type: "LNValidation",
        message: "LastName cannot have multiple consecutive spaces."
      });
    }
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
      })
    }


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
    // console.log("validation donr")
   
    // console.log("go to function")
     await otpSend(data.email) // simulating network delay
    dispatch(setSignupData(data))
    dispatch(setSignupData(state))
    // console.log(data);
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
    <div className='w-[80%] text-white 1xl:w-[100%]'>
      {isSubmitting && <div className='text-green-400'>Submitting...</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex gap-4 w-[100%] sm:flex-col'>
          <div className='flex flex-col w-[50%] sm:w-[100%]'>
            <label htmlFor="input1">First Name<span className='text-red-500'>*</span></label>
            <input  {...register("FirstName", {
              required: { value: true, message: "FirstName is required." },
              minLength: { value: 2, message: "FirstName must be at least 2 characters long." },
              maxLength: { value: 50, message: "FirstName must be no more than 50 characters long." },
            })} type="text" id="input1" placeholder='Enter First Name' className='bg-[#161D29] p-3 rounded-lg w-[100%]' />
            {errors.FirstName && <div className='text-red-400'>{errors.FirstName.message}</div>}
            {errors.FNValidation && <div className='text-red-400'>{errors.FNValidation.message}</div>}
          </div>
          <div className='flex flex-col w-[50%] sm:w-[100%]'>
            <label htmlFor="input2">Last Name<span className='text-red-500'>*</span></label>
            <input {...register("LastName", {
              required: { value: true, message: "LastName is required." },
              minLength: { value: 2, message: "LastName must be at least 2 characters long." },
              maxLength: { value: 50, message: "LastName must be no more than 50 characters long." },
            })} type="text" id="input2" placeholder='Enter Second Name' className='bg-[#161D29] p-3 rounded-lg w-[100%]' />
            {errors.LastName && <div className='text-red-400'>{errors.LastName.message}</div>}
            {errors.LNValidation && <div className='text-red-400'>{errors.LNValidation.message}</div>}
          </div>
        </div>
        <div className='mt-4'>
          <label htmlFor="input3" >Email Address<span className='text-red-500'>*</span></label>
          <input type="email"  {...register("email", {
            required: { value: true, message: "Email is required." },
            maxLength: { value: 254, message: "Email is too long." },
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format." },

          })} id="input3" placeholder='Enter Email Address' className='bg-[#161D29] p-3 rounded-lg w-[100%]' />
          {errors.email && <span className='text-red-400'>{errors.email.message}</span>}
          {errors.emailValidation && <span className='text-red-400'>{errors.emailValidation.message}</span>}
        </div>

        <div className='mt-4 flex gap-4 w-[100%] sm:flex-col'>

          <div className='flex flex-col w-[50%] relative sm:w-[100%]'>
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

          <div className='flex flex-col w-[50%] relative sm:w-[100%]'>
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

        </div>
        <input disabled={isSubmitting} type="submit" value="submit" className='w-[100%] cursor-pointer bg-[#FFD60A] mt-8 py-2 rounded-md text-black font-medium'></input>
      </form>
    </div>

  )

}
export default SignupFrom
