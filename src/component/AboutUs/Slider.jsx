import React, { useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { SlidImage } from '../../data/AboutsAs';


const Slider = () => {

   const [data, setData] = useState([])
   const [index,Setindex] = useState(0)
   let arrayData


  useEffect( ()=>{
   async function fetchData() {
    const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getProfileDetails`)
    const  data = await response.json()  
    arrayData = data.data 
     setData(arrayData)
     console.log(arrayData[0].about)
  }
    fetchData();
  },[])

  if(data.length !== 0 ){
     console.log(SlidImage[0].img)
  }

  function decIndex(){
   console.log(data[index])
   if(index <= 0){
     Setindex(data.length -1)
   }else{
      Setindex(index-1)
   }
   
  }

  function incIndex(){
   if(index == data.length-1){
       Setindex(0)
   }else{
      Setindex(index+1)
   } 

  }

  return (
    <div className='w-[100%] 1xl:w-[80%]  mx-auto  relative bg-[url(https://res.cloudinary.com/dlgm6g3gn/image/upload/v1727723610/large-triangles_wzgygt.svg)] gap-24 p-10 md:p-5'>
         <div className='flex  justify-center items-center 1xl:flex-col 1xl:gap-10'>
             <div className=' w-[30%] xl1:w-[100%]'>
                  <img src={`${(data.length === 0)?"https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728925307/user_bgylzi.jpg":data[index].image}`} className='w-60 h-80 md:w-52 md:h-64 rounded-3xl border-4 mx-auto border-gray-800' alt="imh" />
             </div>
             <div className=' w-[70%] 1xl:w-[95%] md:[100%]'>
                  <p className='text-4xl text-white 1xl:text-center md:text-2xl'>{(data.length == 0)?"FirstName LastName":(data[index].firstName+" "+data[index].lastName)}</p>
                  <p className='text-xl text-yellow-100 1xl:text-center md:text-base'>{(data.length == 0)?"abcd2024@gmail.com":(data[index].email)}</p>
                  <div className='mt-10 ml-7 md:ml-0'>
                      {
                        data.length !== 0 ? (data[index].about.map(
                             (data,index)=>(
                                Object.values(data).map((e,index)=>{
                                     return <div key={index} className='flex mb-2 gap-2  text-[17px] md:text-sm items-start justify-start'>
                                      <img src={`${SlidImage[index].img}`} alt="icon" className='w-6 h-6' />
                                      <p className='text-gray-50 text-nowrap md:text-sm'>{`${Object.keys(e)} :-`}</p>
                                      <p className='text-gray-300 line-clamp-1 md:text-sm'>{Object.values(e)}</p>
                                      </div>
                                 })
                                )
                        )) : (<p className='text-green-500'> Data is Loading...</p>)
                      }
                  </div>
             </div>
         </div>
        <div onClick={decIndex} className='p-2 bg-slate-900 rounded-full absolute -left-6 border-2 border-yellow-500 top-[50%]'>
          <FaArrowLeft className='text-yellow-500 text-3xl' />
        </div>
        <div onClick={incIndex} className='p-2 bg-slate-900 rounded-full absolute -right-7 border-2 border-yellow-500 top-[50%]'>
           <FaArrowRight className='text-yellow-500 text-3xl' />
        </div>
    </div>
  )
}

export default Slider
