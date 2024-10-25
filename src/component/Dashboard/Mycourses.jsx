import React, { useEffect, useState } from 'react'
import Button from '../homePage/Button'
import { IoMdAddCircleOutline } from "react-icons/io";
import { json, useNavigate, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import {setData,setId,setFleg } from '../../slices/modalSlice'
import { FunctioId,DeleteCourse } from '../../utils/constnt';
import {setcourseId,setUpdate,setStep} from '../../slices/courseSlice'

const Mycourses = () => {
  
  const dispatch = useDispatch()
  const  navigate = useNavigate()
  //useEffect hook call when course is created in db 
  const token = useSelector((state) => state.auth.token)
  const [loading, setLoading] = useState(false)
  const [courseData, setCourseData] = useState([]) 
 
  useEffect(() => {
    setLoading(true)
    async function apicall() {
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getInsCourseDetails`,{
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
          credentials: "include",
        })
        const data = await response.json()
        console.log(data) 
        if(data.success){
          setCourseData(data.data.course)
        }else{
          toast.error('Not fech course data')
        }
        setLoading(false)
      }
      catch (e) {
        console.log(e)
      }
    }
    apicall()

  }, [])

  function deleteCourse(id){
    dispatch(setFleg(true))
    dispatch(setId(FunctioId[3]))
    dispatch(setData({icon:DeleteCourse,heading:"Delete course!"}))
  }

  function updateCourse(id){
    dispatch(setcourseId(id))
    dispatch(setUpdate(true))
    dispatch(setStep(1))
    navigate('/dashboard/Add Course')
  }


  return (
    <div className='pb-14 max-w-[1500px]'>
      <div className='inline-block mt-5 mb-7'>
        <Button text='New' active={true} linkto='/dashboard/Add Course' icon={<IoMdAddCircleOutline />} ></Button>
      </div>
      <div className='w-[90%] mx-auto border-2 border-gray-800 py-3'>
        {
           loading
           ?(<p className='text-2xl text-green-400 px-3'>Loading....</p>)
           :( courseData.length <= 0 ? <p className='text-gray-400 text-2xl ml-4'>No couse found</p> : 
           <><div className='flex text-gray-400'>
            <p className='w-[63%] text-center xl2:w-[100%]'>COURSES</p>
            <p className='w-[14%] text-center border-l-2 border-gray-800 xl2:hidden'>DURATION</p>
            <p className='w-[11%] text-center border-l-2 border-gray-800 xl2:hidden'>PRICE</p>
            <p className='w-[12%] text-center border-l-2 border-gray-800 xl2:hidden'>ACTIONS</p>
          </div>
          <div className='flex flex-col text-gray-400 mt-4'>
             {
                courseData.map((data,index)=>{
                    return (
                      <div className='flex mx-3  py-3 border-t-2 xl2:pb-5 border-gray-800 mt-2  xl2:flex-col' key={index}>
                         <div className='flex w-[63%] px-3 gap-5 xl2:w-[100%] xl2:mt-2 xl2:items-center md:flex-col'>
                           <div className='min-w-[200px] min-h-[113px] w-[200px] h-[113px]'>
                              <img src={data.thumbnail} alt="thumbnail" className='rounded-md' />
                           </div>
                           <div className='flex flex-col md:mt-5'>
                              <p className='text-2xl font-bold sm:text-xl text-gray-300'>{data.title}</p>
                              <p className='my-1 line-clamp-2'>{data.shortDesciption}</p>
                              <p className=''>Created: {data.cratedAt}</p>
                              <div className='flex mt-1'>
                                <p className={`flex flex-wrap items-center text-sm gap-1 py-1 px-3 bg-[#2C333F]  rounded-full ${data.status == 'Draft'?"text-red-400":"text-green-400"}`}><span>{data.status == 'Draft'?<FaClockRotateLeft />:<IoCheckmarkDoneCircle className='text-xl' />}</span> {data.status}</p>
                              </div>   
                           </div>
                         </div>
                         <div className='flex w-[14%] xl2:w-[100%] items-center xl2:mt-2  justify-center xl2:justify-start'>
                            <p className='xl2:hidden block'>{data.totalDuration}</p> 
                            <p className='xl2:block hidden pl-3'>Duration :- {data.totalDuration}</p>
                         </div>

                         <div className='flex w-[11%] xl2:w-[100%] xl2:justify-start xl2:mt-2 items-center justify-center'>
                           <p className='xl2:hidden block'>{data.price}</p> 
                           <p className='xl2:block hidden pl-3'>Price :- &#8377; {data.price}</p>
                         </div>
                         <div className='flex items-center xl2:w-[100%] xl2:justify-start xl2:pl-3 xl2:mt-2 justify-center w-[12%] gap-3'>
                            <button className='flex items-center  text-xl' onClick={() => {  const id = data._id; updateCourse(id)}} ><FaEdit /></button>
                            <button className='flex items-center  text-xl' onClick={()=>{ 
                              const id = data._id
                               deleteCourse(id)}}><MdDelete /></button>
                         </div>
                      </div> 
                    )
                })
             }
          </div></>)
        }
      </div>
    </div>
  )
}

export default Mycourses
