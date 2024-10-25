import React from 'react'
import { useSelector } from 'react-redux'


const DashHome = () => {
  const name = useSelector((state) => state.profile.name)
  return (
    <div className=' w-[100%] min-h-[calc(100vh-132px)]  flex items-center justify-center flex-col '>
        <video src="https://res.cloudinary.com/dlgm6g3gn/video/upload/v1728926186/asg_yanikw.mp4" autoPlay muted loop className='rounded-2xl'></video>
        <p className='text-gray-300 text-4xl font-bold lg1:text-2xl lg1:text-center'>hii, <span className='gradient4'>{name}</span> welcome to your Dasboard </p>
        <p className='text-gray-400 mt-4 text-2xl lg1:text-lg text-center'>Ready to <span className='gradient6'>conquer</span> the day? Let's go!</p>
    </div>
  )
}

export default DashHome
