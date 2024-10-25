import React, { useEffect, useState, useCallback } from "react";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { allowedTypes } from "../../../utils/constnt";
import { getImageDimensions } from "../../../hooks/useImgDimension";
import { toast } from "react-toastify";
import { setStep,setUpdate,setcourseId ,setCourse} from "../../../slices/courseSlice";
import { ImCancelCircle } from "react-icons/im";

const CourseInfo = () => {
  const [tags, SetTag] = useState([]);
  const [req, Setred] = useState([]);
  const [lern, setLern] = useState([]);
  const [dataUrl, setDataUrl] = useState(null);
  const category = useSelector((state) => state.course.category);
  const [fleg, setFleg] = useState(false);
  const [id, setId] = useState(0);
  const [file, setFile] = useState(null);
  const [FileValidation, setFileValidtion] = useState("");
  const [successFileUpload, setsuccessFileUpload] = useState("");
  const token = useSelector((state) => state.auth.token);
  const courseid = useSelector((state) => state.course.courseId)
  const isUpdate = useSelector((state) => state.course.update)
  const [oldData, setOldData] = useState([])
  const [loading, setLoading] = useState(false)
  // console.log(isUpdate, courseid)
  const dispatch = useDispatch()

  async function oldDataCall() {
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getParticularCourseDetails`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          courseId: courseid
        }),
      })
      const data = await response.json()
       console.log(data)
      if (data.success) {
        setOldData(data.data)
        // console.log(data.data)
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {

    if (isUpdate === true && courseid !== null) {
      console.log(courseid)
      setLoading(true)
      oldDataCall()
    }
    setLoading(false)

  }, [isUpdate, courseid])

  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (lern.length > 0 || req.length > 0 || tags.length > 0) {
      setFleg(false);
      setId(0);
    }
    if (dataUrl != null) {
      setFileValidtion("");
    }
  }, [lern, req, tags, dataUrl]);

  


  const onSubmit = async (data) => {
    // console.log(data);

    if (tags <= 0 && isUpdate !== true && courseid === null) {
      setFleg(true);
      setId(3);
      return null;
    }

    if (req <= 0 && isUpdate !== true && courseid === null) {
      setFleg(true);
      setId(2);
      return null;
    }

    if (lern <= 0 && isUpdate !== true && courseid === null) {
      setFleg(true);
      setId(1);
      return null;
    }

    if (!file && isUpdate !== true && courseid === null) {
      return setFileValidtion("Uplaod file");
    }

    if (dataUrl && !file && isUpdate === true && courseid !== null) {
      return setFileValidtion("Uplaod file");
    }

    const includeArray = [
      data.resources && "⬇️ Include downloadable resources",
      data.exercises && "📄 Include coding exercises",
      data.Certificate && "📜 Certificate of completion",
      data.Articals && "📋 Include Articals",
      data.AccessDuration && "🕒 Full lifetime access",
      data.AccessDevice && "📱📺 Access on mobile and TV",
    ];

    const filetarray = includeArray.filter((data) => data !== false)
    //api call and submit the  data
    const formdata = new FormData();
    formdata.append("thumbnail", file);
    formdata.append("title", data.title);
    formdata.append("shortDesciption", data.shortDesciption);
    formdata.append("description", data.description);
    formdata.append("price", data.price);
    formdata.append("category", data.category);
    formdata.append("tag", tags);
    formdata.append("Benefits", data.Benefits);
    formdata.append("Requirements", req);
    formdata.append("language", data.Language);
    formdata.append("whatYouLern", lern);
    formdata.append("courseIncluded", filetarray);
    formdata.append("status", 'Draft');
    formdata.append("totalDuration", `${data.totaldurationH}h ${data.totaldurationM}m`);

     //call api when user update course
    if (isUpdate === true && courseid !== null) {
      console.log(data.category,data.Language)
      //   console.log('file -->',!file,'array --->', 'filter array --->', filetarray.length === 0,'lern length --->',lern.length == 0, 'data.Language --->', data.Language === "",'req.length --->' ,req.length == 0,'data.Benefits, --->', data.Benefits, 'tags.length--->',tags.length == 0, 'data.price --->',data.price, 'data.description-->',data.description, 'data.shortdescription-->',data.shortDesciption,'data.title-->',data.title)
      if(!file && filetarray.length === 0 && lern.length == 0 &&  req.length == 0 && !data.Benefits && tags.length == 0 && !data.price && !data.totalDurationH && !data.totaldurationM  && !data.description && !data.shortDesciption && !data.title && !data.category && !data.Language ){

        return toast.error(('not found any changes'),{
          progress: undefined,
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        })
      }
      //add two courseid and old tag name
       formdata.append("courseId",oldData._id)
      //  console.log(formdata.has('category'))
       if(formdata.has('category')){
        formdata.append("Oldcategory",oldData.category)
        //FormData.getAll()
       // console.log(formdata.has('Oldcategory'),)
       }


      //  setLoading(true)
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
          toast(`✅ Course Information is update successfull`, {
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
          
           //update course
           await oldDataCall()
           dispatch(setStep(2))
           dispatch(setCourse(oldData))
       

        } else {
          toast.error(`${jsonResponse.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
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
    }

    //call api when user create course First time
    if (isUpdate == false && courseid == null) {

      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_BASE_URL}createCourse`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            method: "POST",
            credentials: "include",
            body: formdata,
          }
        );
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          toast(`✅ Course Information is save successfull`, {
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

          toast.info('Course is Add in your pofile', {
            position: "top-center",
          })
  
          dispatch(setCourse(jsonResponse.course))
          dispatch(setStep(2))

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
      } finally {
      }
    }

  };

  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        setDataUrl(binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  //  //data collection and validation
  //   async function dataValidation(){
  //         //validation

  //    }

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({ onDrop });

  async function uploadFile(e) {
    e.preventDefault();
    setFileValidtion("");
    const File = acceptedFiles[0];
    console.log(File.type);
    if (!allowedTypes.includes(File.type)) {
      return setFileValidtion("File must be JPG, PNG, Jpeg");
    }
    if (File.size >= 5 * 1024 * 1024) {
      console.log(File.size, 5 * 1024 * 1024);
      return setFileValidtion("Max file size is 5 MB");
    }

    const data = await getImageDimensions(File);
    if (data[0] !== 1024 || data[1] !== 576) {
      return setFileValidtion(
        "Accepted size for the course thumbnail is 1024x576."
      );
    }
    setsuccessFileUpload("File upload successfully");
    setFile(File);
  }

  function AddTagFunction(e) {
    if (e.key === "Enter") {
      if (e.target.value.replaceAll(" ", "") != "") {
        SetTag([...tags, e.target.value]);

      }
      e.target.value = "";
    }
  }

  function CloseTag(data, index) {
    const copy = [...tags];
    copy.splice(index, 1);
    SetTag(copy);
  }

  const [currentValue, setCurrentValue] = useState("");
  const [currentValue2, setCurrentValue2] = useState("");

  function OnChangeInput(e) {
    setCurrentValue(e.target.value);
  }

  function OnChangeInput2(e) {
    setCurrentValue2(e.target.value);
  }

  function AddReqFunction() {
    if (currentValue.replaceAll(" ", "") !== "") {
      Setred([...req, currentValue]);

    }
    setCurrentValue("");
  }

  function AddLernFunction() {
    if (currentValue2.replaceAll(" ", "") !== "") {
      setLern([...lern, currentValue2]);
    }
    setCurrentValue2("");
  }

  function CloseReq(index) {
    const copy = [...req];
    copy.splice(index, 1);
    Setred(copy);
  }
  function CloseLern(index) {
    const copy = [...lern];
    copy.splice(index, 1);
    setLern(copy);
  }

   function reomveUpdateStep(e) {
     e.preventDefault()
     setOldData([])
     dispatch(setCourse([]))
     dispatch(setcourseId(null))
     dispatch(setUpdate(false))
     dispatch(setStep(1))
  }

  function nextUpdateStep(e) {
    e.preventDefault()
    dispatch(setStep(2))
    dispatch(setCourse(oldData))
 }

  return (
    <div className="text-gray-400 py-6 px-6 bg-[#161D29] border-2  border-[#2C333F]">

      {isUpdate === true && courseid !== null ?
        loading
          ? <p className="text-2xl text-green-400 my-4">Loading....</p>
          : (
            <div className=' bg-[#161D29] mb-10 mt-7 p-3 mx-auto border-[3px] border-gray-800'>
              <p className='text-xl font-bold text-gray-200'>📝 Previous Information about Course</p>
              <ul className="list-disc pl-16 mt-3 text-gray-400 ">
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2 ">title :</span>{oldData?.title}</li>
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2">shortDesciption :</span>{oldData?.shortDesciption}</li>
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2">description :</span>{oldData?.description}</li>
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2 ">price :</span>&#8377;{oldData?.price}</li>
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2 ">category :</span>{oldData?.category}</li>
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2 ">tag :</span>🏷️{oldData?.tag?.at(0)?.split(",").join(" ,🏷️")}</li>
                <li className="mt-1"><span className="text-gray-200 text-lg mr-2">thumbnail :</span><img src={oldData?.thumbnail} className="mt-2 rounded-md w-[200px] h-[113px]" alt="" /></li>
                <li className="mt-3"><span className="text-gray-200 text-lg mr-2 ">Benefits :</span>{oldData?.Benefits}</li>
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2 ">Requirements :</span>📋{oldData?.Requirements?.at(0)?.split(",").join(" ,📋")}</li>
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2 ">Total Duration :</span>{oldData?.totalDuration || "-"}</li>
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2 ">courseInclude :</span>&#9989;{oldData?.courseInclude?.at(0)?.split(",").join(" ,✅")}</li>
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2 ">courseLanguage :</span>{oldData?.courseLanguage}</li>
                <li className="mt-[2px]"><span className="text-gray-200 text-lg mr-2 ">whatYouLern :</span>✏️{oldData?.whatYouLern?.at(0)?.split(",").join(" ,✏️")}</li>
              </ul>

              <div className="flex gap-5 flex-nowrap m-6">
              <button 
              onClick={(e) => {reomveUpdateStep(e)}}
              className="bg-[#2C333F] flex items-center gap-2   py-3 px-6 rounded-md text-gray-300 border-2 border-gray-600 font-medium"
             ><ImCancelCircle />Cancel update</button>

             <button 
              onClick={(e) => {nextUpdateStep(e)}}
              className="bg-[#2C333F] flex items-center gap-2  py-3 px-6 rounded-md text-gray-300 border-2 border-gray-600 font-medium"
             >Update Next step</button>
              </div>
            </div>
          )
        : ""
      }


      {/* loading at submiting time of form */}
      {isSubmitting && (
        <div className="text-green-400 text-2xl mb-4">Submitting.....</div>
      )}

      {/* course info form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => checkKeyDown(e)}
        className="step2"
      >
        {/* course title */}
        <div className="flex flex-col">
          <label  htmlFor="i1" className="mb-2">
            Course Title <sup className="text-red-500">*</sup>
          </label>
          <input
          id="i1"
            type="text"
            {...register("title", isUpdate !== true && courseid === null && {
              required: { value: true, message: "This field is required" },
            })}
            className="px-3 py-2 rounded-lg bg-gray-700"
            placeholder="Enter Course Title"
          ></input>
          {errors.title && (
            <p className="text-red-400 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* course description */}
        <div className="flex flex-col mt-7">
          <label htmlFor="i9" className="mb-2">
            Course Short Description<sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            {...register("shortDesciption", isUpdate !== true && courseid === null && {
              required: { value: true, message: "This field is required" },
            })}
            id="i9"
            className="px-3 py-2 rounded-lg bg-gray-700"
            placeholder="Enter Short Description"
          ></input>
          {errors.shortDesciption && (
            <p className="text-red-400 mt-1">
              {errors.shortDesciption.message}
            </p>
          )}
        </div>

        {/*  Course Detail Discription  */}
        <div className="flex flex-col mt-7">
          <label htmlFor="i2" className="mb-2">
            Course Detail Discription <sup className="text-red-500">*</sup>
          </label>
          <textarea
            {...register("description", isUpdate !== true && courseid === null && {
              required: { value: true, message: "This field is required" },
            })}
            className="px-3 py-2 rounded-lg bg-gray-700"
            placeholder="Enter Description"
            rows={10}
            id="i2"
          />
          {errors.description && (
            <p className="text-red-400 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <div className="flex flex-col mt-7 relative">
            <label htmlFor="i3" className="mb-2">
              Price <sup className="text-red-500">*</sup>
            </label>
            <input
              {...register("price", {
                required: isUpdate !== true && courseid === null && { value: true, message: "This field is required" },
                min: { value: 0, message: "Minimum course fees is 0" },
              })}
              type="number" id="i3"
              className="px-16 py-4 rounded-lg bg-gray-700"
              placeholder="Enter Price"
            ></input>
            <p className="absolute bottom-[10px] left-3 font-extrabold text-4xl">
              <RiMoneyRupeeCircleFill />
            </p>
          </div>
          {errors.price && (
            <p className="text-red-400 mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* totalDuration */}
        <div className="mt-7">
            <label htmlFor="td" className="mb-2">
               Total Duration of course<sup className="text-red-500">*</sup>
            </label>
            <br />
            <input
              {...register("totaldurationH", {
                required: isUpdate !== true && courseid === null && { value: true, message: "This field is required" },
                min: { value: 1, message: "Minimum hour is 1" },  
              })}
              type="number" id="id1"
              className="px-3 py-2 mt-2  rounded-lg bg-gray-700"
              // placeholder="Enter Price"
            ></input>
            <span className="ml-1 mr-5 text-xl">HH</span>
            <input
              {...register("totaldurationM", {
                required: isUpdate !== true && courseid === null && { value: true, message: "This field is required" },
                min: { value: 0, message: "Minimum Minite is 0" },  max: { value: 60, message: "Maximum Minite is 60" }
              })}
              type="number" id="id2"
              className="px-3 py-2 mt-2  rounded-lg bg-gray-700"
              // placeholder="Enter Price"
            ></input>
             <span className="ml-1 text-xl">MM</span>

             {errors.totaldurationH && (
             <p className="text-red-400 mt-1">{errors.totaldurationH.message}</p>)}

             {errors.totaldurationM && (
              <p className="text-red-400 mt-1">{errors.totaldurationM.message}</p>
              )}
        </div>

        {/* Category */}
        <div className="flex flex-col mt-7">
          <label htmlFor="i4" className="mb-2">
            Category <sup className="text-red-500">*</sup>
          </label>
          {/*  */}
          <select
            name=""
            id="i4"
            className="px-3 py-2 rounded-lg bg-gray-700"
            {...register("category", isUpdate !== true && courseid === null && {
              required: { value: true, message: "This field is required" },
            })}
          >
            <option value="" disabled selected>Select Category</option>
            {category.length > 0 &&
              category.map((data, index) => {
                return (
                  <option value={data} key={index}>
                    {data}
                  </option>
                );
              })}
          </select>
          {errors.category && (
            <p className="text-red-400 mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-col mt-7">
          <label htmlFor="i5" className="mb-2">
            Tags <sup className="text-red-500">*</sup>
          </label>

          <div
            className={`p-3 flex flex-wrap gap-3 rounded-lg my-1 ${tags.length <= 0 && "hidden"
              }`}
          >
            {tags.length > 0 &&
              tags.map((data, index) => {
                return (
                  <p
                    key={index}
                    className="py-2 flex items-center justify-evenly gap-4 px-4 rounded-full bg-[#ffd60a1d] text-yellow-300"
                  >
                    {data} <IoMdClose onClick={() => CloseTag(data, index)} />
                  </p>
                );
              })}
          </div>

          <input
            type="text"
            onKeyDown={(e) => AddTagFunction(e)}
            placeholder="Choose a Tag"
            id="i5"
            className="px-3 py-2 rounded-lg bg-gray-700"
          ></input>
          {isUpdate !== true && courseid === null && fleg && id === 3 && (
            <p className="text-red-400 mt-1">This field is required</p>
          )}
        </div>

        {/* Course Thumbnail */}
        <div className="flex flex-col mt-7">
          <label htmlFor="i6" className="mb-2">
            Course Thumbnail <sup className="text-red-500">*</sup>
          </label>
          {dataUrl ? (
            <div className="w-[500px] border-[3.5px] relative border-dashed border-gray-500 h-[282px] rounded-lg bg-gray-700 flex flex-col items-center justify-center">
              <img src={dataUrl} alt="" className="h-full w-full" />
              <div className="absolute bottom-3 right-3  border-2 border-white backdrop-blur-3xl">
                <button
                  className="py-2 px-4 text-white bg-green-800 m-2 rounded-lg"
                  onClick={(e) => uploadFile(e)}
                >
                  Upload
                </button>
                <button
                  className="py-2 px-4 text-white bg-red-800 m-2 rounded-lg"
                  onClick={() => {
                    setDataUrl(null);
                    setFileValidtion("");
                    setsuccessFileUpload("");
                  }}
                >
                  Cancal
                </button>
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className=" py-0 w-[500px] border-4 border-dashed border-gray-500 h-[282px] rounded-lg bg-gray-700 flex flex-col items-center justify-center"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <img
                  src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722605830/cloud-computing_mryevy.png"
                  className="h-16 w-16"
                ></img>
              ) : (
                <>
                  <div className="text-5xl">
                    <IoMdCloudUpload />
                  </div>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </>
              )}
            </div>
          )}
          <p className="text-red-400 mt-1">{FileValidation}</p>
          <p className="text-green-400 mt-1">{successFileUpload}</p>
        </div>

        {/* Benefits of the course */}
        <div className="flex flex-col mt-7">
          <label htmlFor="i7" className="mb-2">
            Benefits of the course <sup className="text-red-500">*</sup>
          </label>
          <textarea
          id="i7"
            {...register("Benefits", isUpdate !== true && courseid === null && {
              required: { value: true, message: "This field is required" },
            })}
            className="px-3 py-2 rounded-lg bg-gray-700"
            rows={8}
            placeholder="Enter Benefits of the course"
          ></textarea>
          {errors.Benefits && (
            <p className="text-red-400 mt-1">{errors.Benefits.message}</p>
          )}
        </div>

        {/* Requirements/Instructions * */}
        <div className="flex flex-col mt-7">
          <label htmlFor="i8" className="mb-2">
            Requirements/Instructions <sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            value={currentValue} id="i8"
            onChange={(e) => OnChangeInput(e)}
            className="px-3 py-2 rounded-lg bg-gray-700"
            placeholder="Enter Requirements of the course"
          ></input>
          {fleg && id === 2 && isUpdate !== true && courseid === null && (
            <p className="text-red-400 mt-1">This field is required</p>
          )}
          <p
            className="mt-2 cursor-pointer text-yellow-400 text-xl font-bold pl-2"
            onClick={(e) => AddReqFunction(e)}
          >
            Add
          </p>
          <div className="mt-2 mb-2">
            {req.map((data, index) => {
              return (
                <>
                  <span className="pl-2 ml-2  gap-2 items-center">
                    {data}{" "}
                    <IoMdClose
                      className="inline cursor-pointer"
                      onClick={() => CloseReq(index)}
                    ></IoMdClose>
                  </span>
                  <br />
                </>
              );
            })}
          </div>
        </div>

        {/* what is include by Course */}
        <div className="flex flex-col mt-7">
          <label htmlFor="i10" className="mb-2">
            This course includes <sup className="text-red-500">*</sup>
          </label>

          <div className="bg-gray-700 p-3 rounded-md mb-2 flex items-center">
            <input
              type="checkbox"
              id="c2"
              {...register("exercises", {})}
              className="h-6 w-6" 
            />
            <label htmlFor="c2" className="ml-3">
              Include coding exercises
            </label>
          </div>

          <div className="bg-gray-700 p-3 rounded-md mb-2 flex items-center">
            <input
              type="checkbox"
              id="c22"
              {...register("resources", {})}
              className="h-6 w-6"
            />
            <label htmlFor="c22" className="ml-3">
              Include downloadable resources
            </label>
          </div>

          <div className="bg-gray-700 p-3 rounded-md mb-2 flex items-center">
            <input
              type="checkbox"
              id="c3"
              {...register("Articals", {})}
              className="h-6 w-6 "
            />
            <label htmlFor="c3" className="ml-3">
              Include Articals
            </label>
          </div>

          <div className="bg-gray-700 p-3 rounded-md mb-2 flex items-center">
            <input
              type="checkbox"
              id="c4"
              {...register("AccessDevice", {})}
              className="h-6 w-6"
            />
            <label htmlFor="c4" className="ml-3">
              Access on mobile and TV
            </label>
          </div>

          <div className="bg-gray-700 p-3 rounded-md mb-2 flex items-center">
            <input
              type="checkbox"
              id="c5"
              {...register("AccessDuration", {})}
              className="h-6 w-6"
            />
            <label htmlFor="c5" className="ml-3">
              Full lifetime access
            </label>
          </div>

          <div className="bg-gray-700 p-3 rounded-md mb-2 flex items-center">
            <input
              type="checkbox"
              id="c6"
              {...register("Certificate", {})}
              className="h-6 w-6"
            />
            <label htmlFor="c6" className="ml-3">
              Certificate of completion
            </label>
          </div>
        </div>

        {/* Language * */}
        <div className="flex flex-col mt-7">
          <label htmlFor="i11" className="mb-2">
            Language <sup className="text-red-500">*</sup>
          </label>
          <select
            {...register("Language", isUpdate !== true && courseid === null && {
              required: { value: true, message: "This field is required" },
            })}
            className="px-3 py-2 rounded-lg bg-gray-700" id="i11"
          >  <option value="" disabled selected>Select Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Hinglish">Hinglish</option>
          </select>
          {errors.Language && (
            <p className="text-red-400 mt-1">{errors.Language.message}</p>
          )}
        </div>

        {/* What student lern  */}
        <div className="flex flex-col mt-7">
          <label htmlFor="i14" className="mb-2">
            What student lern <sup className="text-red-500">*</sup>
          </label>

          <input
            type="text" id="i14"
            value={currentValue2}
            onChange={(e) => OnChangeInput2(e)}
            className="px-3 py-2 rounded-lg bg-gray-700"
            placeholder="Enter What is student lern"
          ></input>
          {fleg && id === 1 && isUpdate !== true && courseid === null && (
            <p className="text-red-400 mt-1">This field is required</p>
          )}
          <p
            className="mt-2 cursor-pointer text-yellow-400 text-xl font-bold pl-2"
            onClick={(e) => AddLernFunction(e)}
          >
            Add
          </p>
          <div className="mt-2 mb-2">
            {lern.map((data, index) => {
              return (
                <>
                  <span className="pl-2 ml-2  gap-2 items-center" key={index}>
                    {data}{" "}
                    <IoMdClose
                      className="inline cursor-pointer"
                      onClick={() => CloseLern(index)}
                    ></IoMdClose>
                  </span>
                  <br />
                </>
              );
            })}
          </div>
        </div>

        {/* next button */}
        {
          courseid && isUpdate ? <div className="flex justify-end mt-7 gap-5">
            <input
              type="submit"
              disabled={isSubmitting}
              value="Update"
              className="bg-[#FFD60A]  py-3 px-6 rounded-md text-black font-medium"
            ></input>

          </div>
            : <div className="flex justify-end mt-7">
              <input
                type="submit"
                disabled={isSubmitting}
                value="Next"
                className="bg-[#FFD60A]  py-3 px-6 rounded-md text-black font-medium"
              ></input>
            </div>

        }

      </form>
    </div>
  );
};

export default CourseInfo;
