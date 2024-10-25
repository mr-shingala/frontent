import React, { useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';
import {colorArray} from '../../utils/constnt'
import '/src/page/style1.css'

const Block2 = ({ code }) => {

  const [textColor, setTextColor] = useState('red');
  const [num,setnum] = useState(0)
  const colorArray = ['#f8f8f2', '#66d9ef','#f8f8f2','#f36c6c', '#ae81ff', '#f92672', '#a6e22e', '#e6db74', '#66d9ef'];

  useEffect(() => {
    const id = setInterval(() => {
      const i = Math.floor(Math.random() * colorArray.length);
      setnum(i);
    }, 1500);
    return () => clearInterval(id);
  }, []); // Empty dependency array means it runs only once (on mount)

  useEffect(()=>{
    // clearInterval(id);
    setTextColor(colorArray[num])
  },[num])


  const a = code.join("\n").toString();
  // const b = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>My Simple Page</title>\n</head>\n<body>\n<h1>Welcome to My Page!</h1>\n<p>This is a basic HTML.</p>\n</body>\n</html>'
  return (

    <div className='w-[50%] lg1:w-[100%] flex relative animation'>

      <div className='w-[10%] border-y-4 border-gray-700 rounded-s-md border-l-4 leading-[34px] text-[#6E727F] text-base pt-3 text-[24px] flex flex-col items-center relative z-30'>
         <p>1</p>
         <p>2</p>
         <p>3</p>
         <p>4</p>
         <p>5</p>
         <p>6</p>
         <p>7</p>
         <p>8</p>
         <p>9</p>
         <p>10</p>
         <p>11</p>
      </div>

      <div className=' h-[400px] md:text-lg md:leading-8 border-y-4 border-gray-700 border-r-4 rounded-e-md pt-2 w-[90%] relative  z-30' style={{ color: textColor }} >
        <TypeAnimation
          sequence={[a, 2000, ""]}
          cursor={true}
          speed={50}
          style={{ fontSize: '22px', display: 'block', whiteSpace: "pre-line" }}
          repeat={Infinity}
          omitDeletionAnimation={true}
        />
      </div>
    </div>

  )
}

export default Block2
