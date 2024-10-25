import React from 'react'
import Text from './Text'
import Button from './Button'
import '/src/page/style1.css'
import { FaArrowRight } from "react-icons/fa6";

const InstructorSection = () => {
  return (
    <div className='bg-[hsl(216,100%,4%)] '>
    <div className='flex  max-w-[1200px] 1xl:flex-col 1xl:gap-24 md:gap-12 mx-auto items-center justify-center py-14 px-7'>
       <div className=' w-[50%] 1xl:w-[80%] '>
          <img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728926070/inscrop_nzb2lp.jpg" className='h-[500px] md:h-[auto] boxshadow9 1xl:mx-auto' alt="img" />
       </div>
       <div className=' w-[50%] 1xl:w-[80%] 1xl:text-center'>
           <p className='text-[#F1F2FF] font-bold  text-3xl mb-3'>Become an <Text>instructor</Text></p>
           <p className='text-[#838894] font-medium  mb-14'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
           <div className='inline-block'>
           <Button active={true} text={"Start Teaching Today"}  icon={<FaArrowRight />} ></Button>
           </div>

       </div>
    </div>
    </div>
  )
}

export default InstructorSection
