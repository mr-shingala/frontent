import React from 'react'
import { useNavigate } from 'react-router-dom'
import '/src/page/style1.css'

const Button = ({text,active,linkto,icon = ""}) => {

   const link = useNavigate()
   function function1(){
     link('/login')
   }
 
 
  return (
    <>
       {active ? <div onClick={function1} className='bg-[#FFD60A] text-[#161D29]] py-3 px-6 rounded-lg boxshadow2 cursor-pointer hover:scale-105 duration-100 flex justify-center items-center gap-2'>{text}{icon}</div> 
       : <div onClick={function1} className='bg-[#161D29] text-[#F1F2FF] py-3 px-6 rounded-lg boxshadow3 cursor-pointer hover:scale-105 duration-100 text-center'>{text}</div>}
    </>
  )
}

export default Button
