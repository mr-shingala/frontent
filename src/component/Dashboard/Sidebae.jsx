import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'
import { Sidebardata } from '../Navbar/NavData'
import { useSelector } from 'react-redux'

const Sidebae = () => {

  const [flag,setFleg] = useState(-1)
  const [path,setPath] = useState("")
  const user = useSelector((state) => state.profile.user) 
  const location = useLocation();

  useEffect(()=>{
     //console.log(location.pathname.split("/").at(-1))
     setPath(location.pathname.split("/").at(-1).replaceAll("%20"," "))
    //console.log(path)
  },[location.pathname])

  useEffect(()=>{
     console.log(path)
  },[path])


//   function chagebg(index){
//       setFleg(index)
//   }


  return (
    <div className='text-white pt-7 w-[240px] sm22:w-[100%] sm2:w-[210px] '>
       {
          Sidebardata.map((data,index)=>{
              return(
                !data.auth ? (
                  <NavLink to={data.link} key={index}   >
                     <div  className={`flex text-nowrap  py-3 px-4 mt-1 gap-3 sm22:gap-1 sm22:px-1 truncate  ${path === data.name && 'bg-[#00081475] border-l-4  sm22:border-l-0  border-yellow-300'} `}>
                        <img src={data.icon} alt="icon" className={`h-7 w-7 sm22:w-5 sm22:h-5`}  />
                        <p className={`${path === data.name && 'text-yellow-300 font-semibold sm22:font-normal  sm2:text-ellipsis' }`}>{data.name}</p>
                     </div> 
                  </NavLink>):(user === data.auth &&  <NavLink  to={data.link} key={index}>
                     <div className={`flex py-3 px-4 mt-1 gap-3 sm22:gap-1 sm22:px-1 truncate ${path === data.name && 'bg-[#00081475] border-l-4  sm22:border-l-0 border-yellow-300' } `}>
                        <img src={data.icon} alt="icon" className='w-7 h-7 sm22:w-5 sm22:h-5'  />
                        <p className={`${path === data.name && 'text-yellow-300 font-semibold sm22:font-normal  sm2:text-ellipsis' }`}>{data.name}</p>
                     </div>
                  </NavLink> )
              )
          })
       }
    </div>
  )
}

export default Sidebae
