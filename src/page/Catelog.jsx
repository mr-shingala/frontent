import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Footer from '../component/Footer/Footer';
import Card from "../component/courseCard/Card";
import '../page/style1.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoSearch } from "react-icons/io5";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import '../page/style1.css'
import { useNavigate } from 'react-router-dom'
import RivewBar from '../component/reviewbar/RivewBar'

const Catelog = () => {
  const location = useLocation();
  const [des, setDescription] = useState(null)
  const [newCourse, setNewCourse] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [topCourses, setTopCourses] = useState([])
  const [topSelling, setTopSelling] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPart, setCurrentPart] = useState(true)
  const [searchboxVisible, setSearchboxvisible] = useState(false)
  // const [searchArea, setSearchArea] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [searchDataOutput, setSearchDataOutput] = useState([])
  const [searchDataOutputE, setSearchDataOutputE] = useState(null)
  const navigate = useNavigate()

  const path = location.pathname
    .split("/")
    .at(-1)
    .replaceAll("%20", " ")
    .replaceAll("%s", "/");
  // const category = useSelector((state) => state.course.category)
  // console.log(category)

  useEffect(() => {
    setLoading(true)
    // console.log(path);
    async function getDetails() {
      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_BASE_URL}pageCategoryDetails`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              name: path,
            }),
          }
        );
        const data = await response.json()
        //console.log(data)
        if (data.success) {
          setDescription(data.description)
          setNewCourse(data.New)
          setTopSelling(data.topSelling)
          //console.log(data.topSelling)
          setAllCourses(data.allCourses)
          setTopCourses(data.topCourses)
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    getDetails();

  }, [path]);

  useEffect(() => {
    if (setAllCourses.length > 0) {
      // console.log(allCourses)
      for (const element of allCourses) {
        // console.log(element)
        setSearchData((prevData) => [...prevData, {
          title: element.title,
          id: element._id,
          totalDuration: element.totalDuration,
          price: element.price,
          img: element.thumbnail
        }])
        // console.log(Object.values(element))
      }


    }



  }, [allCourses])

  function searchAlgoritem(e) {

    setSearchDataOutput([])
    console.log(searchDataOutput)
    // setSearchDataOutputE(null)

    if (e.target.value.replaceAll(" ", "") !== "") {
      searchData.filter((element) => {
        const str = element.title.toLowerCase()
        if (str.includes(e.target.value.toLowerCase())) {
          
            setSearchDataOutput((prevdata) => [
              ...prevdata, element
            ])
          
        }
      })

      if(searchDataOutput.length <= 0){
        setSearchDataOutputE("No course found")
      }
  
    }
  }
  const [lineCamp,setLineCamp] = useState(false)
  // console.log(topSelling)
  // topSelling.map((data,index)=>{
  //    console.log(data.courseDetails)
  // })

  return (
    <div className="">
      {
        loading ? (
          <div className="h-[100vh] w-full flex items-center justify-center bg-[#000814]">
            <p className="text-yellow-400 text-4xl lg1:text-3xl md:text-2xl  font-semibold">Loading...</p>
          </div>
        ) : (<>
          <div className="min-h-60 py-12  w-full bg-[#161D29]">
            <div className="flex justify-evenly max-w-[1350px] xl2:px-10 min-h-60 mx-auto gap-7 lg:flex-col lg:gap-0">
              <div className="flex flex-col justify-center w-[70%] lg:w-[100%] lg:px-5 lg1:px-2 md:px-0">
                <p className="text-[#b2b9c7]">
                  Home / Catalog / <span className="text-yellow-400">{path}</span>
                </p>
                <p className="text-white text-4xl font-semibold my-4 lg:my-7 sm1:text-2xl">{path}</p>
                <p className={`text-[#b2b9c7] text-justify cursor-pointer ${lineCamp ? 'line-clamp-none' : 'line-clamp-6'} `} onClick={()=>setLineCamp(!lineCamp)}>
                  {des}
                </p>
              </div>
              <div className="w-[30%] flex flex-col justify-start lg:pt-0 mt-10 items-center lg:items-start lg:w-[100%] lg:px-5 lg1:px-2 md:px-0">
                <p className="text-xl font-semibold text-white">
                  Related resources
                </p>
                <ul className="text-[#b2b9c7] list-disc ml-6 mt-4">
                  <li>Doc {path}</li>
                  <li>Cheatsheets</li>
                  <li>Articles</li>
                  <li>Community Forums</li>
                  <li>Projects</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full  bg-[#000814] min-h-[60vh] py-12  xl2:px-10">
            <div className="max-w-[1350px] mx-auto text-white">
              <p className="text-3xl font-bold sm2:text-2xl md:py-3 sm1:py-4">Courses to get you started</p>
              <div className="mt-8 mb-14 flex  border-b-2 border-gray-700 gap-6 text-gray-500  sm:items-center sm:justify-center sm:flex-col sm:gap-2">
                <p className={`cursor-pointer pb-2 ${currentPart && 'text-yellow-400 border-b-2 border-yellow-400 '}`} onClick={() => {
                  setCurrentPart(!currentPart)
                  // setSearchArea(false)
                  setSearchboxvisible(false)
                }}>All courses</p>
                <p className={`cursor-pointer pb-2 ${currentPart === false && 'text-yellow-400 border-b-2 border-yellow-400'}`} onClick={() => {
                  setCurrentPart(!currentPart)
                  // setSearchArea(false)
                  setSearchboxvisible(false)
                }}>New</p>
                <div className="flex items-center justify-center gap-2 pb-2 sm:my-3">
                  <IoSearch className={`text-2xl cursor-pointer ${searchboxVisible && 'text-yellow-400 '}`} onClick={() => { setSearchboxvisible(!searchboxVisible) }} />
                  <input type="text" className={`rounded-full bg-gray-800 px-4 py-1 text-gray-400 outline-none text-lg  ${searchboxVisible ? 'opacity-100 inline' : 'opacity-0 hidden'}`} onChange={searchAlgoritem} placeholder="Enter Course Name.." />
                </div>
              </div>
              {
                searchboxVisible && (
                  <div className="mb-10 mx-auto">
                    <p className="text-white text-xl pb-2">Search Result</p>
                    {
                      searchDataOutput.length > 0 && searchDataOutput.map((data, index) => {
                        return (

                          <div key={index} className="flex sm1:flex-col  p-3 bg-gray-900 gap-3 rounded-md mb-1 cursor-pointer" onClick = {() => {navigate(`/Catelog/course/${data.id}`)}}>
                            <img src={`${data.img}`} alt="img" className="w-48 rounded-md" />
                            <div>
                              <p className="text-white text-2xl">{data.title}</p>
                              <p className="text-gray-500">Duration: {data.totalDuration}</p>
                              <p className="text-gray-500">Rs. {data.price}</p>
                            </div>
                          </div>
                        )

                      })
                    }
                    {
                    searchDataOutput.length <= 0 && searchDataOutputE && <div  className="flex p-3 bg-gray-900  rounded-md mb-1">
                        <p className="text-gray-400">No search result fond</p>
                      </div>
                    }
                  </div>)
              }
              {
                currentPart ? (
                  <>
                  
                      <div className="mt-8 mb-8 flex    w-[100%] items-center px-10 xl3:px-0 sm2:px-0 mx-auto">
                        <div className="flex flex-wrap  w-[100%]  gap-9 md:justify-center  sm2:w-[100%]">
                      {
                        allCourses.length > 0 && allCourses.map((data, index) => {
                          const name = `${data?.instructor?.firstName} ${data?.instructor?.lastName}`
                          return <Card key={index} img={data.thumbnail} price={data.price} coursename={data.title} insname={name}  id={data._id} avgrating={data.AvgRating} reviewCount={data.ratingAndReview.length}></Card>
                        })
                      }
                      {
                        allCourses.length <= 0 && <div className="flex w-[100%]  justify-center items-center gap-2 pl-5 text-2xl sm:text-base  text-[#838894]">
                          <img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725295252/sad_i5smjj.png" className="h-7" alt="img" />
                          <p>No Course Found</p>
                        </div>
                      }
                      </div>
                      </div>
                   

                    <p className="text-3xl font-bold mt-24 sm:text-2xl mb-10">Top courses in <span className="gradient4">{path}</span></p>
                    <div className="mt-8 mb-10 md:px-0">
                      <Swiper
                        spaceBetween={50}
                        navigation={true}
                        loop={true}
                        slidesPerView={1}
                        modules={[Navigation]}
                        className="px-12 xl2:px-0"
                        breakpoints={{
                           1270:{
                              slidesPerView:3,
                              spaceBetween:50,
                           
                           },
                           1007:{
                             slidesPerView:2,
                             spaceBetween:50,
                           
                           },
                           
                        }}
                      >
                        {
                          topCourses.length > 0 && topCourses.map((data, index) => {
                            const name = `${data?.instructor?.firstName} ${data?.instructor?.lastName}`
                 
                            return <SwiperSlide className="flex justify-center" > <Card avgrating={data.AvgRating} reviewCount={data.ratingAndReview.length} key={index} img={data.thumbnail} price={data.price} coursename={data.title} insname={name}  id={data._id}></Card> </SwiperSlide>
                          })
                        }
                      </Swiper>
                      {
                        topCourses.length <= 0 && <div className="flex justify-center items-center gap-2 pl-5 text-2xl  text-[#838894]">
                          <img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725295252/sad_i5smjj.png" className="h-7" alt="img"  />
                          <p>No Course Found</p>
                        </div>
                      }
                    </div>

                    {
                      topSelling.length > 0 && <p className="text-3xl font-bold mt-24 mb-10 sm:text-2xl"> Frequently Bought Together</p>
                    }
                    {
                      <Swiper
                      spaceBetween={50}
                        navigation={true}
                        loop={true}
                        slidesPerView={1}
                        modules={[Navigation]}
                        className="px-12 xl2:px-0 "
                        breakpoints={{
                           1270:{
                              slidesPerView:3,
                              spaceBetween:50,
                           
                           },
                           1007:{
                             slidesPerView:2,
                             spaceBetween:50,
                           
                           },}}
                      >
                        {
                          topSelling.length > 0 && topSelling.map((data,index) => {
                            const name = `${data?.courseDetails?.instructorDetails?.firstName} ${data?.courseDetails?.instructorDetails?.lastName}`
                   
                            return <SwiperSlide className="flex justify-center"> <Card avgrating={data.courseDetails?.AvgRating || 0} key={index} reviewCount={data.courseDetails.ratingAndReview.length} img={data.courseDetails.thumbnail} price={data.courseDetails.price} coursename={data.courseDetails.title} insname={name}  id={data?.courseDetails._id}></Card> </SwiperSlide>
                          })
                        }
                      </Swiper>
                    }

                  </>
                ) : (
                  <div className="mt-8 mb-8 flex gap-8  flex-wrap justify-start">
                    {
                      newCourse.length > 0 && newCourse.map((data, index) => {
                        //console.log(newCourse)
                        const name = `${data?.instructor?.firstName} ${data?.instructor?.lastName}`
                        return <Card img={data.thumbnail} key={index} price={data.price} coursename={data.title} insname={name} reviewcount={3} id={data._id}></Card>
                      })
                    }
                    {
                      newCourse.length <= 0 && <div className="flex w-[100%] justify-center items-center gap-2 pl-5 text-2xl sm1:text-base  text-[#838894]">
                        <img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725295252/sad_i5smjj.png" className="h-7" alt="img" />
                        <p>No Course Found</p>
                      </div>
                    }
                  </div>
                )
              }
           <div className="mt-24"></div>
              <RivewBar></RivewBar>
            </div>
          </div>
        </>)
      }

      <Footer></Footer>
    </div>
  );
};

export default Catelog;
