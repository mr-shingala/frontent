import React, { useState, useEffect } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { PiVideoDuotone } from "react-icons/pi";
import { setcurrentSubSectionUrl, setcurrentSubSectionData, setisLastVideoOfCourse, setisFirstVideOfCourse, setcurrentSubSectionIndex, setcurrentSectionIndex, setcurrentSectionLen } from '../../slices/sectionSlide'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const CourseProgess = ({ data,comlecid }) => {
  console.log("this is data",comlecid)
  const [clickSection, setClickSection] = useState(false)
  const [currentClick, setCurrentClick] = useState("")
  const [clickSubsection, setClickSubsection] = useState(false)
  const [currentSubSectiobId, setSubsectionId] = useState("")
  const dispatch = useDispatch()
  const { currentSubSectionData, isLastVideoOfCourse, isFirstVideOfCourse, currentSectionLen, currentSectionIndex, currentSubSectionIndex } = useSelector(((state) => state.section))

  console.log("data :- ", data)

  useEffect(() => {
    console.log(currentSectionLen, currentSectionIndex, currentSubSectionIndex)

    if(data){
      dispatch(setisFirstVideOfCourse(false))
      dispatch(setisLastVideoOfCourse(false))

      if (currentSectionIndex == 0 && currentSubSectionIndex == 0) {
        dispatch(setisFirstVideOfCourse(true))
      }
      if (data.length - 1 == currentSectionIndex && currentSubSectionIndex === currentSectionLen - 1) {
        dispatch(setisLastVideoOfCourse(true))
      }

      setClickSubsection(true)
      setClickSection(true)
      setCurrentClick(data[currentSectionIndex]?._id)
      console.log(data[currentSectionIndex])
      setSubsectionId(data[currentSectionIndex]?.subsection[currentSubSectionIndex]?._id)
      dispatch(setcurrentSubSectionUrl(data[currentSectionIndex]?.subsection[currentSubSectionIndex]?.videoUrl?.url))
      dispatch(setcurrentSubSectionData(data[currentSectionIndex]?.subsection[currentSubSectionIndex]))

    }


  }, [currentSectionLen, currentSectionIndex, currentSubSectionIndex])

  useEffect(()=>{
     if(data){
      setClickSection(true)
      setCurrentClick(data[0]?._id)
     }
  },[data])


  function clickSectionName(id) {
    if (currentClick != id) {
      setClickSection(true)
      setCurrentClick(id)
    } else {
      setClickSection(false)
      setCurrentClick("")
    }

    // setCurrentClick(id)
  }

  function clickOnSubsection(id, url, subsectiondata, pindex, cindex, len) {
    // console.log(pindex,cindex,len-1)
    dispatch(setisFirstVideOfCourse(false))
    dispatch(setisLastVideoOfCourse(false))

    if (pindex == 0 && cindex == 0) {
      // console.log("this is first video of course")
      dispatch(setisFirstVideOfCourse(true))
    }
    if (cindex === len - 1) {
      console.log("this is last video of this section")
    }
    if (data.length - 1 == pindex && cindex === len - 1) {
      //   console.log("this is last video of this course")
      dispatch(setisLastVideoOfCourse(true))
    }

    if (clickSubsection != id) {
      setClickSubsection(true)
      setSubsectionId(id)
      // console.log(data)
      dispatch(setcurrentSubSectionUrl(url))
      dispatch(setcurrentSubSectionData(subsectiondata))
      dispatch(setcurrentSectionLen(len))
      dispatch(setcurrentSectionIndex(pindex))
      dispatch(setcurrentSubSectionIndex(cindex))
    } else {
      setClickSubsection(false)
      setSubsectionId("")
    }
  }

  



  return (
    <div className='mt-8 mb-8'>
      {
        data?.map((section, pindex) => {
          return (
            <div key={pindex} className='mt-2'>
              <div className='px-3 py-2 bg-gray-900 text-gray-300 flex justify-between items-center cursor-pointer' onClick={() => clickSectionName(section._id)}>
                <p className='w-[85%] text-ellipsis line-clamp-1'>{section.section}</p>
                <FaChevronDown className={`${clickSection && section._id == currentClick ? 'rotate-180' : 'rotate-0'} transition-all duration-300	 ease-in-out`} />
              </div>
              {/* this is sub section */}
              <div className={`py-2 bg-gray-800 text-gray-400 pl-6 pr-3 cursor-default transition-all duration-200 ease-in-out ${clickSection && section._id == currentClick ? 'h-auto block' : 'h-0 hidden'}`}>
                {
                  section.subsection.map((subsection, index) => {
                    return (
                      <div className={`${clickSubsection && subsection._id == currentSubSectiobId || index == 0 && pindex == 0 && !clickSubsection ? 'text-yellow-300' : 'text-gray-400'} flex items-start cursor-pointer my-4 gap-2`} onClick={() => clickOnSubsection(subsection._id, subsection?.videoUrl?.url, subsection, pindex, index, section.subsection.length)}>
                        <div  className=' pt-1 text-2xl'>
                        {
                            comlecid.includes(subsection._id) ? <IoCheckmarkDoneCircle className='text-green-400' /> :  <PiVideoDuotone   />
                        }
                        </div>
                        <p key={index} className='flex  w-[88%]' >{subsection.subSectionName}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default CourseProgess
