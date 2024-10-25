import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebae from '../component/Dashboard/Sidebae'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { MdMenu } from "react-icons/md";

const Deshboard = () => {

  const location = useLocation()
  const path = location.pathname.split("/").at(-1).replaceAll("%20", " ")
  const logout = useLogout()
  const navigation = useNavigate()

  useEffect(() => {
    console.log("when cookies or anty data from local strorage not found perfrom logout")
    const cookies = Cookies.get('token', { path: '/' })
    const id = localStorage.getItem("id");
    const Name = localStorage.getItem("Name");
    const AccountType = localStorage.getItem("AccountType");
    const token = localStorage.getItem("token");

    console.log(cookies,id,Name,AccountType,token)
    if (!cookies || !id || !Name || !AccountType || !token) {
  // console.log(cookies,id,Name,AccountType,token)
      logout()
      navigation('/')
    }

  }, [])

  const [sidebar, setSidebar] = useState(false)

  function showSideBar() {
    setSidebar(!sidebar)
  }

  function stopclick(e){
     e.stopPropagation()
  }

  return (
    <div className={`bg-slate-950  min-h-[calc(100vh-64px)] relative flex border-t-4 mx-auto border-gray-600 overflow-x-hidden`}>
      <div className={`bg-[#2C333F]  border-r-4 border-gray-600 ${!sidebar ? 'lg1:hidden' : 'lg1:block'} `}>
        <Sidebae></Sidebae>
      </div>
      <div className={`mx-auto overflow-y-auto overflow-x-hidden w-[100vw] px-4 py-4 `}>
        <MdMenu onClick={showSideBar} className={`text-gray-300 cursor-pointer text-4xl my-4 bg-gray-600 p-2 rounded-md hidden lg1:block ${!sidebar ? 'static' : 'absolute z-20 '} `} />
        <div className={`relative ${sidebar ? 'lg1:blur-xl' : 'lg1:blur-0'} `}>
             <p className='text-gray-400 font-bold text-lg sm2:text-base'>Home / Dashboard / {path} </p>
             <Outlet></Outlet>
            <div className={` ${!sidebar ? 'static h-0 w-0' : 'lg1:absolute lg1:h-full lg1:w-full lg1:top-0 '} `} onClick={(e)=> stopclick(e)}></div>
        </div>
      </div>
    </div>
  )
}

export default Deshboard
