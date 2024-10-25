import React from 'react'
import Gradient from '../component/homePage/Gradient'
import Text from '../component/homePage/Text'
import './style1.css'
import { Record } from '../data/AboutsAs'
import Slider from '../component/AboutUs/Slider'
import Form from '../component/AboutUs/Form'
import Footer from '../component/Footer/Footer'
import RivewBar from '../component/reviewbar/RivewBar'

const AboutUs = () => {
 return (
  <div className='bg-[#000814] w-[100%] h-[100%]'>
   <div className="mx-auto h-72  bg-cover   bg-[url('https://res.cloudinary.com/dlgm6g3gn/image/upload/v1727722795/bgfinan_suvkdi.png')] flex justify-center items-center">
    <div className='w-[1200px] xl:w-full flex justify-between text-white font-semibold text-4xl xl:px-5'>
     <p className='bg-black py-1 px-1 rounded-2xl md:text-lg'>About Us</p>
     <p className='bg-black py-1 px-1 rounded-2xl md:text-lg'>Home / About Us</p>
    </div>
   </div>

   <div className='w-[1200px] xl:px-10  xl:w-[100%] h-[auto] mx-auto flex-col items-center justify-center'>

    <p className='text-white text-3xl md:text-xl text-center font-bold leading-relaxed mt-7 pb-7 '>By embracing cutting-edge technology, we aim to <Gradient>revolutionize online education,</Gradient> creating a <Text>brighter future</Text> for students globally.</p>
    <p className='text-gray-400 text-center pb-10 '>
     CodeVidya leads the way in advancing online education, committed to shaping a brighter future through state-of-the-art courses. We harness the power of emerging technologies and foster a dynamic learning community to deliver an exceptional educational experience. Our dedication to innovation ensures that learners receive the most current and effective tools to succeed in their academic and professional pursuits.</p>
    <p></p>
   </div>

   <div className='w-[1200px] md:flex-col  xl:px-10 md:px-0 xl:w-[100%] h-[auto] mx-auto items-center flex justify-between text-justify mt-12 mb-12'>
    <div className='w-[50%] pb-10 md:w-[80%]'>
     <p className='gradient4 text-3xl font-bold py-5 '>Our Founding Story</p>
     <p className='text-gray-400'>CodeVidya was founded by Shrey Shingala with a vision to bridge the gap between traditional education and the demands of the modern world. Together with a dedicated team of educators, technologists, and lifelong learners, Shrey recognized the need for accessible and flexible learning opportunities in a rapidly evolving digital landscape. Our goal was to combine the rigor of conventional education with the innovation of online learning.</p>
     <p className='pt-2 text-gray-400 '>
      ince its inception, CodeVidya has grown into a leading online education platform, offering a diverse range of courses including Java, C programming, and Data Structures and Algorithms. Crafted by experts and leveraging emerging technologies, our courses provide an exceptional learning experience.
     </p>
    </div>
    <div className='w-[40%] md:w-[90%] relative z-50 videoAnimation '>
     <video src="https://res.cloudinary.com/dlgm6g3gn/video/upload/v1728925312/ode_Software_snb9kw.mp4" className='w-[100%]' muted loop autoPlay type="mp4"></video>
    </div>
   </div>

   <div className='w-[1200px] xl:w-[100%]  md:px-0  xl:px-10 md:flex-col md:items-center h-[auto] mx-auto  flex justify-between items-start text-justify gap-10 mt-24 mb-16'>
    <div className='w-[50%] pb-1 md:w-[80%]'>
     <p className='gradient4 text-3xl font-bold pb-5 pt-5  gradient5'>Our Vision</p>
     <p className='text-gray-400'>
      Our vision is to become a global leader in online education. We aim to break down geographical and systemic barriers to education, fostering a dynamic and inclusive learning environment that continuously adapts to the needs of the future. By pushing the boundaries of what’s possible in online learning, we aspire to create a world where everyone has access to transformative educational experiences.
     </p>
    </div>
    <div className='w-[50%] pb-10 flex flex-col  md:w-[80%]'>
     <p className='gradient4 text-3xl font-bold pb-5 pt-5 gradient6'>Our Mission</p>
     <p className='text-gray-400'>
      At CodeVidya, our mission is to revolutionize education by providing accessible, high-quality learning experiences that bridge the gap between traditional methods and modern digital demands.
     </p>
    </div>
   </div>

   <div className='flex w-[1200px] xl:w-[90%]  1xl:min-h-[720px] 1xl:bg-contain bg-[url(https://res.cloudinary.com/dlgm6g3gn/image/upload/v1727722875/ceo_d2kks4.png)]  xl:mx-10 md:mx-2  rounded-xl border-4  border-gray-800 py-10 md:py-5 mx-auto  gap-9 mt-28 1xl:items-end justify-end px-10 md:px-0  bg-cover bg-no-repeat'>
    <div className='w-[40%] xl:w-[100%]  text-bleck my p-4   text-justify font-bold text-white tracking-widest'>
     <p>Dear Friends,</p>
     <p className='mt-4 text-base'>Success is more than financial achievements; it's about building a world where innovation thrives, and everyone flourishes. As you embark on your journey, remember these guiding principles:<span className='text-yellow-400 font-bold'>Teamwork and Leadership</span> , <span className='text-cyan-400 font-bold'>Learning and Growth</span> , <span className='text-green-400 font-bold'>Empathy and Social Responsibility</span> , <span className='text-blue-300 font-bold'>Innovation and Adaptability</span> , <span className='text-orange-400 font-bold'>Passion and Perseverance</span> , <span className='text-purple-400 font-bold'>Integrity and Ethics.</span>
     </p>
     <img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1727722938/signaturecrop_rz43rz.png" alt="sign" className='h-12 ml-4 mt-10' />
     <p className='mt-1'>Shrey Shingala</p>
     <p>CEO, CodeVidya</p>
    </div>
   </div>
   {/* bg-[url(https://res.cloudinary.com/dlgm6g3gn/image/upload/v1727722875/ceo_d2kks4.png)] */}

   <div className='mt-20 mb-16 sm:flex-col  md:px-2   xl:px-10 sm:gap-10 sm:items-center text-white xl:w-[100%] w-[1200px] mx-auto bg-[#161D29] overflow-hidden py-20 flex justify-around'>

    {
     Record.map((data, index) => {
      return (
       <div className='flex flex-col items-center justify-center sm:w-[150px] sm:items-end' key={index}>
        <div className='flex justify-center items-center text-white mx-auto  sm:justify-end sm:w-[100%]  font-bold text-4xl'>
         <div className='h-12 overflow-x-hidden  overflow-y-hidden '>
          <p className='numberanimation'>{data.number}</p>
         </div>
         <p className=''>{data.after}</p>
        </div>
          <p className='text-gray-400 mt-3'>{data.text}</p>
       </div>
      )
     })
    }
   </div>

   <div className='w-[1200px] mx-auto mt-24  md:px-2  xl:px-10 xl:w-[100%] '>
   <p className='gradient4 text-3xl font-bold pb-5 pt-5 1xl:ml-8'>Meet Our Team</p>
     <Slider></Slider>
   </div>

   <div className='mt-24  w-[1200px] xl:w-[100%]  md:px-14  sm:p-5   xl:px-10  mx-auto items-center justify-center flex flex-col'>
       <p className='text-white text-3xl font-bold'>Get in Touch</p>
       <p className='text-gray-400 md:text-center'>We’d love to here for you, Please fill out this form.</p>
       <div className='max-ew-[550px] md:w-[100%]'>
       <Form></Form>
       </div>
   </div>

    <div className='mt-24 text-4px text-white  w-[100%] mx-auto px-5'>
        <RivewBar></RivewBar>
   </div> 
    <Footer></Footer> 
    

  </div>
 )
}

export default AboutUs
