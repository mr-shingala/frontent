import React from 'react'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa6";

const Block1 = (props) => {
  return (
    <div className='w-[40%] lg1:w-[100%] '>
      <h1 className='text-[#F1F2FF]  leading-snug inline-block font-semibold text-4xl md:text-3xl'>{props.children}</h1>
      <p className='text-[#abb0bb] pt-4 pb-11'>{props.text}</p>
      <div className='gap-6 flex lg1:flex-col'>
      <Button text={`${props.button1Text}`} icon={<FaArrowRight />} active={true} linkto={"/signup"}></Button>
      <Button text={`Lern More`} active={false} linkto={"/login"}></Button>
      </div>  
    </div>
  )
}

export default Block1
