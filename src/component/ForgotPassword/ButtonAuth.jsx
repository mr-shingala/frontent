import React from 'react'
import '/src/page/style1.css'

const ButtonAuth = ({text,icon=""}) => {
  return (
    <div className='bg-[#FFD60A] text-[#161D29]] py-3 px-8 rounded-lg boxshadow2 cursor-pointer hover:scale-105 duration-100 flex justify-center items-center gap-2'>
       {text}
    </div>
  )
}

export default ButtonAuth
