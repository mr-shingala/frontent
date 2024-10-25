import React from 'react'
import Template from '../component/Navbar/Template'

const Login = () => {
  const img = "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728068574/pexels-photo-3184325_zru5j9.jpg"
  const insImg = ''
  const h1 = 'Welcome Back'
  const text = 'Build skills for today, tomorrow, and beyond.'
  const span = 'Education to future-proof your career.'
  return (
    <div className='bg-[#000814] '>
       <Template imgurl={img} imgurl2={insImg} h1={h1} text={text} type={"login"} span={span} ></Template>
    </div>
  )
}

export default Login
