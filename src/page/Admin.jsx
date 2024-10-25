import React from 'react'
import AdminCard from '../component/Admin/AdminCard'
import CategoryWise from '../component/Admin/CategoryWise'
import Lchart from '../component/Admin/Lchart'
import RatingPieChart from '../component/Admin/RatingPieChart'
import CourseUploadLineChart from '../component/Admin/CourseUploadLineChart'
import PublishDraftRadarChart from '../component/Admin/PublishDraftRadarChart'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {setFleg,setId,setData} from '../slices/modalSlice'
import { FunctioId,Url } from '../utils/constnt';
import { useDispatch, useSelector } from 'react-redux'


const Admin = () => {

  const [data, setData2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {token} = useSelector((state) => state.auth)
 

  const colorArray = [
    '#E57373B3',
    '#36A2EBB3',
    '#FFCE56B3',
    '#4BC0C0B3',
    '#9966FFB3',
    '#FFAB91B3', // Peach shade
    '#FF9F40B3',
    '#F06292B3',
    '#A5D6A7B3'
];

const ratingsNme = ['Poor', 'Below Average', 'Average', 'Good', 'Excellent'];
const backgroundColor= [
  'rgba(255, 99, 132, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)'
]

function logout(){
 
  dispatch(setFleg(true))
  dispatch(setId(FunctioId[1]))
  dispatch(setData({icon:Url,heading:"Logged out!"}))
}


  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getAdmindata`,{
         credentials:'include',
         headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
                  
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result)
      setData2(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Use useEffect to call the fetchData function on component mount
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts


  return (
    <div className='bg-gray-950 1xl:px-10 lg1:h-screen'>

     {
       !loading ? "" : <div className='text-3xl text-yellow-400 w-[1350px] mx-auto pt-10'>Loading...</div>
     } 
      {/* login home */}
      <div className='max-w-[1350px] lg1:hidden  mx-auto pt-10 pb-10 items-center flex justify-between '>
        <div className='flex gap-5 items-center'>
          <button onClick={()=>navigate('/')} className='border-2 rounded-md bg-gray-900 border-gray-700 text-gray-200 p-2 text-lg font-semibold'>Home</button>
          <p className='text-gray-200 text-2xl font-semibold'>Welcome to the <span className='gradient4'>Admin Panel!</span></p>
        </div>
        <div className=''>
          <button onClick={logout} className='border-2 rounded-md bg-gray-900 border-gray-700 text-gray-200 p-2 font-semibold'>Logout</button>
        </div>
      </div>

      {/* card section */}
      <div className='max-w-[1350px] lg1:hidden mx-auto pb-10 items-center flex gap-5 flex-wrap lg1:justify-center'>
        <AdminCard img={'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728663224/team_aiwhqk.png'} color={'text-red-400'} text={'Total User'} number={data?.NumberOfUser} ></AdminCard>
        <AdminCard img={'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728746015/web-traffic_wyk2jf.png'} color={'text-[#f0abfc]'} text={'Number Of Visitor'} number={data?.NumberOfVisitor} ></AdminCard>
        <AdminCard img={'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728662313/graduating-student_pjmlcc.png'} color={'text-blue-400'} text={'Total Student'} number={data?.NumberOfStudent} ></AdminCard>
        <AdminCard img={'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728663239/male_1_pbm78e.png'} color={'text-orange-400'} text={'Total Instructor'} number={data?.NumberOfInstructor} ></AdminCard>
        <AdminCard img={'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728746303/app_f15n1b.png'} color={'text-yellow-100'} text={'Total Categoty'} number={data?.NumberOfCategory} ></AdminCard>
        <AdminCard img={'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728662313/online-course_f5xhus.png'} color={'text-blue-400'} text={'Total Course'} number={data?.NumberOfCourse} ></AdminCard>
        <AdminCard img={'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728668448/chapter_1_dxjpsk.png'} color={'text-green-400'} text={'Total Section'} number={data?.NumberOfSection} ></AdminCard>
        <AdminCard img={'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728668448/sections_cbjvxd.png'} color={'text-purple-100'} text={'Total Subsection'} number={data?.NumberOfSubSection} ></AdminCard>
        <AdminCard img={'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728669878/certificate_ovpsnc.png'} color={'text-yellow-200'} text={'Generated Certificate'} number={data?.ToatalCertificate} ></AdminCard>
      </div>

      {/* graph section */}
      <div className='max-w-[1350px] lg1:hidden mx-auto py-10 items-center flex gap-5  bg-gray-900 border-4 rounded-lg border-gray-700 mb-10'>
        <div className='flex flex-col items-center w-[50%] gap-5 '>
          <p className='text-gray-400 text-2xl font-semibold'>Category Wise Course Ratio</p>
          <CategoryWise CategoryCourseNumber={data?.CategoryCourseNumber} CategoryName={data?.CategoryName} ></CategoryWise>
        </div>
        <div className=' flex flex-col justify-center'>
           {
             data?.CategoryName?.map( (key,index) => {
                  return <div className=' flex gap-3 mb-5'>
                      <div className={`p-3`}  style={{ backgroundColor: colorArray[index] }}></div>
                      <p key={index} className='text-gray-300 text-xl' >{key}</p>
                  </div>
                
             })
           }
        </div>
      </div>

      <div className='max-w-[1350px] lg1:hidden mx-auto pb-10 items-center flex gap-5 flex-wrap '>
        <div className='flex flex-col items-center w-[100%] bg-gray-900 border-4 pt-10  rounded-lg border-gray-700 gap-5'>
          <p className='text-gray-400 text-2xl font-semibold'>Total Course According to Language</p>
          <Lchart hinglish={data?.Hinglish} hindi={data?.hindi} english={data?.english}></Lchart>
        </div>
      </div>
{/* 
      <div className='w-[1350px] mx-auto pb-10 items-center flex gap-5 flex-wrap '>
       
      </div> */}
      <div className='max-w-[1350px] lg1:hidden mx-auto py-10 items-center flex gap-5  bg-gray-900 border-4 rounded-lg border-gray-700 mb-10'>
        <div className='flex flex-col items-center w-[50%] gap-5'>
          <p className='text-gray-400 text-2xl font-semibold'>Rating</p>
          <RatingPieChart ratingCount={data?.rating} ></RatingPieChart>
        </div>
        <div className=' flex flex-col justify-center'>
           {
             ratingsNme.map( (key,index) => {
                  return <div className=' flex gap-3 mb-5'>
                      <div className={`p-3`}  style={{ backgroundColor: backgroundColor[index] }}></div>
                      <p key={index} className='text-gray-300 text-xl' >{key}</p>
                  </div>
                
             })
           }
        </div>
      </div>

      <div className='max-w-[1350px] lg1:hidden mx-auto pb-10 items-center flex gap-5 flex-wrap '>

        <div className='flex flex-col items-center w-[100%] bg-gray-900 border-4 pt-10  rounded-lg border-gray-700 gap-5'>
          <p className='text-gray-400 text-2xl font-semibold'>Total Course According to Status</p>
          <PublishDraftRadarChart Draft={data?.Draft} Publish={data?.Publish} ></PublishDraftRadarChart>
        </div>


      </div>

      <div className='max-w-[1350px] lg1:hidden mx-auto pb-10 items-center flex gap-5 flex-wrap'>

        <div className='flex flex-col items-center w-[100%] bg-gray-900 border-4 pt-10 justify-center  rounded-lg border-gray-700 gap-10'>
          <p className='text-gray-400 text-2xl font-semibold'>Course Upload According To Timeline</p>
          <CourseUploadLineChart courseUploadDate={data?.courseUploadDate} ></CourseUploadLineChart>
        </div>
      </div>

      <p className='text-white py-10 lg1:block hidden'>Admin panel is not Access Onthis Device</p>


    </div>
  )
}

export default Admin
