import React, { useState,useEffect } from 'react'
import ButtonAuth from '../component/ForgotPassword/ButtonAuth'
import { NavLink } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import BackeLogin from '../component/ForgotPassword/BackeLogin';

import './style1.css'

function Forgot() {
  const [sendemail, setSendEmail] = useState(false)
  const [email, setEmail] = useState("")
  const [loader,setLoader] = useState(false)
  const { register, handleSubmit, setError, watch, reset,formState: { errors, isSubmitting ,isSubmitSuccessful} } = useForm();


  useEffect(() => {
    reset()
  }, [isSubmitSuccessful])

  async function SendEmail(data){
       console.log("this is data....",data)
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}generateToken`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          //conver js string into json string
          body: JSON.stringify({
            email: data.email?data.email:data,
          })
        })
      const jsondata = await response.json();
      if (jsondata.success) {
        console.log('Success');
        toast(`✅ Send Email successful`, {
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
        setEmail( data.email?data.email:data)
        setSendEmail(true)

      } else {
        console.log(jsondata)
          
        toast(`❌ Email send unsuccessful`, {
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

          setError("email", {
            type: "emailValidation",
            message: jsondata.message
          });
      }
    } catch (error) {
      console.log("Error:-", error)
    }
  }


  // -----------------------------------

  const onSubmit = async (data) => {
    // console.log("data..", data)

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
    await SendEmail(data)
    
  }
  // ------------------------------------

 async function resendMail(){
     setLoader(true)

     await  SendEmail(email)
     setLoader(false)
  }

  return (
    <div className='bg-[#000814]   flex justify-center items-center min-h-screen sm2:py-10'>
      <div className='max-w-[500px] w-[85%]'>

        <p className='text-white text-2xl font-bold mb-3 md:text-2xl'>

          {
            sendemail ? ('Check email') : ('Reset Your Password')
          }
        </p>
        <p className='w-[100%] text-lg text-[#AFB2BF] mb-6 md:text-base text-justify'>
          {
            sendemail ? (`We have sent the reset email to ${email}`) : ('Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery')
          }
        </p>
        {
          !sendemail ? (

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              {isSubmitting && <div className='text-green-400'>Submitting...</div>}
              <label htmlFor="inputbox1" className='text-white'>Email Address<span className='text-red-500'>*</span></label>
              <input type="email" className='bg-[#161D29] p-3 text-white rounded-lg w-[100%]' placeholder='Enter Email Address' id='inputbox1'
                {...register("email", {
                  required: { value: true, message: "Email is required." },
                  maxLength: { value: 254, message: "Email is too long." },
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format." },

                })} />
              {errors.email && <span className='text-red-400'>{errors.email.message}</span>}
              {errors.emailValidation && <span className='text-red-400'>{errors.emailValidation.message}</span>}
              
              <input type='submit' disabled={isSubmitting} value="Reset Password" className='w-[100%] bg-[#FFD60A] mt-8 py-2 rounded-md text-black font-medium'></input>
            </form>
          ) : ("")
        }
        <div onClick={resendMail}>
         {/* {loader && <p className='text-green-400'>Submitting...</p>} */}
          {
            sendemail &&  (<ButtonAuth text={(loader)?'Resend email....':"Resend email"} ></ButtonAuth>) 

          }
        </div>

        <div>
          <BackeLogin>
          </BackeLogin>
        </div>

      </div>
    </div>
  )
}

export default Forgot
