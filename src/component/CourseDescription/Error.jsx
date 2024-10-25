import React from 'react'

function Error({callError}) {
  console.log("cal",callError)
  return (
    <div className='w-full max-w-[1350px] h-[90.9vh] mx-auto flex items-center justify-center flex-col '>
       <img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725295252/sad_i5smjj.png" className="h-24 md:h-16" alt="img" />
       <p className='text-gray-400 text-2xl mt-5 md:px-5 sm:text-xl text-center'>{callError}</p>
    </div>
  )
}

export default Error
