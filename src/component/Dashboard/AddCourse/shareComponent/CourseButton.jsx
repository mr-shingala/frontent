import React from 'react'

const CourseButton = ({text,icon="",active,taskFunction}) => {
  return (
    <div>
       <button onClick={taskFunction} className={`rounded-md flex py-2 font-semibold px-3 items-center ${active ? "bg-yellow-400 border-yellow-200 text-black" : "bg-[#2C333F] text-gray-300 border-gray-600"} border-2 `}>{text} {icon}</button>
    </div>
  )
}

export default CourseButton
