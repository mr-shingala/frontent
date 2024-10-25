import React from 'react'
import { useNavigate } from 'react-router-dom'


const Loop = ({ data,head }) => {

  const link = useNavigate()

  function clickFunction(element){
     link(element);
  }

 return (
  <div>
    <p className='text-gray-100 font-semibold leading-6 pb-3 cursor-default' >{head}</p>
    {
      data.map((el,index)=>{
        return(
          <p key={index} onClick={()=>{clickFunction(el.link)}} className='leading-[22px] pb-2 cursor-pointer text-gray-500' >{el.title}</p>
        )
      })
    }
  </div>
 )
}

export default Loop
