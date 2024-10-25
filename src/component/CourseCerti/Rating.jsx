import React from 'react'
import { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { useDispatch } from 'react-redux';
import { setFleg } from '../../slices/modalSlice'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Rating = () => {

 const [review, setReview] = useState('');
 const token = useSelector((state) => state.auth.token)
 const [isSubmitting, setIsSubmitting] = useState(false);
 const url = useLocation()
 const courseId = url.pathname.split("/").at(-1)
 const [rating,setrating] = useState(0)

 const maxReviewLength = 350;
 const ratingChanged = (newRating) => {
      setrating(newRating);
 };

 const dispatch = useDispatch()

 function terminate() {
  dispatch(setFleg(false))
 }


 const handleReviewChange = (e) => {
  if (e.target.value.length <= maxReviewLength) {
   setReview(e.target.value);
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
   const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}createRating`, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
     courseId: courseId,
     rating: rating,
     review: review, // Add review as needed
    }),
    credentials:"include"
   });

   const data = await response.json();

   if (response.ok) {
    toast.success(data.message,{
      position:"top-center",
      hideProgressBar:"true"
    }); // Success message
   } else {
    toast.error(data.message,{
     position:"top-center",
     hideProgressBar:"true"
   }); // Error message
   }

  } catch (error) {
   toast.error('Something went wrong!'); // Toast for unexpected errors
   console.error(error);
  } finally {
   setIsSubmitting(false);
  }
 }



 return (
  <div className='w-[100%]'>
   <form onSubmit={handleSubmit}>
    <ReactStars
     count={5}
     onChange={ratingChanged}
     size={window.innerWidth < 300 ? 30 : 40}
     isHalf={true}
     emptyIcon={<i className="far fa-star"></i>}
     halfIcon={<i className="fa fa-star-half-alt"></i>}
     fullIcon={<i className="fa fa-star"></i>}
     activeColor="#ffd700"
    />
    <label className='text-xl text-gray-200'>Review : </label>
    <br />
    <textarea
     value={review}
     onChange={handleReviewChange}
     placeholder="Write your review..."
     maxLength={maxReviewLength}
     className='mt-3 w-[100%] min-h-[80px] outline-none rounded-md bg-gray-600 text-gray-200 p-1'
    />
    <p className='text-gray-400'>
     {review.length}/{maxReviewLength} characters
    </p>

    <div className='mt-8 flex-wrap  justify-center  flex  gap-7 items-center'>
     <button type="submit" className='bg-yellow-400 border-2 border-yellow-200 py-2 px-4 rounded-lg font-semibold' disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Submit'}
     </button>
     <div className='bg-gray-950 py-2 px-4 border-2 border-gray-600 rounded-lg font-semibold text-gray-300 cursor-pointer' onClick={terminate} >Cancel</div>
    </div>
   </form>
  </div>
 )
}

export default Rating
