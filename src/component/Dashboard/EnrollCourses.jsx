import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line, Circle } from 'rc-progress';
import { useNavigate } from 'react-router-dom';

const EnrollCourses = () => {
  const [state, setState] = useState('All');
  const [apiData, setData] = useState([]);
  const [compatedapidata, setcomplatedapidata] = useState([])
  const [progressData, setProgressData] = useState()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function navigateCourse(data) {
    //set all the data in front of url
    //  dispatch(setprocessPercentage(data?.progressDataAppend?.total_ans))
    //  dispatch(setTotalLecture(data?.progressDataAppend?.totalLecture))
    //  dispatch(setComplateLecture(data?.progressDataAppend?.comp_lecture))
    //  dispatch(setCourseData(data?.courseContent))
    //  dispatch(setCourseTitle(data?.title))
    navigate(`/lerning/course/${data._id}`)
    console.log(data.courseContent)
  }

  async function getEnrolledCourses() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getEnrolledCourses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setData(data.course);
      setProgressData(data.progress)
      setcomplatedapidata(data.complated)
      console.log(data)
      console.log(data.progress)
      console.log(data.course)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getEnrolledCourses()
    console.log("this is progress data", progressData)
  }, [])

  return (
    <div className='text-white mx-4 mb-10 sm2:mx-1 sm:mx-3'>
      <p className='mt-7 mb-4 text-3xl sm:text-2xl sm1:text-xl sm2:text-base'>Enrolled Courses</p>
      <div className='flex rounded-full gap-1 bg-[#2C333F] sm2:flex-col sm2:rounded-2xl py-1 px-2 justify-between w-48'>
        <p className={`px-5 py-1 cursor-pointer rounded-full ${state === 'All' && 'bg-slate-950'}`} onClick={() => setState('All')}>All</p>
        <p className={`px-5 py-1 cursor-pointer rounded-full ${state === 'Completed' && 'bg-slate-950'}`} onClick={() => setState('Completed')}>Completed</p>
      </div>

      {loading && <p className='mt-4 text-2xl text-yellow-400'>Loading...</p>}
      {error && <p className='mt-4 text-xl text-red-500'>Error: {error}</p>}

      <div className='border-2  mt-7 rounded-md border-gray-700 sm2:overflow-x-scroll'>
        <table className='w-full'>
          <thead>
            <tr className='bg-[#2C333F]'>
              <th className='py-3'>Course Name</th>
              <th className='py-3 lg:hidden'>Duration</th>
              <th className='py-3 lg:hidden'>Progress</th>
            </tr>
          </thead>
          {
            state === 'All' && <tbody>
              {
                apiData.length > 0 && apiData.map((data, index) => {
                  //  console.log(`/lerning/course/${data._id}/section/${data.courseContent[0]._id}/subsection/${data.courseContent[0].subsection[0]}`)
                  ///lerning/course/:cid/section/:sid/subsection/:id
                  return (
                    <tr key={index} className='border-b-2 border-gray-700   lg:pb-5 cursor-pointer lg:flex lg:flex-col' onClick={() => navigateCourse(data)}>
                      <td className='w-[60%] lg:w-[100%] py-2 '>
                        <table className=''>
                          <tr className='sm2:flex-col sm2:flex '>
                            <td className='p-3 '><img src={data.thumbnail} alt="Course Thumbnail" className=' h-16 object-cover min-w-28' /></td>
                            <td>
                              <table>
                                <tr>
                                  <td className='text-xl font-semibold sm1:text-base sm2:pl-2'>{data.title}</td>
                                </tr>
                                <tr>
                                  <td className='text-gray-400 sm2:pl-2'>{data.category}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>


                      </td>
                      <td className='border-l-0 w-[10%] lg:hidden border-gray-700 text-center  px-3  text-gray-300'>{data.totalDuration}</td>
                      <td className='border-l-0 w-[10%] lg:w-[100%] border-gray-700 text-center lg:text-start px-3 hidden lg:block text-gray-300'>Duration :-  {data.totalDuration}</td>

                      <td className='border-l-0 lg:w-[100%] border-gray-700 px-3 text-center lg:text-start text-gray-300'>
                        progress {data?.progressDataAppend?.total_ans}%
                        <Line percent={data?.progressDataAppend?.total_ans} strokeWidth={4} strokeColor="#2db7f5" className='w-60 mx-auto lg:mx-0 mt-2' trailColor={"#2C333F"} gapDegree={-360} trailWidth={4} />
                      </td>
                    </tr>
                  )
                })}
              {
                apiData.length <= 0 &&
                <tr className=' text-center w-[100%]'>
                  <td className='text-gray-300 py-4 px-3 text-lg text-center w-[70%]'>Not enroll in any course</td>
                  <td className='text-gray-300 py-4 px-3 text-lg text-center w-[20%] lg:hidden'> - </td>
                  <td className='text-gray-300 py-4 px-3 text-lg text-center lg:hidden'> - </td>
                </tr>
              }
            </tbody>
          }

          {
            state === 'Completed' && <tbody>
              {
                compatedapidata.length > 0 ? (
                  compatedapidata.map((data, index) => {
                    return (
                      <tr key={index} className='border-b-2 border-gray-700   lg:pb-5 cursor-pointer lg:flex lg:flex-col' onClick={() => navigateCourse(data)}>
                        <td className='w-[60%] lg:w-[100%] py-2 '>
                          <table className=''>
                            <tr className='sm2:flex-col sm2:flex '>
                              <td className='p-3 '><img src={data.thumbnail} alt="Course Thumbnail" className=' h-16 object-cover min-w-28' /></td>
                              <td>
                                <table>
                                  <tr>
                                    <td className='text-xl font-semibold sm1:text-base sm2:pl-2'>{data.title}</td>
                                  </tr>
                                  <tr>
                                    <td className='text-gray-400 sm2:pl-2'>{data.category}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
  
  
                        </td>
                        <td className='border-l-0 w-[10%] lg:hidden border-gray-700 text-center  px-3  text-gray-300'>{data.totalDuration}</td>
                        <td className='border-l-0 w-[10%] lg:w-[100%] border-gray-700 text-center lg:text-start px-3 hidden lg:block text-gray-300'>Duration :-  {data.totalDuration}</td>
  
                        <td className='border-l-0 lg:w-[100%] border-gray-700 px-3 text-center lg:text-start text-gray-300'>
                          progress {data?.progressDataAppend?.total_ans}%
                          <Line percent={data?.progressDataAppend?.total_ans} strokeWidth={4} strokeColor="#2db7f5" className='w-60 mx-auto lg:mx-0 mt-2' trailColor={"#2C333F"} gapDegree={-360} trailWidth={4} />
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr className=' text-center w-[100%]'>
                    <td className='text-gray-300 py-4 px-3 text-lg text-center w-[70%]'>Not complate any course</td>
                    <td className='text-gray-300 py-4 px-3 text-lg text-center w-[20%] lg:hidden'> - </td>
                    <td className='text-gray-300 py-4 px-3 text-lg text-center lg:hidden'> - </td>
                  </tr>
                )
              }
            </tbody>
          }


        </table>
      </div>


    </div>
  );
};

export default EnrollCourses;
