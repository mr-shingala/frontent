import React from 'react'

const AdminCard = ({img,color,text,number}) => {
 return (
  <div className='w-72 border-4 bg-gray-900 border-gray-700 rounded-lg p-3'>
  <img src={`${img}`} alt="img" className='h-12 w-12' />
  <p className={`${color} text-2xl font-semibold mt-2`}>{text}</p>
  <p className={`${color} text-2xl font-semibold mt-1`}>{number}</p>
 </div>

 )
}

export default AdminCard
