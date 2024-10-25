import React from 'react'
import Gradient from './Gradient'
import Button from './Button'
import { SkillData } from '../../data/image'
import '/src/page/style1.css'


const Sectionimage = () => {
   return (
      <div className='flex flex-col mx-auto max-w-[1200px] pt-10 bg-[#f9f9f9] pb-5 overflow-x-hidden'>
         <div className='flex w-[100%] xl:px-8 xl:gap-10 gap-16 lg1:flex-col lg1:items-center'>
            <div className='w-[50%] lg1:w-[80%] '>
               <p className='text-[#000814] font-semibold text-4xl w-[80%] xl:w-[100%]'>Get the skills you need for a <Gradient>job that is in demand.</Gradient></p>
            </div>
            <div className='w-[50%] lg1:w-[80%]'>
               <p className='text-[#2C333F] leading-6 font-medium mb-9  xl:w-[100%]'>The modern CodeVidya is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
               <div className='inline-block'>
                  <Button active={true} text={"Learn More"}></Button>
               </div>
            </div>
         </div>
         
         <div className='flex mt-11 w-[100%] relative xl:flex-col xl:gap-28 items-center py-14 md:py-7 justify-center  xl:px-10 '>
            <div className='w-[40%] xl:w-[90%] flex items-center justify-center'>
            <div className=' mx-auto'>
               {
                  SkillData.map((data, index) => {
                     return (
                        <div key={index}>
                           <div className='flex gap-4'>
                              <div className='h-14 w-14 rounded-full  boxshadow8 flex items-center justify-center bg-[#ffffff]'><img src={`${data.image}`} alt="img" className='h-10 w-10' /></div>
                              <div className='flex flex-col'>
                                 <p className='text-[#161D29] font-medium text-lg'>{data.tag}</p>
                                 <p className='text-[##2C333F] font-normal text-sm'>{data.des}</p>
                              </div>
                           </div>
                           {(index == (SkillData.length-1)) ? "" : <div className="h-12 border-dashed border-l-2 border-[#AFB2BF] ml-7 my-2">
                           </div>}
                        </div>
                     )
                  })
               }
            </div>
            </div>
            <div className='w-[55%]  xl:w-[100%] mx-auto  boxshadow7 relative z-10 rounded-md bg-emerald-500 '>
            <img className='w-[100%] h-[100%] z-10 rounded-md' src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728964894/pexels-photo-4145243_kt8ltd.jpg" alt="image"  />
               <div className='absolute flex bg-[#014A32] -bottom-4 xl:left-[20%] sm1:left-0 left-16 p-3 md:p-0'>
                 <div className='flex gap-4 p-5 md:p-3 border-r-2 border-[#05a77b]'>
                     <p className='text-[#FFFFFF] leading-10 text-3xl md:text-lg font-bold'>10</p>
                     <p className='text-[#05a77b] font-normal md:text-xs leading-[22px] w-[50%]'>YEARS EXPERIENCES</p>
                 </div>
                 <div className='flex gap-4 p-5 md:p-3'>
                 <p className='text-[#FFFFFF] leading-10 text-3xl md:text-lg font-bold'>250</p>
                 <p className='text-[#05A77B] font-normal leading-[22px] md:text-xs w-[50%]'>TYPES OF COURSES</p>
                 </div>
            </div>
            </div>

         </div> 
      </div>
   )
}

export default Sectionimage
