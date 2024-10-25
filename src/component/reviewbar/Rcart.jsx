import React from 'react'
import ReactStars from "react-rating-stars-component";

const Rcart = ({data}) => {
  // console.log(data)
  return (
    <div className='bg-gray-800 p-3 min-h-64 flex flex-col rounded-md justify-between  mx-auto'>
        <div className='flex gap-3 mb-3 sm2:text-sm'>
           <img src={`${data?.student?.image}`} alt="img" className='h-12 w-12 rounded-full whitespace-nowrap' />
           <div>
              <p className='text-gray-300'>{data.student?.firstName} {data.student?.lastName}</p>
              <p className='text-gray-300 text-wrap '>{data.student?.email}</p>
           </div>
        </div>
        <div>
           <p className='text-gray-400 my-3  px-2 line-clamp-4'>{data?.review}</p>
        </div>
        <div className='flex gap-2 items-center'>
        <p className="text-yellow-400 font-semibold text-2xl sm2:text-xl">{data?.rating}</p>
              <ReactStars
                count={5}
                size={window.innerWidth < 310 ? 20 : 35}
                value={data?.rating}
                edit={false}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              
              />
        </div>
    </div>
  )
}

export default Rcart
