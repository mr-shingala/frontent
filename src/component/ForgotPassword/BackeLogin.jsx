import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const BackeLogin = () => {
 return (
  <div className='inline-block mt-3'>
   <NavLink to="/login">
    <span className='flex items-center text-white gap-4'>
     <FaArrowLeft />
     <span>Back to login</span>
    </span>
   </NavLink>
  </div>
 )
}

export default BackeLogin
