import React, { useEffect } from 'react'
import { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import { useForm } from "react-hook-form"
import '../../page/style1.css'
import { toast } from 'react-toastify';

const Form = () => {
 const {
  register,
  handleSubmit,
  watch,
  setError,
  reset,
  formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting },
 } = useForm()
 const [value, setValue] = useState()
 const [error, setErrors] = useState("")
 const nameRegex = /^[a-zA-Z-']+$/
 const [inputValue, setInputValue] = useState('');
 const [maxChar, setmaxChar] = useState('');

 const handleInputChange = (event) => {
    if(event.target.value.length >= 300){
     setmaxChar('max length of message is 300 characters')
    }else{
     setmaxChar('')
     setInputValue(event.target.value);
    }
     
   
 };

 useEffect(()=>{

  if(error == "" && maxChar==""){
   reset()
   setInputValue("")
   setValue("")
  }
  
  // setErrors("")
  

 },[isSubmitSuccessful])


  async function apiCall(data){
      // console.log("email reach the function",data)
    try {
     const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}setVisitdata`, {
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       method: "POST",
       //conver js string into json string
       body: JSON.stringify({
        fname:data.FirstName,
        lname:data.LastName,
        email:data.email,
        phone:formatPhoneNumberIntl(value),
        text:inputValue==""?null:inputValue,
       })
     })
     const jsondata = await response.json();
     if (jsondata.success) {
       console.log('Success');
       toast(`✅ Data submited Sucessfully`, {
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
  }



 const onSubmit = async(data) => {

  console.log(data)
  setErrors('');
  if (!value || value==undefined) {
   console.log(value)
  return setErrors('Phone number is required');
  }
  if (!isValidPhoneNumber(value)) {
   console.log(value)
   return setErrors('Invalid phone number');
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
   });
  }
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

  await apiCall(data)
 }


 return (
  <div className=' text-gray-300 mt-7 ' >
   {/* name section */}
   {isSubmitting && <div className='text-green-400'>Submitting...</div>}
   <form onSubmit={handleSubmit(onSubmit)}>
    <div className='flex justify-between mt-5 gap-6  md:flex-col '>
     <div className='flex flex-col w-[50%] md:w-[100%]'>
      <label htmlFor="fName">First Name</label>
      <input type="text" className='bg-[#161d29] p-3  rounded-md text-lg outline-none focus:border-2 border-yellow-500 appearance-none' placeholder='Enter First Name'  {...register("FirstName", {
       required: { value: true, message: "FirstName is required." },
       minLength: { value: 2, message: "FirstName must be at least 2 characters long." },
       maxLength: { value: 50, message: "FirstName must be no more than 50 characters long." },
      })} />
      {errors.FirstName && <div className='text-red-400'>{errors.FirstName.message}</div>}
      {errors.FNValidation && <div className='text-red-400'>{errors.FNValidation.message}</div>}
     </div>
     <div className='flex flex-col w-[50%] md:w-[100%]'>
      <label htmlFor="lName">Last Name</label>
      <input type="text" className='bg-[#161d29] p-3  rounded-md text-lg outline-none focus:border-2 border-yellow-500 appearance-none' placeholder='Enter Last Name' {...register("LastName", {
       required: { value: true, message: "LastName is required." },
       minLength: { value: 2, message: "LastName must be at least 2 characters long." },
       maxLength: { value: 50, message: "LastName must be no more than 50 characters long." },
      })} />
      {errors.LastName && <div className='text-red-400'>{errors.LastName.message}</div>}
      {errors.LNValidation && <div className='text-red-400'>{errors.LNValidation.message}</div>}
     </div>
    </div>

    {/* Email Address */}
    <div className='flex flex-col mt-4'>
     <label htmlFor="Email">Email Address</label>
     <input type="email" className='bg-[#161d29] p-3  rounded-md text-lg outline-none focus:border-2 border-yellow-500 appearance-none' placeholder='Enter email address'
      {...register("email", {
       required: { value: true, message: "Email is required." },
       maxLength: { value: 254, message: "Email is too long." },
       pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format." },
      })} />

     {errors.email && <span className='text-red-400'>{errors.email.message}</span>}
     {errors.emailValidation && <span className='text-red-400'>{errors.emailValidation.message}</span>}
    </div>

    {/* phone number */}
    <div className='flex flex-col mt-4'>
     <label htmlFor="pNumber">Phone Number</label>
     <div >
      <PhoneInput
       defaultCountry="IN"
       placeholder="Enter phone number"
       value={value}
       onChange={setValue}
       containerStyle={{}}
       className="number"
      //className='number bg-[#161d29] p-3 text-black rounded-md text-lg outline-none focus:border-2 border-yellow-500 appearance-none'

      />
      <p className='text-red-400'>{error}</p>
     </div>
    </div>

    {/* message */}
    <div className='flex flex-col mt-4'>
     <label htmlFor="Message">Message</label>
     <textarea name="Message" value={inputValue}
      onChange={handleInputChange} placeholder='FeedBack, About your self...' id="Message" className='bg-[#161d29] p-3  rounded-md text-lg outline-none focus:border-2 border-yellow-500 appearance-none'></textarea>
      <p className='text-red-400'>{maxChar}</p>
    </div>

    <input type='submit' disabled={isSubmitting} value="Send Message" className='w-[100%] bg-[#FFD60A] mt-8 py-2 rounded-md text-black cursor-pointer font-medium'></input>
   </form>
  </div>
 )
}

export default Form
