import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Line, Circle } from 'rc-progress';
import { toast } from 'react-toastify';
import { RiMenuFold2Line } from "react-icons/ri";
import CourseProgess from '../component/CourseCerti/CourseProgess';
import { RiMenuUnfold2Line } from "react-icons/ri";
import { PiCertificate, PiTrendUp } from "react-icons/pi";
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FunctioId,RatingIconUrl } from '../utils/constnt';
import {setFleg,setId,setData} from '../slices/modalSlice'
import '../page/style1.css'
import { setcurrentSubSectionUrl, setcurrentSubSectionData, setisFirstVideOfCourse, setcurrentSubSectionIndex, setcurrentSectionIndex, setcurrentSectionLen } from '../slices/sectionSlide'

const LerningCourse = () => {

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token)
  const videoUrl = useSelector(((state) => state.section.currentSubSectionUrl))

  const { currentSubSectionData, isLastVideoOfCourse, isFirstVideOfCourse, currentSectionLen, currentSectionIndex, currentSubSectionIndex } = useSelector(((state) => state.section))
  const [prvb, setprb] = useState(true)
  const [netb, setnetb] = useState(true)
  const [Subsectiondata, setSubsectiondata] = useState(null)
  const [videoUrlData, setVideoUrl] = useState("")
  const [inside, setInside] = useState(false)
  const navigate = useNavigate()
  const url = useLocation()
  const courseId = url.pathname.split("/").at(-1)
  const [button, setButton] = useState(false)
  const [total_ans, setTotal_ans] = useState(0)
  const [total_lec, setTotal_lec] = useState(0)
  const [com_lec, setCom_lec] = useState(0)
  const [total_comlec_id , setTotal_comlec_id] = useState([])
  const Dispatch = useDispatch()

  // console.log(videoUrlData)

  useEffect(() => {
    setButton(false)
    console.log("this is video section", videoUrl)
    setVideoUrl(videoUrl)
    setSubsectiondata(currentSubSectionData)
    console.log(isLastVideoOfCourse, isFirstVideOfCourse)
    if (isFirstVideOfCourse) {
      setprb(false)
    } else {
      setprb(true)
    }
    if (isLastVideoOfCourse) {
      setnetb(false)
    } else {
      setnetb(true)
    }


  }, [videoUrl])

  function isVideoEnd() {
    console.log("video is end")
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setButton(true)
    //next
    //maek as complated
    //reWach
  }


  useEffect(() => {

    const fetchCourseContent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getCourseContent`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Assuming token is stored in localStorage
          },
          body: JSON.stringify({ cid: courseId }),
        });

        const data = await response.json();

        if (data.success) {
          setCourse(data.course);
          setTotal_ans(data?.course?.at(0).total_ans)
          setTotal_comlec_id(data?.course?.at(0).com_id)
          setCom_lec(data?.course?.at(0).comp_lecture)
          setTotal_lec(data?.course?.at(0).totalLecture)
          console.log(data.course?.at(1)?.courseContent[0]?.subsection[0]?.videoUrl?.url)
          Dispatch(setcurrentSubSectionUrl(data.course?.at(1)?.courseContent[0]?.subsection[0]?.videoUrl?.url))
          Dispatch(setcurrentSubSectionData(data.course?.at(1)?.courseContent[0]?.subsection[0]))
          Dispatch(setisFirstVideOfCourse(true))
          Dispatch(setcurrentSubSectionIndex(0))
          Dispatch(setcurrentSectionIndex(0))
          //    console.log(data.course?.at(1)?.courseContent[0]?.subsection?.length)
          Dispatch(setcurrentSectionLen(data.course?.at(1)?.courseContent[0]?.subsection?.length))

        } else {
          toast.error('Failed to load course content', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      } catch (error) {
        toast.error('Error fetching course content', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, []);

  const playerRef = useRef(null);

  const handleRewatch = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0); // Restart the video
      setButton(false); // Hide the button after rewatching starts
    }
  };

  function hadleNext() {

    let nextSubSectio = currentSubSectionIndex + 1
    if (nextSubSectio < currentSectionLen) {
      console.log("current section -> ", currentSectionIndex, "current video is ", nextSubSectio)
      Dispatch(setcurrentSubSectionIndex(nextSubSectio))
      Dispatch(setcurrentSectionIndex(currentSectionIndex))
    }
    else {
      let currentSection = currentSectionIndex + 1
      console.log(course?.at(1)?.courseContent.length)
      if (currentSection < course?.at(1)?.courseContent.length) {
        console.log("new section -> ", currentSection, "current video is ", 0)
        Dispatch(setcurrentSubSectionIndex(0))
        Dispatch(setcurrentSectionIndex(currentSection))
        Dispatch(setcurrentSectionLen(course?.at(1)?.courseContent[currentSection]?.subsection?.length))
      } else {
        console.log("not updated")
      }
    }
  }
  function handelPrevious() {
    let prevSubSectio = currentSubSectionIndex - 1
    if (prevSubSectio > -1) {
      console.log("current section -> ", currentSectionIndex, "current video is ", prevSubSectio)
      Dispatch(setcurrentSubSectionIndex(prevSubSectio))
      Dispatch(setcurrentSectionIndex(currentSectionIndex))
    }
    else {
      let currentSection = currentSectionIndex - 1
      if (currentSection > -1) {
        console.log("new section -> ", currentSection, "current video is ", course?.at(1)?.courseContent[currentSection]?.subsection?.length - 1)
        Dispatch(setcurrentSubSectionIndex(course?.at(1)?.courseContent[currentSection]?.subsection?.length - 1))
        Dispatch(setcurrentSectionIndex(currentSection))
        Dispatch(setcurrentSectionLen(course?.at(1)?.courseContent[currentSection]?.subsection?.length))
      } else {
        console.log("not updated")
      }
    }
  }

  async function handelMarkComplated(subsectionId) {

    
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}updateCoureProgress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token in Authorization header
        },
        credentials: 'include',
        body: JSON.stringify({
          cid: courseId,
          subsectionId: subsectionId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Course progress updated successfully!", {
          position: "top-center",  // Toast position at top-center
          autoClose: 3000,         // Auto-close after 3 seconds
          hideProgressBar: true,  // Show progress bar
        });
        console.log(data.data)
        if(data.data){
          setTotal_ans(data.data.total_ans)
          setCom_lec(data.data.comp_lecture)
          setTotal_lec(data.data.totalLecture)
          console.log("", data.data.com_id)
          setTotal_comlec_id(data.data.com_id)
        }
        hadleNext() 
      } else {
        toast.error("Failed to update course progress.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  }

  const getCertificate = async () => {
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getCertificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use your JWT token here
        },
        credentials: 'include', // Include cookies if needed for authentication
        body: JSON.stringify({
          cid: courseId // Replace with your actual course ID
        }),
      });
  
      // Check if the response status is OK
      if (!response.ok) {
        // If the response is not OK, read the error as JSON
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to download certificate.');
      }
  
      // If the response is OK, fetch the binary data (blob)
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary <a> element for triggering the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate.pdf`; // You can customize the file name
  
      // Append the anchor to the body, trigger download, then remove it
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      // Revoke the object URL after download to free up memory
      window.URL.revokeObjectURL(url);
  
      // Show success message
      toast.success('Certificate is downloading!', { position: 'top-center', hideProgressBar: true });
  
    } catch (e) {
      // Handle errors gracefully and show a message
      toast.error(e.message || 'Something went wrong. Please try again.', { position: 'top-center', hideProgressBar: true });
      console.error('Error:', e.message);
    }
  };
  

  function handelreview(){
    Dispatch(setFleg(true))
    Dispatch(setId(FunctioId[7]))
    Dispatch(setData({icon:RatingIconUrl,heading:"Rating and review"}))
  }



  return (
    <div className=''>
      <div className='bg-slate-950 h-[calc(100vh-64px)] 2xl2:h-auto relative flex border-t-4 border-gray-600 overflow-x-hidden my-scrollable-div 2xl2:flex-col'>
        <div className={`bg-[#2C333F]  text-white   border-r-4 border-gray-600 transition-all duration-300 ease-in-out  ${inside ? 'w-0 2xl2:h-0 2xl2:w-[100%] 2xl2:pb-0 ' : 'w-96 2xl2:w-[100%] 2xl2:min-h-full'} 2xl2:pb-5 overflow-y-scroll my-scrollable-div`}>
          <div className={`flex items-center justify-between p-3 text-gray-300 ${inside && 'hidden'}`}>
            <button className='p-3 bg-gray-950 border-2 border-gray-600 rounded-full' onClick={() => navigate('/dashboard/Enroll%20Courses')}>
              <FaArrowLeft />
            </button>
            <button className='text-4xl text-gray-400' onClick={handelreview}>
              <MdOutlineRateReview />
            </button>
          </div>
          {/* progress bar data */}
          <div className={`px-3 mt-4 ${inside && 'hidden'}`}>
            <div className='flex justify-between items-center'>
              <p>progress {total_ans}%</p>
              <p>{com_lec}/{total_lec}</p>
            </div>
            <Line percent={total_ans} strokeWidth={4} strokeColor="#2db7f5" className='mx-auto mt-2 2xl2:hidden md:block' trailColor={"#000814"} gapDegree={-360} trailWidth={4} />
            <Line percent={total_ans} strokeWidth={2} strokeColor="#2db7f5" className='mx-auto mt-2 2xl2:block md:hidden hidden' trailColor={"#000814"} gapDegree={-360} trailWidth={2} />
          </div>

          {/* course path */}
          <div className={`px-0 `}>
            <CourseProgess data={course?.at(1)?.courseContent} comlecid={total_comlec_id}></CourseProgess>
          </div>

          {/* certificate path */}
          <div className={`${inside && 'hidden'} px-3 w-[100%] font-semibold  cursor-pointer bottom-0 py-2 flex justify-center items-center gap-2 bg-gray-900`} onClick={getCertificate}>
            <PiCertificate className='text-3xl text-yellow-200' />
            <p className='text-2xl'>Certificate</p>
          </div>

        </div>
        <div className='mx-auto overflow-y-auto overflow-x-hidden w-[100vw] px-4 py-4 md:px-0 text-white 2xl2:h-screen'>
          {
            loading && <p className='p-5 text-4xl text-yellow-400 md:text-2xl sm2:text-base'>Loading...</p>
          }
          <div className='flex tems-center justify-between gap-2 px-3 py-2 md:px-4  lg1:flex-col lg1:gap-5  max-w-[1400px]'>
            <div className='flex items-center justify-center gap-3  lg1:justify-start'>
              <div>
              {
                inside ? <RiMenuUnfold2Line className='font-bold text-3xl cursor-pointer text-gray-400' onClick={() => setInside(!inside)} /> : <RiMenuFold2Line className='font-bold text-3xl cursor-pointer text-gray-400' onClick={() => setInside(!inside)} />
              }
              </div>
              <p className='text-gray-300 font-bold text-2xl sm:text-xl'>{course?.at(1)?.title}</p>
            </div>
            <div className='flex gap-5 text-lg font-semibold mr-3 sm2:flex-col'>
              {
                prvb && <button className='flex gap-1 items-center justify-center sm2:w-[100%] sm2:text-yellow-400' onClick={handelPrevious}><FaChevronLeft /> Previous</button>
              }
              {
                netb && <button className='flex gap-1 px-3 py-1 items-center justify-center sm2:w-[100%] rounded-md text-gray-900 bg-yellow-400' onClick={hadleNext}>Next <FaChevronRight /> </button>
              }

            </div>
          </div>
          {/* <Outlet></Outlet> */}
          <div className="mx-3 mt-7 relative w-[1080px] h-[600px] 2xl2:hidden block">
            <ReactPlayer url={`${videoUrlData}`} className='relative focus:outline-0 border-gray-900 border-4 2xl2:hidden' ref={playerRef} controls={true} width={1080} volume={1} height={600} loop={false} onEnded={() => isVideoEnd()} onPlay={() => setButton(false)} />
            {
              button && <div className='flex gap-4 absolute top-[46%] left-[40%]'>
                <button className='flex gap-1 px-3 py-2 font-semibold  items-center justify-center rounded-md text-gray-900 bg-yellow-400' onClick={handleRewatch}>Rewach</button>
                <button className='flex gap-1 px-3 py-2 font-semibold items-center justify-center rounded-md text-gray-900 bg-yellow-400' onClick={() => handelMarkComplated(Subsectiondata?._id)}>Mark as complated</button>
              </div>
            }
          </div>

           <div className="mx-3 mt-7  relative 2xl2:mx-0 2xl2:block hidden">
            <ReactPlayer url={`${videoUrlData}`} className='' ref={playerRef} controls={true} width="100%" height="100%" volume={1}  loop={false} onEnded={() => isVideoEnd()} onPlay={() => setButton(false)} />

            {
             button && <div className='flex gap-4 md:static md:my-10 md:w-[40%] md:mx-auto sm1:w-[90%] absolute top-[46%] left-[40%] md:flex-col'>
                <button className='flex gap-1 px-3 py-2 font-semibold  items-center justify-center rounded-md text-gray-900 bg-yellow-400' onClick={handleRewatch}>Rewach</button>
                <button className='flex gap-1 px-3 py-2 font-semibold items-center justify-center rounded-md text-gray-900 bg-yellow-400' onClick={() => handelMarkComplated(Subsectiondata?._id)}>Mark as complated</button>
              </div>
            }
          </div>

          <div className=' mt-4 px-3'>
            <p className='text-2xl pb-2 text-gray-300 sm:text-xl'>{Subsectiondata?.subSectionName}</p>
            <p className='text-base text-gray-300 pb-1'>{Subsectiondata?.description}</p>
            <p className='text-gray-400 pb-1'>Duration :- {Subsectiondata?.timeDuration}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LerningCourse
