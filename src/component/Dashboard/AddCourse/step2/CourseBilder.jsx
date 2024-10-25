import React, { useCallback, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import CourseButton from "../shareComponent/CourseButton";
import Nestedview from "../shareComponent/Nestedview";
import { useDispatch, useSelector } from "react-redux";
import { abcdArray } from "../../../../utils/constnt";
import { toast } from "react-toastify";
import { setCourse, setStep, setdeleteSectionId, setcourseId,setUpdate,setdeleteSectionfleg,setIsSubsectioncreating } from "../../../../slices/courseSlice";
import { FunctioId, DeleteCourse } from "../../../../utils/constnt";
import { setData, setId, setFleg } from '../../../../slices/modalSlice'
import SubSection from '../../../../component/Modal/SubSection';


const CourseBilder = () => {
  const { courseId, update, category, step, course, deleteSectionfleg } = useSelector(
    (state) => state.course
  );
  console.log(deleteSectionfleg);
  const [Loading, setLoading] = useState(false);
  const [Validation, setValiDation] = useState(null);
  const [Section, setSection] = useState('');
  const { token } = useSelector((state) => state.auth);
  const [subSectionModal, setSubSectionModal] = useState({data:null,condition:false,text:""});
  const [editSection, setEditSection] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);
  const [nextStep, setNextStep] = useState(false)

  
 
  const dispatch = useDispatch();

  useEffect(() => {
    setValiDation("");
  }, [Section]);

  useEffect(() => {
    setNextStep(false)
  }, [course]);


  async function createSubSection(e) {
    e.preventDefault();
    setLoading(true);
    //  console.log("step --> 2")
    if (Section.toString().replaceAll(" ", "") != "") {
      //  console.log("step --> 2.1")
      const letter = abcdArray.includes(Section.slice(0, 1));
      //console.log("step --> 2.2")
      if (letter) {
        // console.log("step --> 2.3")
        try {
          const response = await fetch(
            `${import.meta.env.REACT_APP_BASE_URL}createSection`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              method: "POST",
              credentials: "include",
              body: JSON.stringify({
                section: Section,
                courseId: course._id ? course._id : null,
              }),
            }
          );
          //console.log("step --> 2.4")
          const data = await response.json();
          //console.log("step --> 2.5")
          if (data.success) {
            toast(`✅ Section is created  successfull`, {
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
            // console.log(data.data)
            dispatch(setCourse(data.data));
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
          //console.log("step --> 2.6")
        } catch (e) {
          console.log(e.message);
        }
        setSection("");
      } else {
        setValiDation("Section name must be start with letters");
      }
    } else {
      //console.log("step --> 3")
      setValiDation("Section is not empty");
    }
    //console.log("step --> 4")
    setLoading(false);
    //console.log("---->",Loading)
  }

  async function editSectionName(e, data) {
    e.preventDefault();
    if (data._id === editSectionId) {
      //console.log(editSectionId,data._id,"false")
      setEditSection(false);
      setSection("");
      setEditSectionId(null);
    } else {
      //console.log(editSectionId,data._id,"trye")
      setEditSection(true);
      setSection(data.section);
      setEditSectionId(data._id);
    }
  }

  async function updateApicall(e) {
    //api call of edit
    //upadte in nested view
    e.preventDefault();
    if (Section.toString().replaceAll(" ", "") != "") {
      const letter = abcdArray.includes(Section.slice(0, 1));
      if (letter) {
        try {
          const response = await fetch(
            `${import.meta.env.REACT_APP_BASE_URL}updatedSection`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              method: "PUT",
              credentials: "include",
              body: JSON.stringify({
                section: Section,
                sectionId: editSectionId,
              }),
            }
          );
          const data = await response.json();
          if (data.success) {
            toast.success(`${data.message}`, {
              progress: undefined,
              position: "top-center",
            });

            //fech updated course from db
            await courseUpdate()
            setEditSection(false)

          } else {
            toast.error(`${data.message}`, {
              progress: undefined,
              position: "top-center",
            });
          }
        } catch (e) {
          console.log(e.message);
        }

        setSection("");
      } else {
        setValiDation("Section name must be start with letters");
      }
    } else {
      //console.log("step --> 3")
      setValiDation("Section is not empty");
    }




  }

  function Canceledit(e) {
    e.preventDefault();
    setEditSection(false);
    setSection("");
    setEditSectionId(null);
  }

  async function courseUpdate() {
    try {
      const updateCourse = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getParticularCourseDetails`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        includes: true,
        //conver js string into json string
        body: JSON.stringify({
          courseId: course._id ? course._id : null,
        })
      })
      const jsonresponse = await updateCourse.json()
      console.log(jsonresponse)
      if (jsonresponse.success) {
        dispatch(setCourse(jsonresponse.data))
        console.log(jsonresponse.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function deleteSection(e, data) {
    e.preventDefault()
    console.log(data)
    dispatch(setData({ icon: DeleteCourse, heading: "Delete Section!" }))
    dispatch(setId(FunctioId[4]))
    dispatch(setFleg(true))
    dispatch(setdeleteSectionId(data._id))
  }

  useEffect(() => {
    console.log(deleteSectionfleg)
    if (deleteSectionfleg) {
      courseUpdate()
      dispatch(setdeleteSectionfleg(false))
    }
  }, [deleteSectionfleg])

  function openSubSectionModal(e,data,text,id){
    setSubSectionModal({data:data,condition:true,text:text,clear:true})
    //text dynamic
  }
  
  function closeSubSectionModal(){
    setSubSectionModal({data:null,condition:false,text:''})
   
  }

  // console.log(Section)
  async function addSubsection(data,filedata,id){

    const form = new FormData()
    form.append('sectionID',id)
    form.append('timeDuration',data.duration)
    form.append('subSectionName',data.title)
    form.append('description',data.description)
    form.append('videoFile',filedata)


    const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}createSubSection`,{
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      includes: true,
      body:form
    })
    const jsonData = await response.json()
     if(jsonData.success){
      toast(`✅ successfully created subsection`, {
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
      courseUpdate()
      closeSubSectionModal()
     }else{
      toast.error(`Not created subsection`, {
        position: "top-center",
        hideProgressBar: true,
      });
     }
     dispatch(setIsSubsectioncreating(false))

  }

  async function updateSubsection(data,filedata,subSectionData){
    console.log(filedata,data.description,data.title,data.duration,subSectionData._id)
    
    const form = new FormData()
    form.append('subSectionId',subSectionData._id)
    form.append('timeDuration',data.duration)
    form.append('subSectionName',data.title)
    form.append('description',data.description)
    form.append('videoFile',filedata)

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}updateSubSection`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "PUT",
          credentials: "include",
          body:form
        }
      );
      const jsonData = await response.json();
     // console.log("update subsection data",data)

      if(jsonData.success){
        toast(`✅ Subsection update successfully`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          className: "toast-success",
        });
        courseUpdate()
        closeSubSectionModal()
       }else{
        toast.error(`Subsection not update successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });
       }
      

    } catch (e) {
      console.log(e.message);
    }
  }

  function goToNext(){
    //put validation user is not 
    console.log()
     if(course?.courseContent?.length > 0){
      dispatch(setStep(3))
     }else{
      setNextStep(true)
     }
     
  }

  function goToPrevious(){
    dispatch(setUpdate(true))
    console.log(course)
    const id = course._id
    console.log(id)
     dispatch(setcourseId(id))
     dispatch(setStep(1))
  }

  return (
    <div className="text-gray-400 py-6 px-6 bg-[#161D29] border-2 border-[#2C333F]">
      <p className="text-white font-bold text-2xl mb-7">Course Bilder</p>
      <form>
        <div className="flex flex-col">
          <label htmlFor="s1" className="mb-2">
            Section Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="s1"
            placeholder="Add a section to build your course"
            className="px-3 py-2 rounded-lg bg-gray-700"
            value={Section}
            onChange={(e) => setSection(e.target.value)}
          />
        </div>
        {Loading && (
          <p className="text-xl my-4 text-green-400">Creating Section...</p>
        )}
        {Validation && <p className="my-4 text-red-400">{Validation}</p>}
        {editSection ? (
          <div className="flex gap-3 items-baseline">
            <button
              onClick={(e) => updateApicall(e)}
              className="mt-7 flex items-center gap-3 px-2 py-1 rounded-md text-lg text-yellow-400 border-2 border-yellow-400"
            >
              Edit section
            </button>
            <button>
              <span
                onClick={(e) => Canceledit(e)}
                className="decoration-1 underline-offset-4 decoration-gray-400 decoration-solid underline"
              >
                cancel
              </span>
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => createSubSection(e)}
            disabled={Loading}
            className="mt-7 flex items-center gap-3 px-2 py-1 rounded-md text-lg text-yellow-400 border-2 border-yellow-400"
          >
            Create Section <IoMdAddCircleOutline />
          </button>
        )}
      </form>

      {/* section list components */}
      {
        <div className="bg-gray-700  rounded-md flex flex-col mt-7 text-gray-200">
          <Nestedview editSectionName={editSectionName} openSubSectionModal={openSubSectionModal} deleteSection={deleteSection}></Nestedview>
        </div>
      }

      <div className="flex gap-5 mt-9 justify-end">
        {/* <button className="">Back</button> */}
        <CourseButton
          text={"Back"}
          taskFunction={() => goToPrevious()}
          active={false}
        ></CourseButton>
        <CourseButton
          text={"Next"}
          taskFunction={() => goToNext()}
          icon={<GrFormNext />}
          active={true}
        ></CourseButton>
      </div>
       {nextStep && <p className="text-red-400 mt-4">Please create at least one section in the course before proceeding to the next step.</p>}
      <SubSection subSection={subSectionModal} updateSubsection={updateSubsection} addSubsection={addSubsection} setSubSectionModal={setSubSectionModal} closeSubSectionModal={closeSubSectionModal}></SubSection>
    </div>
  );
};

export default CourseBilder;
