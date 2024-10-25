import React, { useEffect, useState } from 'react'
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { setTotalItems } from '../slices/cartSlice'
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { CgLogIn } from 'react-icons/cg';
import { load } from "@cashfreepayments/cashfree-js";
import { ToastContainer, toast } from 'react-toastify';

function Cart() {

  const [cartData, setcartData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [Loading, setLoading] = useState(false)
  const [total, setToatal] = useState(0);
  const [courseId, setCourseTd] = useState([])
  const token = useSelector((state) => state.auth.token);
  // const [orderId, setOrderId] = useState(null);

  let orderId;

  // useEffect(()=> {
  //   console.log(courseId.length);
  // },[])

  function totalAmount() {
    setToatal(0)
    setCourseTd([])
    if (cartData.length > 0) {
      cartData.map(data => {
        setToatal(prevCount => prevCount + data.price)
        console.log(data.price)
        console.log(total)
      })
    }
    if (cartData.length > 0) {
      cartData.map(data => {
        console.log(data._id)
        setCourseTd((previd) => [
          ...previd, data._id])
        console.log(courseId)
      })
    }
  }

  async function apiCall() {
    setLoading(true)
    fetch(`${import.meta.env.REACT_APP_BASE_URL}getItem`, {
      method: 'GET',
      credentials: 'include', // This ensures cookies are sent along with the request
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //console.log('Success:', data);
        setcartData(data.cartItems)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false)
      });

  }

  async function resetCart(e) {
    e.preventDefault()
    setLoading(true)
    try {
      fetch(`${import.meta.env.REACT_APP_BASE_URL}clearCart`, {
        method: 'DELETE',
        credentials: 'include', // This ensures cookies are sent along with the request
        headers: {
          'Content-Type': 'application/json',
          // Include any other headers if necessary (e.g., Authorization)
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            apiCall()
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  async function removeItem(e, id) {
    e.stopPropagation()
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}removeItem`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: id
        })
      })
      const data = await response.json()
      console.log(data)
      if (data.success) {
        console.log("true")
        apiCall()
      }

    }
    catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    apiCall()
    totalAmount()
  }, [])



  useEffect(() => {
    dispatch(setTotalItems(cartData.length))
    totalAmount()
  }, [cartData])

  // ========================================================================================================

  //payment id 


  let cashfree;
  let Oid;

  let insitialzeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  insitialzeSDK();

  const getSessionId = async (id, price) => {
    console.log("step 0.1: getSessionId function is called", courseId.length, price);

    try {
      let response = await fetch(
        `{import.meta.env.REACT_APP_BASE_URL}capturePayment`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            courseIdList: courseId,
            price: price,
          }),
        }
      );

      let res = await response.json();
      console.log("step 0.2: res of api capture payment", res);
      if (res?.success === false) {
        toast.error(res?.message, {
          position: "top-center",
          hideProgressBar: true,
          totalDuration: 500,
        });
        return null;
      } else if (res && res?.payment_session_id) {
        console.log("step 0.3: get order id", res?.order_id);
        Oid = res.order_id;
        orderId = res?.order_id;
        console.log("step 0.4: set order id", res?.order_id);
        console.log("step 0.5: return session id", res?.payment_session_id);
        return res?.payment_session_id;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  async function verifyPayment(orderid, cid) {
    console.log("step 5: run verifypayment function", orderid, cid, orderId);
    if (!orderid) {
      toast.info("null");
      return;
    }

    console.log("step 6: api is call");
    try {
      let response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}signatureVerification`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            orderId: orderid,
          }),
        }
      );
      let res = await response.json();
      console.log("step 6: this is verify email response ", res);
      if (res?.success === false) {
        toast.error("payment is not verify successfully", {
          position: "top-center",
          hideProgressBar: true,
          totalDuration: 2000,
        });
      } else if (res.success && res.message) {
        toast.success(`payment is ${res.message}`, {
          position: "top-center",
          hideProgressBar: true,
          totalDuration: 1000,
        });
        console.log("step 7: check verify email response ", res.message);
        if (res.message === "SUCCESS") {
          console.log("step 8: enroll the student function is call", cid);
          enrollStudent(cid);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handelPayment(e, price) {


    e.preventDefault();
    try {
      const id = courseId[0]
      console.log(id)
      let sessionId = await getSessionId(id, price);
      console.log("step 1: ", sessionId, "=", orderId);
      if (!sessionId) {
        return null;
      }

      console.log("step 2: checkoutOptions", orderId);
      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      await cashfree
        .checkout(checkoutOptions)
        .then((res) => {
          console.log("step 3: Payment initialized", res, orderId, Oid);
          toast.info(res?.paymentDetails?.paymentMessage, {
            position: "top-center",
            hideProgressBar: true,
            totalDuration: 1000,
          });

          console.log("step 4: call verifypayment function", orderId, courseId[0], Oid);

          verifyPayment(Oid, courseId[0]);
        })
        .catch((error) => {
          console.log("Error in cashfree.checkout:", error.message);
        });
    } catch (error) {
      console.log("Error in handelPayment:", error.message);
    }
  }

  const enrollStudent = async (cid) => {
    console.log("step 9: enroll the student function is run", cid);
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}cartEnrollCourse`,
        {
          method: "POST", // Use POST method as it's typically used for creating or updating resources
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            courseIdList: courseId,
          }), // Convert the request body to a JSON string
        }
      );

      const data = await response.json(); // Parse the JSON response
      console.log("step 9: api call resonse is ", data);
      if (data.success) {
        console.log("step 10:Enrollment successful:", data.message);
        dispatch(setTotalItems(0))
        navigate("/dashboard/Enroll Courses");
      } else {
        console.log("Enrollment failed:", data.message);
      }
    } catch (error) {
      console.error("Error during the fetch operation:", error.message);
    }
  };

  // ========================================================================================================


  return (
    <div className='min-h-[100vh] w-full bg-[#000814]'>
      <div className='mx-auto w-[1350px] min-h-[100vh] py-10 px-5 xl2:w-[100%]'>
        <p className='text-gray-400' >Home / Dashboard / <span className='text-yellow-400'>Cart</span></p>

        <p className='text-white text-3xl font-semibold mt-3 my-7 sm1:text-2xl ' >Checkout</p>
        {
          Loading ? <p className='text-3xl text-yellow-400 font-semibold'>Loading..</p> : <>

            <p className='text-gray-400'>{cartData.length > 0 && "Order Summary"}</p>
            {
              cartData.length <= 0 && <p className='text-gray-400 text-xl text-center border-2 border-gray-600 py-5'>Cart is empty</p>
            }
            <div className='mt-0 mb-5 flex gap-12 items-start  xl:flex-col xl:gap-5 xl:items-center' >

              <div className='w-[70%] xl:w-[90%]'>
                {
                  cartData.map((data, index) => {
                    return <div key={index} onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/Catelog/course/${data._id}`)
                    }} className='cursor-pointer relative flex gap-5 py-5 border-b-2 border-gray-700 my-5 md:flex-col'>
                      <div>
                        <img src={data.thumbnail} alt="img" className='w-52 rounded-md' />
                      </div>
                      <div className='flex flex-col w-full'>
                        <div className='flex justify-between  md:flex-col '>
                          <p className='text-white text-lg '>{data.title}</p>
                          <p className='text-2xl font-bold text-yellow-400 md:text-lg'>Rs. {data.price}</p>
                        </div>
                        <p className='text-gray-400 '>{data.instructor?.firstName} {data.instructor?.lastName}</p>
                        <div className="flex gap-2  text-lg  md:flex-col md:gap-2">
                          <div className='flex gap-1 '>
                            <p className="text-yellow-400 font-semibold">{data?.AvgRating}</p>

                            <p>
                              <ReactStars
                                count={5}
                                size={25}
                                value={data?.AvgRating}
                                edit={false}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"

                              />
                            </p>
                          </div>
                          <p className="text-gray-400">{`(${data?.ratingAndReview?.length} review)`}</p>
                          <p className="text-gray-400">
                            {data?.student?.length} students
                          </p>
                        </div>
                        <div className='mt-2'>
                          <div className="flex gap-3 items-center text-gray-400 md:flex-col md:gap-2 md:items-start">
                            <p>{data?.courseContent?.length} sections</p>
                            <RxDotFilled className='md:hidden' />
                            <p>{data.totalDuration} total length</p>
                          </div>
                        </div>
                      </div>

                      <button onClick={(e) => { removeItem(e, data._id) }} className='absolute right-0 bottom-4 z-[10]'><img src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725559013/delete_1_xzjfvd.png" className='h-10 w-10' alt="" /></button>

                    </div>
                  })
                }
              </div>
              {
                cartData.length > 0 && <div className='w-[30%] border-2 border-gray-600 flex flex-col justify-between p-5 rounded-md xl:w-[90%]'>
                  <p className='text-white text-3xl font-semibold' >Payment Details</p>
                  <div className='flex justify-between mt-6 sm2:flex-col'>
                    <p className='text-gray-400 text-lg'>Total Item</p>
                    <p className='text-white text-xl font-semibold'>{courseId.length}</p>
                  </div>
                  <div className='flex justify-between mt-6 sm2:flex-col'>
                    <p className='text-gray-400 text-lg'>Total Amount</p>
                    <p className='text-white text-xl font-semibold'>Rs. {total}/-</p>
                  </div>
                  <button className='mb-4 mt-6 py-2 rounded-md text-lg font-semibold bg-yellow-400' onClick={(e) => handelPayment(e, total)} >Pay Rs. {total}/-</button>
                </div>
              }

            </div>
            {
              cartData.length > 0 && <button onClick={(e) => resetCart(e)} className='mb-16 xl:mt-5 xl:ml-[7%] mt-10 bg-yellow-400 py-2 px-4 rounded-md text-lg font-semibold'>Reset</button>
            }
          </>
        }
      </div>
    </div>
  )
}

export default Cart
