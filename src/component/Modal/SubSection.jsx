import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { allowedVideoTypes } from "../../utils/constnt";
import {setIsSubsectioncreating} from '../../slices/courseSlice'
import { useForm } from "react-hook-form";


const SubSection = ({ subSection, closeSubSectionModal, addSubsection,updateSubsection }) => {
  const {isSubsectioncreating} = useSelector((state) => state.course)

  const [filedata, setFile] = useState(null);
  const [FileValidation, setFileValidtion] = useState("");
  const [successFileUpload, setsuccessFileUpload] = useState("");
  const [dataUrl, setDataUrl] = useState(null);
  const [isSubmitti, setIsSubmitti] = useState(false);
  const [videoLoading, SetVidoLoading] = useState(false);
  const [clearModalData, setClearModalData] = useState(false);
  const [data,setoldvalue] = useState("")

  const dispatch = useDispatch()


  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  

  useEffect(() => {

    if (clearModalData || subSection.clear === true) {
      setFile(null);
      setFileValidtion("");
      setsuccessFileUpload("");
      setIsSubmitti(false);
      setDataUrl(null);
      SetVidoLoading(false);
      setClearModalData(false);
      setoldvalue("")
      reset();
      if (subSection.text === "Add SubSection") {
        setValue("description", "");
      }
    }
    if(subSection?.data?.videoUrl?.url){
      setDataUrl(subSection?.data?.videoUrl?.url)
    }
    if(subSection?.data?.timeDuration){
      setoldvalue(subSection?.data?.timeDuration)
    }
  }, [clearModalData, subSection]);

  useEffect(() => {
    if (dataUrl != null) {
      setFileValidtion("");
    }
  }, [dataUrl]);

  //validate data and find data at one place
  function onSubmit(data) {
    if (!filedata) {
      return setFileValidtion("upload file");
    }

    if (dataUrl && !filedata) {
      return setFileValidtion("Uplaod file");
    }
   
    setIsSubmitti(true);
    if(subSection.text === "Add SubSection"){

      dispatch(setIsSubsectioncreating(true))
      addSubsection(data, filedata, subSection.data._id);
    }else{
      updateSubsection(data, filedata, subSection.data)
    }
   
    //setIsSubmitti(false)
  }

  const onDrop = useCallback((acceptedFiles) => {
    SetVidoLoading(true);
    acceptedFiles.forEach((file) => {
      //SetVidoLoading(true)
      const videoUrl = URL.createObjectURL(file);
      console.log(videoUrl);
      setDataUrl(videoUrl);
      SetVidoLoading(false);
    });
  }, []);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({ onDrop });

  async function uploadFile(e) {
    e.preventDefault();
    setFileValidtion("");
    const File = acceptedFiles[0];
    console.log(File.type);
    if (!allowedVideoTypes.includes(File.type)) {
      return setFileValidtion("File must be MP4");
    }

    // Validate file size (e.g., max 500MB)
    const maxSize = 500 * 1024 * 1024;
    if (File.size >= maxSize) {
      return setFileValidtion("File is too large (Max:- 500MB).");
    }

    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      const duration = video.duration;
      const width = video.videoWidth;
      const height = video.videoHeight;
      console.log(duration, width, height);
      if (width != 1920 || height != 1080) {
        return setFileValidtion(
          "Invalid resolution. Please upload a 1080p (1920x1080) video."
        );
      }
      if (duration > 3600) {
        // Example: Limit to 1 hour

        return setFileValidtion("Video is too long.");
      } else {
        setsuccessFileUpload("File upload successfully");
        setFile(File);
      }
    };
    video.src = URL.createObjectURL(File);
  }

  return (
    <div
      className={`inset-0  mx-auto   backdrop-blur-xl bg-red-60 z-50 absolute  ${
        subSection.condition ? "flex flex-col" : "hidden"
      } `}
    >
      <div className="w-[70%] mx-auto bg-[#161D29]  border-4 border-gray-700">
        <div className="h-14 w-[100%] flex items-center justify-between px-5 bg-gray-700 ">
          <p className="text-gray-200 font-2xl font-bold">{subSection.text}</p>
          <button
            onClick={() => {
              setClearModalData(true);
              closeSubSectionModal();
            }}
            className="text-gray-200 font-extrabold text-2xl"
          >
            <RxCross2 />
          </button>
        </div>

        {isSubmitti && (
          <div className="text-green-400 mt-4 mx-4 text-xl">Submitting...</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4">
            {subSection?.data?.videoUrl?.url &&
            subSection?.text === "View SubSection" ? (
              <video
                type="video/mp4"
                controls
                src={subSection?.data?.videoUrl?.url}
                alt="icon"
                className="h-[268px] w-[500px]"
              />
            ) : (
              <div className="flex flex-col mt-2  w-[100%]">
                <label
                  htmlFor="i6"
                  className="mb-2 text-gray-200 font-semibold"
                >
                  Video Lecture <sup className="text-red-500 ">*</sup>
                </label>
                {dataUrl ? (
                  <div className="w-[500px] lg:w-[90%] text-center  overflow-hidden border-[3.5px] relative border-dashed border-gray-500 h-[268px] rounded-lg bg-gray-700 flex flex-col items-center justify-center">
                    <video
                      type="video/mp4"
                      controls
                      src={dataUrl}
                      alt="icon"
                      className=" w-full"
                    />
                    {subSection?.data?.videoUrl?.url  && subSection?.text === "View SubSection" ? (
                      ""
                    ) : (
                      <div className="absolute top-3 right-3  border-2 border-white backdrop-blur-3xl">
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
                            setFile(null);
                            setFileValidtion("");
                            setsuccessFileUpload("");
                          }}
                        >
                          Cancal
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className=" py-0 w-[500px] border-4 lg:w-[90%] text-center border-dashed border-gray-500 h-[282px] rounded-lg bg-gray-700 flex flex-col items-center justify-center"
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
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </>
                    )}
                  </div>
                )}
                {videoLoading && (
                  <p className="text-green-400 mt-1">Loading...</p>
                )}
                <p className="text-red-400 mt-1">{FileValidation}</p>
                <p className="text-green-400 mt-1">{successFileUpload}</p>
              </div>
            )}

            <div className="flex flex-col mt-7">
              <label htmlFor="i1" className="mb-2">
                Lecture Title
              </label>
              <input
                type="text"
                id="i1"
                readOnly={
                  subSection?.data?.subSectionName &&
                  subSection?.text === "View SubSection"
                }
                defaultValue={subSection?.data?.subSectionName}
                {...register("title", {
                  required: { value: true, message: "This field is required" },
                })}
                className="px-3 py-2 rounded-lg bg-gray-700"
              />
              {errors.title && (
                <p className="text-red-400 mt-1">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col mt-7">
              <label htmlFor="time">Duration of Video Lecture</label>
              <input
                type="time"
                readOnly={
                  // subSection?.data?.timeDuration &&
                  subSection?.text === "View SubSection"
                }
                defaultValue={data}
                {...register("duration", {
                  required: { value: true, message: "This field is required" },
                })}
                id="time"
                step="1"
                className="px-3 py-2 rounded-lg bg-gray-700"
              />
              {errors.duration && (
                <p className="text-red-400 mt-1">{errors.duration.message}</p>
              )}
            </div>

            <div className="flex flex-col mt-7">
              <label htmlFor="i2" className="mb-2">
                Lecture Description
              </label>
              <textarea
                id="i2"
                readOnly={
                  subSection?.data?.description &&
                  subSection?.text === "View SubSection"
                }
                defaultValue={subSection?.data?.description}
                {...register("description", {
                  required: { value: true, message: "This field is required" },
                })}
                rows={10}
                className="px-3 py-2 rounded-lg bg-gray-700"
              />
              {errors.description && (
                <p className="text-red-400 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className=" flex justify-end mt-7 mb-4 px-4">
              {subSection.text === "Add SubSection" && (
                <input
                  type="submit"
                  disabled={isSubsectioncreating}
                  value="Save"
                  className="bg-[#FFD60A]  py-3 px-6 rounded-md text-black font-medium"
                ></input>
              )}
              {subSection.text === "Edit SubSection" && (
                <input
                  type="submit"
                  disabled={isSubmitting}
                  value="Edit"
                  className="bg-[#FFD60A]  py-3 px-6 rounded-md text-black font-medium"
                ></input>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};

export default SubSection;
