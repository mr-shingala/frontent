import React from 'react'
import Gradient from './Gradient'
import Button from './Button'


const Language = () => {
  return (
    <div className='mt-5 pb-20'>
       <div className='mb-10  sm:px-14'>
          <p className='text-3xl text-[#000814] md:text-2xl text-center mb-4 sm:leading-tight leading-loose font-bold'>Your swiss knife for <Gradient>learning any language</Gradient></p>
          <p className='max-w-[535px] mx-auto text-[#2C333F] font-medium text-center  bg-slate-50'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
       </div>
       <div className='mx-auto  flex w-[100%] items-center justify-center mt-20 1xl:flex-col'>
            <div className='flex md:flex-col'>
            <img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728925753/card1_wtybw5.png" alt="" className='h-[400px] w-[300px] md:h-[350px] md:w-[250px] rotate-12 -mr-1' />
            <img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728925754/card3_lxx4bz.png" alt="" className='h-[400px] w-[300px] md:h-[350px] md:w-[250px] -rotate-12 -mr-5'/>
            </div>
            <div className='flex md:flex-col 1xl:mt-8'>
            <img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728925754/card2_hl9td4.png" alt=""className='h-[400px] w-[300px] md:h-[350px] md:w-[250px] rotate-12 -mr-5'/>
            <img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728925754/card4_vwpnmt.png" alt="" className='h-[400px] w-[300px] md:h-[350px] md:w-[250px] -rotate-12 -mr-5'/>
            </div>
       </div>
       <div className='mt-20 flex items-center justify-center'>
           <Button active={true} text={"Lern More"}></Button>
       </div>
    </div>
  )
}

export default Language
