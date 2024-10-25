import React from 'react'
import CourseComponent from './AddCourse/CourseComponent'

const Addcouse = () => {
  return (
    <div className='h-auto relative max-w-[1500px]'>
         <div className=' bg-[#161D29] mt-10 w-[80%] p-3 mx-auto border-[3px] border-gray-800'>
            <p className='text-xl font-bold text-gray-200'>&#10024;Course Upload Tips</p>
            <ul className='list-disc pl-12 mt-1 text-gray-300'>
               <li>Set the Course Price option or make it free.</li>
               <li>Standard size for the course thumbnail is 1024x576.</li>
               <li>Video section controls the course overview video.</li>
               <li>Course Builder is where you create & organize a course.</li>
               <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
               <li>Information from the Additional Data section shows up on the course single page.</li>
               <li>Make Announcements to notify any important</li>
               <li>Notes to all enrolled students at once.</li>
               <li>Course Builder is where you create & organize a course.</li>
            </ul>
         </div>
        <CourseComponent></CourseComponent>
    </div>
  )
}

export default Addcouse
