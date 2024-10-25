import React, { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Card = ({
  img,
  price,
  coursename,
  insname,
  id,
  avgrating,
  reviewCount,
}) => {
  
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function getAvgration() {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:3000/api/v1/getAvgRating",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ courseId: id }),
  //         }
  //       );
  //       const data = await response.json();

  //       if (data.success) {
  //         setRating(data.rating);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getAvgration();
  // }, []);

  return (
    <div
      onClick={() => {
        navigate(`/Catelog/course/${id}`);
      }}
      className="w-96 sm:w-72 sm2:w-[100%]  lg1:mx-auto"
    >
      <img className="w-96 rounded-md" src={img} alt="img" />
      <p className="mt-2 mb-1 text-xl truncate">{coursename}</p>
      <p className="text-[#838894] mb-1  truncate">{insname}</p>
      <div className="flex gap-2  items-center text-ellipsis sm2:flex-col sm2:gap-1 sm2:my-4 sm2:items-start ">
        <p className="text-yellow-400 font-semibold text-xl">{avgrating}</p>
        <ReactStars
          count={5}
          size={25}
          value={avgrating}
          edit={false}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
        <p className="text-gray-400">{`(${reviewCount} review)`}</p>
      </div>
      <p className="text-lg  truncate">Rs. {price}</p>
    </div>
  );
};

export default Card;
