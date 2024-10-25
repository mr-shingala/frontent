import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ProfileData } from './NavData'
import { NavLink } from 'react-router-dom';
import '/src/page/style1.css'
import { useDispatch } from 'react-redux';
import { setImage,setPD } from '../../slices/profileSlice';
import Modal from '../Modal/Modal';
import {setFleg,setId,setData} from '../../slices/modalSlice'
import {setTotalItems} from '../../slices/cartSlice'
import { FunctioId,Url } from '../../utils/constnt';
import { useSelector } from 'react-redux';

const ProfileMenu = () => {
  //logout logic (remove storage, update state)
  //click to close drop down
  const [img, setImg] = useState("https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722742331/profile_z3m6vj.png")
  //const [user,setUser] = useState([])
  const ref = useRef(null)
  const [isOpen,setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token);

  async function getProfilePicture() {
    const url = `${import.meta.env.REACT_APP_BASE_URL}getProfileImg`;
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        //conver js string into json string
        body: JSON.stringify({
          _id: localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id")) : null
        }),
        credentials: 'include' 
      });
      if (!response.ok) {
        throw new Error(`Response status: ${await response.json()}`);
      }

      const json = await response.json();
      console.log(json)
      setImg(json.img) 
      dispatch(setTotalItems(json.length))  
      dispatch(setImage(json.img))
      dispatch(setPD(json.user))

    } catch (e) {
      setImg("https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722742331/profile_z3m6vj.png")
      console.log(e.message);
   
    }
  }



  useEffect(() => {
    getProfilePicture()
  }, [])

    useEffect(()=>{
       document.body.addEventListener("click",()=>{
        setIsOpen(false)
      })
       return  () => document.body.removeEventListener("click",()=>{setIsOpen(false)})
    },[isOpen])

     
     function logout(){
       dispatch(setFleg(true))
       dispatch(setId(FunctioId[1]))
       dispatch(setData({icon:Url,heading:"Logged out!"}))
     }


     function openDropDown(e){
      //console.log(e);
     /*  used this ,method because clike button flag is true then letter event go(propogate) to parent 
       it means executed body.addEventListener and flag is false so not open drop down so avoid this we 
       used e.stop..() method */
      e.stopPropagation()
       setIsOpen(!isOpen)
    }

  return (
    <div>
      <div ref={ref} id="b1" className='relative flex items-end text-base text-white lg:items-start' onClick={openDropDown} >
        <img src={`${img?img:"assets/Aboutus/user.jpg"}`} alt="user" className='h-12 w-12 rounded-full lg:rounded-md' />
        <IoIosArrowDropdownCircle className='ml-[-10px] text-2xl' />
        {
          isOpen && (   <div className='absolute lg:static  p-1 min-w-[200px]  h-[auto] bg-[#25292f]  top-[60px] z-[70] right-0'>
            {
              ProfileData.map((data, index) => {
                return (
                  (data.tag === "Logout")
                    ?
                    <div key={index} onClick={logout} className='flex parent cursor-pointer w-[auto] hover:bg-slate-950 transition  gap-4 p-2 items-center border-b-2  border-gray-600 m-2 text-white '>
                      <img src={`${data.img}`} className='h-5 w-5 child ' alt="icon" />
                      <p className='child2'>{data.tag}</p>
                    </div>
                    :
                    <NavLink key={index} to={`${data.nav}`}>
                      <div className='flex parent w-[auto] hover:bg-slate-950 transition  gap-4 p-2 items-center border-b-2  border-gray-600 m-2 text-white '>
                        <img src={`${data.img}`} className='h-5 w-5 child ' alt="icon" />
                        <p className='child2'>{data.tag}</p>
                      </div>
                    </NavLink>
                )
              })
            }
          </div>)
        }
     
      </div>
    </div>
  )
}

export default ProfileMenu
