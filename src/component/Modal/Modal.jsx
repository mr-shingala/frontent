import React, { useEffect } from 'react'
import '../../page/style1.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { setFleg } from '../../slices/modalSlice'
import { FunctioId } from '../../utils/constnt';
import '../../page/style1.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import Cookies from 'js-cookie';
// import {setToken} from '../../slices/authSlice'
// import {setName,setId,setUser} from '../../slices/profileSlice'
import { useLogout } from '../../hooks/useLogout';
import { setdeleteSectionfleg } from '../../slices/courseSlice'
import Rating from '../CourseCerti/Rating';

const Modal = () => {
  // "Logged out! Take a break, refresh, and return whenever you're ready to continue your success story."

  const navigation = useNavigate()
  const fleg = useSelector((state) => state.modal.fleg)
  const id = useSelector((state) => state.modal.id)
  const modaldata = useSelector((state) => state.modal.modaldata)
  const IdDeleteSubSection = useSelector((state) => state.modal.IdDeleteSubSection)
  const { deleteSectionId,deleteSubsectionSectionId } = useSelector((state) => state.course)
  const logout = useLogout()
  const userid = useSelector((state) => state.profile.id)
  const token = useSelector((state) => state.auth.token)


  const dispatch = useDispatch()
  function terminate() {
    dispatch(setFleg(false))
  }

  // function taskPerfromLogOut() {
  //       // localStorage.clear();
  //       // Cookies.remove('token',{path:'/'})
  //       // dispatch(setUser(null))
  //       // dispatch(setId(null))
  //       // dispatch(setName(null))
  //       // dispatch(setToken(null))
  //       logout()

  // }

  async function taskPerfromDelete() {
    try {

      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}deleteAccount`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        method: "DELETE",
        credentials: 'include',
      })
      const data = await response.json()
      console.log("data", data)
      if (data.success) {
        toast(`✅ Delete account successfully`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: 'toast-success'
        });
        logout()

      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

    } catch (e) {
      console.log(error)
    }
  }


  async function taskPerfrom() {
    if (FunctioId[1] === id) {
    
      logout()
      dispatch(setFleg(false))
      navigation('/')
    }
    if (FunctioId[2] === id) {
      taskPerfromDelete()
      dispatch(setFleg(false))
      navigation('/')
    }
    if (FunctioId[3] === id) {
      console.log("course delete")
    }
    if (FunctioId[4] === id) {

      //console.log(deleteSectionId)
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}deleteSection/?sectionId=${deleteSectionId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          method: "DELETE",
          credentials: 'include'
        })
        const data = await response.json()
        if (data.success) {
          console.log("delete")
          dispatch(setdeleteSectionfleg(true))
          dispatch(setFleg(false))
        }
      }
      catch (e) {
        console.log(e)
      }
      // courseUpdate()
    }
    if (FunctioId[5] === id) {
      //console.log("delete sub section",IdDeleteSubSection)
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}deleteSunSection`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          method: "DELETE",
          credentials: 'include',
          body: JSON.stringify({
            subSectionId: IdDeleteSubSection,
            sectionId:deleteSubsectionSectionId
          })
        })
        const data = await response.json()
        if (data.success) {
          dispatch(setdeleteSectionfleg(true))
          dispatch(setFleg(false))
        }
      }
      catch (e) {
        console.log(e)
      }
      dispatch(setdeleteSubsectionSectionId(null))
      dispatch(setFleg(false))
      //  navigation('/')
    }
    if (FunctioId[6] === id) {
      navigation('/Login')
      terminate()
    }


  }

  return (
    <div className={`inset-0 h-screen sm2:min-h-[200vh] z-50  backdrop-blur-md absolute  items-center justify-center ${fleg ? 'flex' : 'hidden'}`}>
      <div className='bg-[#2C333F] border-4 border-gray-600     rounded-xl w-[500px] flex items-center justify-center flex-col max-w-[85%] p-6'>
        <img src={modaldata.icon} alt="icon" className='h-10 w-10' />
        <p className='mt-5 text-xl text-gray-300 font-bold text-center'>{modaldata.heading}</p>
        <p className='text-center mt-3 text-lg leading-tight text-gray-400'>
          {
            FunctioId[1] === id
            && <span>Take a <span className='gradient6 font-semibold'>break</span>, <span className='gradient5 font-semibold'>refresh</span>, and return whenever you're ready to continue your <span className='gradient6 font-semibold'>success story</span>.</span>
          }
          {FunctioId[2] === id && <>
            <span>the <span className='gradient6 font-semibold'>memories stay</span>. We’re <span className='gradient4 font-semibold' >grateful</span> for your <span className='gradient3 font-semibold'>time with us</span>. Feel free to reach out if you <span className='gradient5 font-semibold'>need anything!</span></span>
            <span className='text-red-500 font-bold text-sm pt-4 block'>Your account has been deleted, within 5 days</span></>
          }
          {
            FunctioId[3] === id && <span>Currently not add delete course functionality</span>
          }
          {
            FunctioId[4] === id || FunctioId[5] === id && <span>⚠️ Please note that this action cannot be redo.</span>
          }
          {
            FunctioId[6] === id && <span>Please Log In First</span>
          }
        </p>

        {
         
           FunctioId[7] === id && <Rating></Rating> 
        }

       { FunctioId[7] !== id && <div className='mt-8 flex-wrap  justify-center  flex  gap-7 items-center'>
          <button className='bg-yellow-400 border-2 border-yellow-200 py-2 px-4 rounded-lg font-semibold' onClick={taskPerfrom} >Confirm</button>
          <button className='bg-gray-950 py-2 px-4 border-2 border-gray-600 rounded-lg font-semibold text-gray-300' onClick={terminate} >Cancel</button>
        </div> }
      </div>
    </div>
  )
}

export default Modal
