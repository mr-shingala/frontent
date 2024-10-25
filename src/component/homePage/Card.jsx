import React from 'react'
import { HomePageExplore } from '../../data/homepage-explore'
import Text from './Text'
import { useState } from 'react'
import '/src/page/style1.css'
 

const Card = () => {

 const [state, setState] = useState("Free")
 const [index, setIndex] = useState(1)
 const [click, setClick] = useState(false)

  function onButton(data,index){
     setState(data)
     setIndex(index);
  }

  function onCard(data){
     setClick(data) 
 }


  return (
   <div className='pt-16 flex flex-col items-center relative -bottom-16'>
   <p className='text-4xl text-center text-[#F1F2FF] font-medium mb-8'>Unlock the <Text> Power of Code </Text> </p>
   <p className='text-[#838894] text-center'>Learn to Build Anything You Can Imagine</p>
   <div className=' mt-14 bg-[#161d29] w-auto h-auto text-nowrap md:flex-col md:rounded-lg md:w-[90%] flex p-3 rounded-full mb-20 '>
       {HomePageExplore.map((data,index)=>{
         return(
            <p className={`text-[#F1F2FF] font-medium cursor-pointer text-lg inline px-6 py-1 rounded-full ${state === data.tag?"bg-[#000814]":"bg-inherit"}`}  key={index} onClick={()=>{onButton(data.tag,index)}}>{data.tag}</p>
         )
       })}
   </div>
   <div className='flex mx-auto gap-12 xl1:flex-col'>
     {
      HomePageExplore[index].courses.map((data,index)=>{
          return(
             <div className={`w-[341px] h-[300px] flex flex-col justify-between px-6 pt-8 cursor-default  ${(index === click)?"bg-gray-50 boxshadow6":"bg-[#161d29]"}`} key={index} onClick={()=>{onCard(index)}}>
               <div>
               <p className={` font-normal w-[90%] leading-7 ${(index === click)?"text-[#161d29]":"text-[#F1F2FF] "}`} >{data.heading}</p>
               <p className='text-[#6E727F] mt-2' >{data.description}</p>
               </div>
              
                <div className='flex text-[#838894] justify-between pb-2'>
                   <p className='flex gap-2'><img className='w-5'  src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728964787/cubes_sg9xec.png" alt="" />{data.level}</p>
                   <p className='flex gap-2 '><img className='w-5' src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728964780/level-up_d1xjgu.png" alt="" />{data.lessionNumber}</p>
                </div>
               
             </div>
          )
      })
     }
   </div>
</div>
  )
}

export default Card
