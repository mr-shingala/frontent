import React, { useEffect } from 'react'
import OtpInput from 'react-otp-input'
import { useState } from 'react';
import '../../page/style1.css'
import ButtonAuth from '../ForgotPassword/ButtonAuth'
import { BiMailSend } from "react-icons/bi";
import BackeLogin from '../ForgotPassword/BackeLogin'
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Navigate} from "react-router-dom"
import { set } from 'react-hook-form';

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [loader, setloader] = useState(false)
  const data = useSelector(state => state.auth.signupData)
  // console.log(data)
  // console.log(data[0].userinfo, data[1].userinfo)
  const navigate = useNavigate()

  // useEffect(()=>{
  //     if(!data){
  //        return <Navigate to="/" />
  //     }
  // })

  // ==================================================================================

  async function reSendOtp(e) {
    e.preventDefault();
    setloader('Sending.....')
    await otpSend(data[0].userinfo.email)
  }

  const otpSend = async (data) => {

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
      }
    } catch (error) {
      console.log("Error:-", error)
    }
    setloader('')
  }
  // =========================================

  useEffect(() => {
    if (!data[0] || !data[1]) {
      navigate('/signUp')
    }
  }, [])


  async function apicall() {
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}signUp`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        //conver js string into json string
        body: JSON.stringify({
          firstName: data[0].userinfo.FirstName,
          lastName: data[0].userinfo.LastName,
          email: data[0].userinfo.email,
          password: data[0].userinfo.password,
          rePassword: data[0].userinfo.Confirmpassword,
          accountType: data[1].userinfo,
          otp: otp
        })
      })
      const jsondata = await response.json();
      if (jsondata.success) {
        console.log('Success');
        toast(`✅ SignUp successful`, {
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

        navigate('/')
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
      }
    } catch (error) {
      console.log("Error:-", error)
    }
    setloader('')
  }

  async function setSignup(e) {
    e.preventDefault();
    setloader('Loading...')
    if (otp === "") {
      setloader('')
      return toast.error(`OTP is empty`, {
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
    await apicall()

  }

  return (
    <div className='h-[calc(100vh-64px)] flex flex-col bg-[#000814] justify-center items-center'>
      <div className='max-w-[420px] w-[85%] '>
        <div className='w-[100%] '>
          <p className='text-green-500'>{loader}</p>
          <p className='text-white text-3xl mb-3'>Verify email</p>
          <p className='text-[#AFB2BF] w-[85%] mb-6'>A verification code has been sent to you. Enter the code below</p>
        </div>
        <div className='w-[100%]'>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className='px-2 md:px-1'>-</span>}
            renderInput={(props) => <input {...props} style={{ width: '100%' }} className='focus:outline-yellow-400 appearance-none outline-none h-16 text-center bg-[#161D29]  text-white
               boxshadow10 rounded-md  text-2xl md:h-[auto]' />}
            className="bg-slate-800"
          />
          <div className='mt-6 w-[100%]' onClick={setSignup}>
            <ButtonAuth text={'Verify and Register'}></ButtonAuth>
          </div>
          <div className='flex pt-1 justify-between w-[96%] sm1:flex-col-reverse'>
            <div className='inline-block mt-3 sm1:mt-5'>
              <NavLink to="/SignUp">
                <span className='flex items-center text-white gap-4'>
                  <FaArrowLeft />
                  <span>Back to signup</span>
                </span>
              </NavLink>
            </div>
            <span className='text-[#47A5C5] flex items-center gap-1 cursor-pointer' onClick={reSendOtp}>
              <BiMailSend />
              Resend it
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification
