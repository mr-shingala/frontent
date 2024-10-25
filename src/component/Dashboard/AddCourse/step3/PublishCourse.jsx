import React from 'react'
import '../../../../page/style1.css'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { setStep, setCourse, setUpdate, setcourseId , setdeleteSectionfleg,setdeleteSectionId} from '../../../../slices/courseSlice'

const PublishCourse = () => {

  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token);
  const { courseId, update, category, step, course, deleteSectionfleg } = useSelector(
    (state) => state.course
  );
  const dispatchhook = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(course)

  function clearProcess() {
    dispatchhook(setStep(1))
    dispatchhook(setCourse([]))
    dispatchhook(setUpdate(false))
    dispatchhook(setcourseId(null))
    dispatchhook(setdeleteSectionId(null))
    dispatchhook(setdeleteSectionfleg(false))
  }



  const dispatch = useDispatch();

  async function onSubmit(data) {

    if (data.checkbox) {
      //  setLoading(true)

      const formdata = new FormData();
      formdata.append("status", 'Published');
      formdata.append("courseId", course._id);

      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_BASE_URL}updateCourse`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            method: "PUT",
            credentials: "include",
            body: formdata,
          }
        );
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          toast(` Course Published successfully`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "toast-success",
          });

          console.log("hii this is clean step")
          clearProcess()
          navigate("/dashboard/My Courses")

        } else {
          toast.error(`${jsonResponse.message}`, {
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
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.info("please check the checkBox", {
        hideProgressBar: true,
        position: "top-center",
      })
    }


  }

  function redirect(e) {
    e.preventDefault()
    clearProcess()
    navigate("/dashboard/My Courses")
  }

  function redirectDashBoard(e) {
    e.preventDefault()
    clearProcess()
    navigate("/dashboard/")
  }

  function goToPrevious(e) {
    e.preventDefault()
    dispatch(setUpdate(true))
    const id = course._id
    console.log(id)
    dispatch(setcourseId(id))
    dispatch(setStep(2))
  }

  return (
    <div>
      <div className='text-gray-400 py-6 px-6 bg-[#161D29] border-2 border-[#2C333F]'>
        <p className='text-[#F1F2FF] text-3xl font-semibold mb-4'>Publish Settings</p>
        {
          course.status !== "Published" && <form className='mt-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex items-center gap-3 step3'>
              <input  {...register("checkbox", {})} type="checkbox" id="i1" className='h-7 w-7' />
              <label htmlFor="i1" className='text-lg'>Make this Course Public</label>
            </div>
            <p className='text-red-400 mt-4'>&#x26A0; Once a course is published, it cannot be reverted to 'draft' status.</p>
            <input type='submit' className='bg-[#FFD60A] mt-6 py-2 border-2 border-yellow-200 rounded-md text-gray-950 px-5 font-semibold' value="Save and Publish" />
          </form>
        }

        {
          course.status === "Published" && <p className='text-xl text-green-500'>Course has already been published.</p>
        }


      </div>
      <div className='flex justify-between mt-5'>
        <button onClick={(e) => goToPrevious(e)} className='bg-[#161D29] rounded-md font-semibold px-5 border-2 border-[#2C333F] py-2'>Back</button>
        <div className='gap-5 flex'>
          {course.status !== "Published" && <button disabled={isSubmitting} onClick={(e) => redirect(e)} className='bg-[#161D29] border-2 border-[#2C333F] rounded-md font-semibold px-5'>Save as a Draft</button>}
          {course.status === "Published" && <button disabled={isSubmitting} onClick={(e) => redirectDashBoard(e)} className='bg-[#161D29] border-2 border-[#2C333F] rounded-md font-semibold px-5'>Go To Dashboard</button>}
        </div>
      </div>
    </div>
  )
}

export default PublishCourse
