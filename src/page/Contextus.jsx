import React from 'react'
import { Contect } from '../data/Contectus'
import Form from '../component/AboutUs/Form'
import Footer from '../component/Footer/Footer'
import RivewBar from '../component/reviewbar/RivewBar'

const Contextus = () => {
 return (
  <div className='bg-[#000814]'>
   <div className='max-w-[1200px] mx-auto '>
    {/* contect section */}
    <div className='flex justify-around  items-start pt-20 xl:flex-col xl:items-center xl:justify-center xl:gap-10' >
     {/* contect section */}
     <div className='bg-[#161D29]  text-[#F1F2FF] p-10 sm:p-5 sm2:p-2 rounded-xl xl:w-[60%] lg1:w-[90%] '>
      {
       Contect.map((data, index) => {
        // console.log(data.subtext.split(".").join("\n"))
        return (
         <div key={index} className='flex mb-6 gap-5 sm2:gap-2'>
          <img src={data.img} alt="icon" className='w-11 h-11 sm2:h-8 sm2:w-8' />
          <div>
           <p>{data.heading}</p>
           <p className='text-[#999DAA] sm2:text-xs'>{data.text}</p>
           <pre className='text-[#999DAA] sm2:text-xs'>{data.subtext.split("#").join("\n")}</pre>
          </div>
         </div>
        )
       })
      }
     </div>
     {/* form section */}
     <div className='p-12 border-2 border-[#424854] rounded-xl w-[50%] xl:w-[60%] lg1:w-[90%]'>
      <p className='text-white text-3xl font-bold md:text-xl'>Got a Idea? We’ve got the skills. Let’s team up</p>
      <p className='text-[#999DAA]'>Tall us more about yourself and what you’re got in mind.</p>
      <Form></Form>
     </div>
    </div>

    {/* reviwe section */}

    <div className='mt-32 text-4px text-white w-[100%] mx-auto px-5'>
        <RivewBar></RivewBar>
   </div> 

   </div>
   <Footer></Footer>
  </div>
 )
}

export default Contextus
