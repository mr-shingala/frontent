import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AccountType } from '../../utils/constnt'
import { State } from '../../data/State'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import '../../page/style1.css'
import { IoWarning } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';
import { MdCloudDone } from "react-icons/md";
import { allowedTypes } from '../../utils/constnt'
import { useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { nanoid } from 'nanoid'
import '../../page/style1.css'



const EditProfile = () => {
  const img = useSelector((state) => state.profile.img)
  const user = useSelector((state) => state.profile.user)
  const id = useSelector((state) => state.profile.id)
  const AC = useSelector((state) => state.profile.user)
  const token = useSelector((state) => state.auth.token)
  const [form, setForm] = useState({ gender: "", dateOfBirth: "", profession: "", University: "", homeState: "", country: "India", city: "" })
  const [studentAbout, setStudentAbout] = useState([{ Technology: "" }, { hobbay: "" }, { goal: "" }, { YourSelf: "" }])
  const [insAbout, setInsAbout] = useState([{ goal: "" }, { lifePhilosophy: "" }, { hobby: "" }, { message: "" }, { thinking: "" }, { teachingExperience: "" }, { pastExperience: "" }, { education: "" }])
  const [value, setValue] = useState('')
  const [city, setCity] = useState([])
  const [uni, setUniversity] = useState([])
  const state = Object.values(State)
  const [size, setSizeValidation] = useState(false)
  const [type, setTypeValidation] = useState(false)
  const [dimension, setDimensionValidation] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [file, setFile] = useState(null)
  const uploadButton = useRef(null)
  const [fieldArray, setFieldArray] = useState(['null'])



  function addInput() {
    if (fieldArray.length >= 5) {
      return toast.warning('Maximum 5 language add', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    setFieldArray([...fieldArray, []])
  }

  function deleteItem(index) {
    console.log("->", fieldArray.length)
    if (fieldArray.length <= 1) {
      return toast.warning('Minimum 1 language is require', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      const array = [...fieldArray]
      //console.log(Array)
      array.splice(index, 1)
      setFieldArray(array)
    }
  }

  function onInputValue(e, index) {
    const data = e.target.value
    let a = e.target.value.replaceAll(" ", "")
    if (a !== "") {
      console.log(a)
      const array = [...fieldArray]
      console.log(Array)
      array[index] = data
      setFieldArray(array)
      console.log(fieldArray)
    }


  }



  // useEffect(() => {
  //   const e = {
  //     target: {
  //       value: 'Andaman and Nicobar Islands',
  //       name: 'homeState'
  //     }
  //   }
  //   selectState(e)
  //   selectUniversity(e)
  //   if (fieldArray.length <= 0) {
  //     setFieldArray([...fieldArray, []])
  //   }

  // }, [])


  useEffect(() => {
    if (city.length > 0 && !form.city) {
      setForm(prevForm => ({
        ...prevForm,
        city: city[0],
      }));
    }

    if (uni.length > 0 && !form.University) {
      console.log(uni[0])
      setForm(prevForm => ({
        ...prevForm,
        University:Object.values(uni[0]).at(0)
      }));
    }

  }, [city, form.city, uni, form.University])


  async function submiting(event) {
    //console.log(value)
    //console.log(id)
    event.preventDefault();
    const button = document.getElementById('s1')
    button.style.backgroundColor = "green"
    button.style.color = "white"
    button.innerText = 'submitting...'
    button.disabled = true
    const filterdata = []


    //onsole.log(studentAbout , AC , AccountType[0] )


    if (AC === AccountType[0]) {

      studentAbout.forEach((e, index) => {
        if (Object.values(studentAbout[index]).at(0) !== '') {
          filterdata.push(studentAbout[index])
          console.log(filterdata)
        }
      })
    } else {

      insAbout.forEach((e, index) => {
        if (Object.values(insAbout[index]).at(0) !== '') {
          filterdata.push(insAbout[index])
          console.log(filterdata)
        }
      })

    }

    for (const element of fieldArray) {
      if (element.length == 0) {
        const index = fieldArray.indexOf(element);
        fieldArray.splice(index, 1);
      }
    }


    try {
      console.log("this is field array", fieldArray)
      const url = `${import.meta.env.REACT_APP_BASE_URL}updateProfile`;
      console.log("h1")
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        method: "PUT",

        body: JSON.stringify({
          profession: form.profession,
          Gender: form.gender,
          phone: value,
          Id: id,
          about: filterdata.length <= 0 ? null : filterdata,
          country: form.country,
          state: form.homeState,
          city: form.city,
          University: form.University,
          dateOfBirth: form.dateOfBirth,
          Language: fieldArray[0] === 'null' ? null : fieldArray
          // about:studentAbout
        }),
        credentials: 'include'
      });

      const data = await response.json()
      if (data.success) {
        toast(`✅ Profile update successfully`, {
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
        toast.error(`${data.message}`, {
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
      //console.log(data)

    }
    catch (error) {
      console.log(error.message)
    }

    button.style.backgroundColor = `rgb(${250},${204},${21})`
    button.style.color = "black"
    button.innerText = 'save'
    button.disabled = false
  }


  function onChangeHandler(e) {
    console.log(e.target.name,e.target.value)
    setForm(prevstate => {
      const { name, value } = e.target
      return {
        ...prevstate,
        [name]: value
      }
    })

  }

  const handleChange2 = (index, e) => {
    setStudentAbout(prevState => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], [e.target.name]: e.target.value };
      return newState;
    });

  };

  const handleChange3 = (index, e) => {
    setInsAbout(prevState => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], [e.target.name]: e.target.value };
      return newState;
    });

  };



  async function selectState(e) {
    onChangeHandler(e)
    const state = e.target.value?.replaceAll(" ", "")

    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getCity`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            state: state
          })
        }
      )
      const data = await response.json();
      setCity(data.city[state])
    } catch (error) {
      console.log(error)
    }

  }
  //add css
  //
  async function selectUniversity(e) {
    // console.log( e.target.value)
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getUniversity`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            state: e.target.value
          })
        }
      )
      const data = await response.json();
 
      setUniversity(data)

    } catch (error) {
      console.log(error)
    }
  }


  async function getImageDimensions(file) {

    try {
      let img = new Image();
      img.src = URL.createObjectURL(file);
      await img.decode();
      let width = img.width;
      let height = img.height;
      if (width <= 200 && height <= 200) {
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function eventUpload(e) {
    let count = 0
    setDimensionValidation(false)
    setSizeValidation(false)
    setTypeValidation(false)

    const File = e.target.files[0];
    //console.log(File)

    if (allowedTypes.includes(File.type)) {
      //   console.log("valid type",File.type)
      setTypeValidation(true)
      count += 1;

    } else {
      // console.log("not valid type",File.type)
      setTypeValidation(false)
      toast.error(`Image type is not valid`, {
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

    if (File.size <= 5 * 1024 * 1024) {
      setSizeValidation(true)
      count += 1;
    } else {
      setSizeValidation(false)
      toast.error(`Max image size is 5MB`, {
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

    if (await getImageDimensions(File)) {
      setDimensionValidation(true)
      count += 1;
    } else {
      setDimensionValidation(false)
      toast.error(`image dimension 200px × 200px`, {
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

    if (count >= 3) {
      setDisabled(true)
      setFile(File)
      count = 0;
    } else {
      setFile(null)
      setDisabled(false)
      count = 0;
    }

  }

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');


  async function updateProfilePicture() {
    //  console.log('click me')
    const formData = new FormData();
    formData.append('profile', file);
    uploadButton.current.style.backgroundColor = 'green'
    uploadButton.current.style.color = 'white'
    uploadButton.current.innerText = 'Submitting....'
    setDisabled(false)
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}updateProfilePicture`, {
        header: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        method: "PUT",
        credentials: 'include',
        body: formData,
      })
      const data = await response.json()
      if (data.success) {
        toast(`✅ Profile image update successfully`, {
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
        toast.error(`${data.message}`, {
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
      //  console.log(data)

    }
    catch (error) {
      console.log(error.message)
    }
    finally {
      setDisabled(false)
      setDimensionValidation(false)
      setSizeValidation(false)
      setTypeValidation(false)
      setFile(null)
      uploadButton.current.style.backgroundColor = `rgb(${250}, ${204},${21})`
      uploadButton.current.style.color = 'black'
      uploadButton.current.innerText = 'Upload File'
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        setFileName(''); // Clear the file name display if needed
      }
    }

  }


  return (
    <div className='w-[100%] pb-32 max-w-[1400px]'>
      <div className='w-[80%] mx-auto sm2:w-[95%]'>
        {/* img section */}
        <div className='bg-[#161D29]   border-2 border-[#2C333F]  flex gap-12 mt-10 p-4 lg:flex-col lg:items-center'>
          <img src={img} alt={'profile_img'} className='rounded-full w-36 h-36 sm1:w-32 sm1:h-32 sm2:w-28 sm2:h-28' />
          <div className='lg:items-center lg:flex lg:flex-col'>
            <p className='text-xl text-gray-400 lg:text-center'>Change Profile Picture</p>

            <div className='sm2:text-xs '>
              {/* type warning */}
              <div className={`text-sm sm2:text-ellipsis  mt-4 flex gap-1 ${type ? 'text-green-400' : 'text-red-400'}`}>
                {type ? <MdCloudDone className='text-xl' /> : <IoWarning className='text-xl' />}
                <span>Image type is must be jpg, jpeg, png</span>
              </div>
              {/* dimenstion */}
              <div className={`text-sm  mt-1 flex gap-1 ${dimension ? 'text-green-400' : 'text-red-400'}`}>
                {dimension ? <MdCloudDone className='text-xl' /> : <IoWarning className='text-xl' />}
                <span>image dimension 200px &times; 200px</span>
              </div>
              {/* size warning */}
              <div className={`text-sm  mt-1 flex gap-1 ${size ? 'text-green-400' : 'text-red-400'}`}>
                {size ? <MdCloudDone className='text-xl' /> : <IoWarning className='text-xl' />}
                <span>Max image size is 5MB</span>
              </div>
            </div>

            <div className='flex sm:flex-col sm:gap-3 sm:w-[80%] mt-10 ep  sm2:w-[150px] '>
              <input ref={fileInputRef} type="file" className='text-gray-400 ' onChange={eventUpload} />
              <button ref={uploadButton} className={`bg-yellow-400 p-2 rounded-[8px] font-semibold border-[1px] border-gray-600 text-black ${disabled === false} `} onClick={updateProfilePicture} disabled={!disabled} >Upload File</button>
            </div>
          </div>
        </div>

        {/* gender & date section */}
        <div className='bg-[#161D29] border-2 lg1:pb-8 border-[#2C333F] p-4 mt-10 flex text-gray-300 lg1:flex-col'>
          <div className='w-[50%] flex-col lg1:w-[100%]'>
            <p className=' mb-4'>Gender</p>
            <div className='flex items-center lg1:flex-col lg1:gap-2 lg1:items-start  lg1:mb-5'>
              <div className='flex items-center gap-1'>
                <input type="radio" id='Male' name="gender" className='h-6 w-6' checked={form.gender === "Male"} onChange={onChangeHandler} value="Male" />
                <label htmlFor="Male" className='pr-5 pl-1 p-4 lg1:pl-1 lg1:p-0'>Male</label>
              </div>
              <div  className='flex items-center gap-1'>
                <input type="radio" id='Female' name="gender" className='h-6 w-6' checked={form.gender === "Female"} onChange={onChangeHandler} value="Female" />
                <label htmlFor="Female" className='pr-5 pl-1'>Female</label>
              </div>
              <div  className='flex items-center gap-1'>
                <input type="radio" id='Other' name="gender" className='h-6 w-6' checked={form.gender === "Other"} onChange={onChangeHandler} value="Other" />
                <label htmlFor="Other" className='pr-5 pl-1'>Other</label>
              </div>
            </div>
          </div>
          <div className='w-[50%] flex-col flex sm1:w-[100%]'>
            <label className='mb-4' htmlFor='dob'>Date Of Birth</label>
            <input type="date" id='dob' className='bg-gray-700 p-2 rounded-lg w-[70%]' onChange={onChangeHandler} value={form.dateOfBirth} name='dateOfBirth' />
          </div>
        </div>

        {/* state & university section */}
        <div className='bg-[#161D29] border-2 md:pb-8 border-[#2C333F] p-4 mt-0 flex justify-between text-gray-300  md:flex-col'>

          <div className=' w-[40%] flex flex-col gap-5 md:w-[100%]'>
            <div className='flex flex-col '>
              <label htmlFor="country" className='mb-2'>Country</label>
              <select id="country" className='px-3 py-2 rounded-lg bg-gray-700' onChange={onChangeHandler} value={form.country} name='country' >
                <option value="india">India</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <label htmlFor="State" className='mb-2'>State</label>
              <select id="State" className='px-3 bg-gray-700 py-2 rounded-lg' onChange={selectState} value={form.homeState} name='homeState' >
                <option value="" disabled >Select State</option>
                {
                  state.map((data, index) => {
                    return (
                      <option key={index} value={data}  >{data}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className='flex flex-col'>
              <label htmlFor="city" className='mb-2'>City</label>
              <select name="city" id="city" className='px-3 py-2 bg-gray-700 rounded-lg' value={form.city} onChange={onChangeHandler} placeholder="city">

                {
                  city.length > 0 && city.map((data, index) => {
                    return (
                      <option key={index} value={data} >{data}</option>
                    )
                  })
                }
                {
                  city.length >= 0 && <option>City</option>
                }
              </select>
            </div>
          </div>
          <div className=' flex flex-col gap-5 w-[50%] md:w-[100%] md:mt-8'>
            {user === AccountType[0] ? <>
              <div className='flex flex-col'>
                <label htmlFor="ustate" className='mb-2'>Select Uinversity State</label>
                <select name="ustate" id="ustate" className='px-3 py-2 bg-gray-700 rounded-lg' onChange={selectUniversity}>
                  {
                    state.map((data, index) => {
                      return (
                        <option key={index} value={data} >{data}</option>
                      )
                    })
                  }
                </select>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="university" className='mb-2'>University</label>
                <select name="University" onChange={onChangeHandler} value={form.University} id="university" className='px-3 py-2 bg-gray-700 rounded-lg'>
                  {
                    uni.length > 0 ? (uni.map((data, index) => {
                      return (
                        <option key={index} value={Object.values(data).at(0)} >{Object.values(data).at(0)}</option>
                      )
                    })) : (
                      <option>not found any university</option>
                    )
                  }
                </select>
              </div>
            </>
              : <>
                <div className=' bg-gray-700 rounded-lg p-2 m-3 flex flex-col md:w-[100%] md:mx-auto'>
                  <p className='p-1'>Language</p>
                  {/* <button className='p-3 bg-[#000814] text-gray-300 font-bold rounded-xl' ><IoMdRemove /></button> */}
                  {
                    fieldArray.length > 0 && fieldArray.map((data, index) => {
                      console.log(index)
                      return (
                        <div className='flex justify-between pt-4 px-1 rounded-md w-[100%]' key={index}>
                          <input type="text" placeholder='Add Language : ie. English' onChange={(e) => { onInputValue(e, index) }} className='bg-[#161D29] px-2 outline-none rounded-lg min-w-[78%] focus:border-[1px] border-yellow-400' />
                          <div className='max-w-[20%]'>
                            <button className='p-3 bg-[#000814] text-gray-300 font-bold rounded-full mr-1' onClick={addInput}><IoMdAdd /></button>
                            <button className='p-3 bg-[#000814] text-gray-300 font-bold rounded-full' onClick={() => deleteItem(index)}><IoMdRemove /></button>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </>
            }
          </div>

        </div>

        {/*  finish state & uni div */}
        <div className='bg-[#161D29] md:pb-8  md:flex-col md:gap-5 border-2 border-[#2C333F] p-4 mt-0 flex justify-between text-gray-300'>
          {/* phone */}
          <div className='flex flex-col w-[40%] md:w-[100%]'>
            <label htmlFor="phone" className='mb-4 md:mb-2'>Phone</label>
            <PhoneInput
              defaultCountry="IN"
              id="phone"
              value={value}
              onChange={setValue}
              className="number2" />
          </div>

          {/* Profession */}
          <div className='flex flex-col w-[50%]  md:w-[100%]'>
            {
              user === AccountType[0] ?
                <><label htmlFor="profession" className='mb-4 md:mb-2'>Profession</label>
                  <select name="profession" id="profession" onChange={onChangeHandler} className='px-3 py-2 bg-gray-700 rounded-lg' value={form.profession}>
                    <option value="Undergraduate" defaultValue={'Undergraduate'}>Undergraduate</option>
                    <option value="Master's">Master's</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Other">Other</option>
                  </select></>
                :
                <>
                  <label htmlFor="Profession" className='mb-4 md:mb-2'>Profession</label>
                  <select name="profession" id="profession" onChange={onChangeHandler} className='px-3 py-2 bg-gray-700 rounded-lg' value={form.profession}>
                    <option value="Instructor" defaultValue={'Instructor'} >Instructor</option>
                  </select>
                </>
            }
          </div>
        </div>

        {/*  about section */}
        <div className='bg-[#161D29] border-2 border-[#2C333F] p-4 mt-0  text-gray-300'>
          <p className='text-2xl mb-5'>About</p>
          {/* <p className='text-red-400 mt-2 mb-4' id='error1'>About section is required</p> */}
          <div className='flex gap-10 justify-between lg1:flex-col'>
            {user === AccountType[0]
              ? (<div className='flex flex-col w-[40%] lg1:w-[100%]'>
                <label htmlFor="YourSelf" className='mb-2'>Your Self</label>
                <input type="text" id='YourSelf' onChange={(e) => handleChange2(3, e)} name='YourSelf' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='My name is..' />
                <label htmlFor="goal" className='mb-2 mt-3'>goal</label>
                <input type="text" onChange={(e) => handleChange2(2, e)} id='goal' name='goal' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='Become a Softawre Eng...' />
                <label htmlFor="hobbay" className='mb-2 mt-3'>hobbay</label>
                <input type="text" onChange={(e) => handleChange2(1, e)} id='hobbay' name='hobbay' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='Playing cricket..' />
                <label htmlFor="Technology" className='mb-2 mt-3'>Technology</label>
                <input type="text" onChange={(e) => handleChange2(0, e)} id='Technology' name='Technology' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='java,SQL..' />
              </div>)
              : (<div className='flex flex-col w-[40%] lg1:w-[100%]'>
                <label htmlFor="i1" className='mb-2 mt-3'>education</label>
                <input type="text" onChange={(e) => handleChange3(7, e)} id='i1' name='education' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='B.S. in Computer Sci...' />
                <label htmlFor="i2" className='mb-2 mt-3'>pastExperience</label>
                <input type="text" onChange={(e) => handleChange3(6, e)} id='i2' name='pastExperience' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='Ex-Google,Ex-Micros...' />
                <label htmlFor="i3" className='mb-2 mt-3'>teachingExperience</label>
                <input type="text" onChange={(e) => handleChange3(5, e)} id='i3' name='teachingExperience' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='5 years in software..' />
                <label htmlFor="i4" className='mb-2 mt-3'>thinking</label>
                <input type="text" onChange={(e) => handleChange3(4, e)} id='i4' name='thinking' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='Believes..' />
                <label htmlFor="i5" className='mb-2 mt-3'>message</label>
                <input type="text" onChange={(e) => handleChange3(3, e)} id='i5' name='message' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='Never stop coding...' />
                <label htmlFor="i6" className='mb-2 mt-3'>hobby</label>
                <input type="text" onChange={(e) => handleChange3(2, e)} id='i6' name='hobby' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='Coding and hiking' />
                <label htmlFor="i7" className='mb-2 mt-3'>lifePhilosophy</label>
                <input type="text" onChange={(e) => handleChange3(1, e)} id='i7' name='lifePhilosophy' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='Embrace challenges and turn...' />
                <label htmlFor="i8" className='mb-2 mt-3'>goal</label>
                <input type="text" onChange={(e) => handleChange3(0, e)} id='i8' name='goal' className='px-3 py-2 rounded-lg bg-gray-700' placeholder='your future goal..' />
              </div>)}

            <div className='rounded-lg  w-[50%] lg1:w-[100%]  sm1:flex-col sm1:gap-5 flex items-center justify-evenly border-2 border-[#2C333F] p-7'>
              <div className='text-black  sm1:w-[100%]'>
                <button className='p-3 border-2 border-gray-700 sm1:w-[100%] rounded-lg bg-slate-700'>Cancel</button>
              </div>
              <div className='text-black  sm1:w-[100%]'>
                <button className='bg-yellow-400 sm1:w-[100%] py-3 rounded-lg px-4' id='s1' onClick={submiting}>Save</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default EditProfile
