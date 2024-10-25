import React from 'react'
import Template from '../component/Navbar/Template'

const SignUp = () => {
  const img = "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1727895774/studentsignup_dyudgz.jpg"
  const insImg = 'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1727895760/loginins_sxp0vw.webp'
  const h1 = 'Join the millions learning to code with StudyNotion for free'
  const text = 'Education is the most powerful weapon which '
  const span = 'you can use to change the world.'
  return (
    <div className='pb-32 bg-[#000814] '>
        <Template imgurl={img} h1={h1} imgurl2={insImg} text={text} type={"signup"} span={span} ></Template>
    </div>
  )
}

export default SignUp
