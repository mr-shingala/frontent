import React, { useState, useEffect } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import {DeleteAccountUrl,FunctioId} from '../../utils/constnt'
import { uppercaseRegex, lowercaseRegex, digitRegex, specialCharRegex, commonPasswords } from '../../utils/constnt'
import {setFleg,setId,setData} from '../../slices/modalSlice'

const Setting = () => {

  const [current, setCurrent] = useState(false)
  const [newPass, setNewPass] = useState(false)
  const [conPass, setConPass] = useState(false)
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch()

  function deleteAccount(){
    dispatch(setFleg(true))
    dispatch(setId(FunctioId[2]))
    dispatch(setData({icon:DeleteAccountUrl,heading:"Delete Account!"}))
  }
  

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm()


  useEffect(() => {
    reset()
  }, [isSubmitSuccessful])

  async function changePassword(data) {
    //console.log(data,token)
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}changePassword`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        method: "PUT",
        credentials: 'include',
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          checkNewPassword: data.checkNewPassword,
        }),
      })
      const jsonresponse = await response.json()
      if (jsonresponse.success) {
        toast(`✅ Password update successfully`, {
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
        toast.error(`${jsonresponse.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


  const onSubmit = async (data) => {
    if (!uppercaseRegex.test(data.newPassword)) {
      return setError("newPassword", {
        type: "passValidation",
        message: "Password must contain at least one uppercase letter."
      });
    }
    if (!lowercaseRegex.test(data.newPassword)) {
      return setError("newPassword", {
        type: "passValidation",
        message: "Password must contain at least one lowercase letter."
      });

    }
    if (!digitRegex.test(data.newPassword)) {
      return setError("newPassword", {
        type: "passValidation",
        message: "Password must contain at least one digit."
      });

    }
    if (!specialCharRegex.test(data.newPassword)) {
      return setError("newPassword", {
        type: "passValidation",
        message: "Password must contain at least one special character."
      });

    }
    if (data.newPassword.includes(" ")) {
      return setError("newPassword", {
        type: "passValidation",
        message: "Password cannot contain spaces."
      });

    }
    if (commonPasswords.includes(data.newPassword)) {
      return setError("newPassword", {
        type: "passValidation",
        message: "Password is too common."
      });
    }

    if (data.newPassword !== data.checkNewPassword) {
      return setError("checkNewPassword", {
        type: "CPValidation",
        message: "Passwords do not match"
      });
    }
    await changePassword(data)

  }





  return (
    <div className='w-[100%]  mt-3 mb-3 pt-4 flex items-start pl-5 xl3:pl-0 justify-center flex-col '>

      <div className='bg-[rgb(22,29,41)] w-[80%] xl3:w-[90%] sm2:w-[100%] p-5 mt-5 border-[#2C333F] border-2 mx-auto '>
        <form onSubmit={handleSubmit(onSubmit)} className='w-[100%] flex justify-between  xl3:flex-col'>
      
          <div className='w-[50%] xl3:w-[100%]  xl3:flex xl3:items-center xl3:flex-col'>
          {isSubmitting && <div className='text-green-400 mb-2'>Updatting...</div>}
            <div className=' text-gray-300 mb-4 flex items-center lg:flex-col lg:items-start '>
              <label htmlFor="CurrentPassword" className='mr-2 max-w-[30%] w-[200px] lg:max-w-[100%] lg:mb-1'>Current Password</label>
              <div>
              <input {...register("oldPassword", { required: { value: true, message: 'This field is required' } })} placeholder='Enter current password' type={current ? `text` : `password`} id='CurrentPassword' className='px-3 py-2 rounded-lg bg-gray-700' />
              <button className='px-3 py-3 ml-1 rounded-lg bg-gray-700 md:mt-1' onClick={() => { setCurrent(!current) }} >{current ? <FaRegEye /> : <FaRegEyeSlash />}</button>
              </div>
            </div>
            {errors.oldPassword && <span className='text-red-400'>{errors.oldPassword.message}</span>}

            <div className=' text-gray-300 mb-4 flex items-center mt-5 lg:flex-col lg:items-start '>
              <label htmlFor="NewPassword" className='mr-2 max-w-[30%] w-[200px] lg:max-w-[100%] lg:mb-1'>New Password</label>
              <div>
              <input  {...register("newPassword", { 
                required: { value: true, message: 'This field is required' },
                minLength: { value: 6, message: "Password must be at least 6 characters long." },
                maxLength: { value: 20, message: "Password must be no more than 20 characters long." }, })} placeholder='Enter New password' type={newPass ? `text` : `password`} id='NewPassword' className='px-3 py-2 rounded-lg bg-gray-700' />
              <button className='px-3 py-3 ml-1 rounded-lg bg-gray-700 md:mt-1' onClick={() => { setNewPass(!newPass) }} >{newPass ? <FaRegEye /> : <FaRegEyeSlash />}</button>
              </div>
            </div>
            {errors.newPassword && <span className='text-red-400'>{errors.newPassword.message}</span>}
            {errors.passValidation && <span className='text-red-400'>{errors.passValidation.message}</span>}
            <div className=' text-gray-300 mb-4 flex items-center mt-5 lg:flex-col lg:items-start '>
              <label htmlFor="ConfirmPassword" className='mr-2 max-w-[30%] w-[200px] lg:max-w-[100%] lg:mb-1'>Confirm Password</label>
              <div>
              <input  {...register("checkNewPassword", {
                required: { value: true, message: 'This field is required' },
              })} placeholder='Enter confirm password' type={conPass ? `text` : `password`} id='ConfirmPassword' className='px-3 py-2 rounded-lg bg-gray-700' />
              <button className='px-3 py-3 ml-1 rounded-lg bg-gray-700 md:mt-1' onClick={() => { setConPass(!conPass) }} >{conPass ? <FaRegEye /> : <FaRegEyeSlash />}</button>
              </div>
            </div>
            {errors.checkNewPassword && <span className='text-red-400'>{errors.checkNewPassword.message}</span>}
            {errors.CPValidation && <span className='text-red-400'>{errors.CPValidation.message}</span>}
          </div>
          <div className=' w-[50%] xl3:mt-5 flex items-center justify-center border-2 xl3:border-0 border-[#2C333F] xl3:w-[100%]'>
            <div className=' mx-auto'><input disabled={isSubmitting} type='submit' value={'Save Password'} className='bg-yellow-400 p-2 rounded-[8px] font-semibold border-[1px] border-gray-600 text-black ' /></div>
          </div>
        </form>
      </div>
      {/* delete account */}
      <div className='w-[80%] xl3:w-[90%] mx-auto bg-[#7f1d1d5d] sm2:w-[100%] flex mt-10 items-start border-2  p-5 border-red-400'>
        <div className='p-2 bg-red-600 border-4 border-red-400 text-3xl rounded-full'><MdDeleteForever /></div>
        <div className=' pl-7'>
          <p className='text-2xl font-bold text-red-100 mb-3'>Delete Account</p>
          <p className='text-red-200'>Would you like to delete account?</p>
          <p className='text-red-200'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
          <p className='text-red-400 mt-2 italic text-xl'>I want to delete my account.</p>
          <button className='p-2 text-red-100 rounded-lg mt-3 bg-red-800 border-2 border-red-400 text-lg' onClick={deleteAccount} >Delete</button>
        </div>
        <div>

        </div>
      </div>

      {/* logout */}
    </div>
  )
}

export default Setting
