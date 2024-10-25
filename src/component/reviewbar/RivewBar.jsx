import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState,useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import Rcart from "../reviewbar/Rcart";
import { Pagination, Keyboard, Mousewheel, Autoplay, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/zoom'; // Import zoom styles
import '../../page/style1.css'

const RivewBar = () => {

 const [ratings, setRatings] = useState([]);

 // Fetch data from the API
 useEffect(() => {
   const fetchRatings = async () => {
     try {
       const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}getAllRating`);
       const result = await response.json();
       
       if (result.success) {
         setRatings(result.data);  // Store data in state
       } else {
         console.error("Failed to fetch ratings:", result.message);
       }
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };

   fetchRatings();
 }, []);

 return (
  <div className="mx-auto md:px-5 max-w-[1200px]  sm:px-0">
   <p className="text-4xl  md:text-2xl text-center font-semibold mb-10 text-white">Review from other lerners</p>
   <Swiper
    spaceBetween={20}
    // navigation={true}
    loop={true}
    slidesPerView={1}
    pagination={{ clickable: true }}
    autoplay={{ delay: 1200, disableOnInteraction: false }}
    modules={[Pagination, Keyboard, Mousewheel, Autoplay]}
    keyboard={{ enabled: true }} // Enable keyboard controls
    mousewheel={true} // Enable mousewheel controls
    className={`mb-6 pb-12`}
    breakpoints={{
        750:{
          slidesPerView:2,
          spaceBetween:40
        },
        1240:{
          slidesPerView:3
          
        },
        

    }}
   >
     {
        ratings.map((data,index)=>{
           return <SwiperSlide className=""><Rcart data={data} key={index}></Rcart></SwiperSlide>
        })
     }
   </Swiper>
  </div>
 );
};

export default RivewBar;
