import React from 'react'
import { useSelector } from 'react-redux'
import { MdDoneAll } from "react-icons/md"
import CourseInfo from './CourseInfo'
import CourseBilder from './step2/CourseBilder'
import PublishCourse from './step3/PublishCourse'

const CourseComponent = () => {

 const {step} = useSelector((state) => state.course)
 //window.alert(step)

  const setps = [
    {
      id:1,
      text:'Course Information'
    },
    {
     id:2,
     text:'Course Builder'
   },
   {
    id:3,
    text:'Publish'
   }
  ]

  return (
    <>
    <div className=' w-[90%] mx-auto mt-14 mb-28 md:hidden '>
       <div className='flex justify-center'>
        {
           setps.map((item,index) => {
               return (
                   <div key={index} className={`flex  items-baseline   ${index !== setps.length-1 ? 'w-[40%]':'w-[150px]'}`}>
                   <div className='center items-center flex flex-col min-w-[150px] justify-center '>
                      <p className={`rounded-full w-10 h-10 text-lg flex items-center justify-center  border-2 ${item.id === step && 'text-yellow-400 border-yellow-400'} ${item.id < step && 'bg-yellow-500 text-gray-950  border-yellow-400'} border-gray-600 text-gray-400 bg-[#161D29]`}>{item.id < step?<MdDoneAll />:item.id}</p>
                      <p className={`mt-4 text-gray-400  ${item.id <= step && 'text-yellow-400'}`}>{item.text}</p>
                   </div>
                   {
                     index !== setps.length-1 &&<div   className={`${item.id < step && 'border-yellow-400 ' } border-2 -mx-10 border-dashed border-gray-600 w-[100%] `}></div>
                   }
                   </div>
               )
           })
        }
       </div>

       <div className='mt-14 w-[100%] text-white'>
           {step === 1 && <CourseInfo></CourseInfo>}
           {step === 2 && <CourseBilder></CourseBilder>}
           {step === 3 && <PublishCourse></PublishCourse>}
       </div>
    </div>
    <div className=' w-[90%] mx-auto mt-14 mb-28 hidden md:block text-white text-center'>
         <p>You can not create Course in this device</p>
    </div>
    </>
  )
}

export default CourseComponent
