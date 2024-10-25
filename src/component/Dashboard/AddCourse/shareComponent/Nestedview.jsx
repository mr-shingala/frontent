import React, { useEffect } from 'react'
import { RxDropdownMenu } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RiAddLargeFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { FunctioId,DeleteCourse } from '../../../../utils/constnt';
import {setdeleteSubsectionSectionId} from '../../../../slices/courseSlice'
// import { setSubsectionData,setSubSectionFleg } from '../../../slices/modalSlice'
import {setFleg,setId,setData,setIdDeleteSubSection} from '../../../../slices/modalSlice'

const Nestedview = ({editSectionName,deleteSection,openSubSectionModal}) => {
  const {courseId,update,category,step,course} = useSelector((state)=>state.course)
  const dispatch = useDispatch()
  //console.log(course?.courseContent[0]?.subsection[0])
  // useEffect(()=>{
  //     console.log("this is course data",course)
  // },[])

  function commonModalOpen(id,data){

    console.log("this .data",data)
    dispatch(setFleg(true))
    dispatch(setId(FunctioId[5]))
    dispatch(setData({icon:DeleteCourse,heading:"Delete Subsection!"}))
    dispatch(setIdDeleteSubSection(id))
    dispatch(setdeleteSubsectionSectionId(data))
  }
  
  

  return (

    <div className={`${ course && course.courseContent && course.courseContent.length > 0 && 'p-4'}`}>
              {
                course && course.courseContent && course.courseContent.length > 0 &&
                 course.courseContent.map((datap,index)=>{
                    return (
                  <details key={index}>
                  <summary className="border-b-2 py-2 px-2 border-gray-500 flex justify-between">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <RxDropdownMenu className="text-2xl" />{datap.section}
                    </div>
                    <div className="flex text-2xl items-center gap-3">
                      <button onClick={(e) => {editSectionName(e,datap)}}>
                        <MdOutlineEdit />
                      </button>
                      <button onClick={(e) => {deleteSection(e,datap)}}>
                        <MdDelete />
                      </button>
                    </div>
                  </summary>

                  <div>
                      {
                        course?.courseContent[index]?.subsection.map((data,index) => {
                            return (
                              <div
                              key={index}
                              className="mt-3 flex items-center justify-between py-2 border-b-2 border-gray-500 w-[90%] px-3 mx-auto"
                            >
                              <p className={`flex items-center gap-1 cursor-pointer`} onClick={(e) => openSubSectionModal(e,data,'View SubSection')}>
                                <IoIosArrowForward  className="font-extrabold text-xl" /> {data.subSectionName}
                              </p>
                              <div className="flex text-2xl items-center gap-3">
                                <button onClick={(e) => openSubSectionModal(e,data,'Edit SubSection')}>
                                  <MdOutlineEdit />
                                </button>
                                <button onClick={() => commonModalOpen(data._id,datap._id)}>
                                  <MdDelete />
                                </button>
                              </div>
                            </div>
                            )
                        })
                      }
                  </div>            
                  <div className="w-[90%] mx-auto mt-3 px-3">
                    <button className="text-yellow-400 font-bold gap-1 flex items-center" onClick={(e) => openSubSectionModal(e,datap,'Add SubSection')}>
                      <RiAddLargeFill className="font-extrabold text-xl" /> Add Lecture
                    </button>
                  </div>
                </details>
                )
               })
              }
    </div>
  )
}

export default Nestedview
