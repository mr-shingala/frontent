import React, { useEffect, useState } from "react";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { MdDone } from "react-icons/md";
import CourseContent from "./CourseContent";
import { FaFeatherPointed } from "react-icons/fa6";
import { toast } from "react-toastify";
import { setTotalItems } from "../../slices/cartSlice";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { load } from "@cashfreepayments/cashfree-js";
import { useSelector } from "react-redux";
import { CgLogIn } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FunctioId, loginCourse } from "../../utils/constnt";
import { setFleg, setId, setData } from "../../slices/modalSlice";
import { FaShareFromSquare } from "react-icons/fa6";
// import { setTotalItems } from '../../slices/cartSlice'


const Desci = ({ course }) => {
  const [linecamp1, setLinecamp1] = useState(false);
  const [linecamp2, setLinecamp2] = useState(false);
  let totalItems = useSelector(state => state.cart.totalItems)

  //  console.log(Object.values(course?.instructor?.about[1]))
  //console.log(course?.instructor?.about[0][0]['education'])

  function ShareLink(e) {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast.success('URL copied to clipboard!', {
          hideProgressBar: true,
          totalDuration: 500,
          position: "top-center"
        });
      })
      .catch(err => {
        toast.success.error('Failed to copy URL', {
          hideProgressBar: true,
          totalDuration: 500,
          position: "top-center"
        });
      });
  }

  async function addItem(e, id) {
  
    e.preventDefault();
    if (!Cookies.get("token", { domain: "/" }) || !token) {
      //open domin
      dispatch(setFleg(true));
      dispatch(setId(FunctioId[6]));
      dispatch(setData({ icon: loginCourse, heading: "Login!" }));
      return null;
    }

    try {
      const response = await fetch(`${import.meta.env.REACT_APP_BASE_URL}addItem`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`${data.message}`, {
          position: "top-center",
          hideProgressBar: true,
          autoClose: 500,
        });
        dispatch(setTotalItems(data.length));
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          hideProgressBar: true,
          autoClose: 500,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }



  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [orderId, setOrderId] = useState(null);
  let orderId ;

  const enrollStudent = async (cid) => {
    console.log("step 9: enroll the student function is run", cid);
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}enrollStudentPayment`,
        {
          method: "POST", // Use POST method as it's typically used for creating or updating resources
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            courseId: cid,
          }), // Convert the request body to a JSON string
        }
      );

      const data = await response.json(); // Parse the JSON response
      console.log("step 9: api call resonse is ", data);
      if (data.success) {

        console.log("step 10:Enrollment successful:", data.message);
        dispatch(setTotalItems(totalItems - 1))
        navigate("/dashboard/Enroll Courses");
      } else {
        console.log("Enrollment failed:", data.message);
      }
    } catch (error) {
      console.error("Error during the fetch operation:", error.message);
    }
  };

  // useEffect(() => {
  //    console.log("👍⭐",orderId)
  // },[orderId])

  let cashfree;
  let Oid;

  let insitialzeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  insitialzeSDK();

  const getSessionId = async (id, price) => {
    console.log("step 0.1: getSessionId function is called", id, price);
    try {
      let response = await fetch(
        `${import.meta.env.REACT_APP_BASE_URL}capturePayment`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            courseId: id,
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

  async function handelPayment(e, id, price) {
    //add validation user is log in or not
    // console.log(Cookies.get())

    if (!Cookies.get("token", { domain: "/" }) || !token) {
      //open domin
      dispatch(setFleg(true));
      dispatch(setId(FunctioId[6]));
      dispatch(setData({ icon: loginCourse, heading: "Login!" }));
      return null;
    }

    e.preventDefault();
    try {
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

          console.log("step 4: call verifypayment function", orderId, id, Oid);

          verifyPayment(Oid, id);
        })
        .catch((error) => {
          console.log("Error in cashfree.checkout:", error.message);
        });
    } catch (error) {
      console.log("Error in handelPayment:", error.message);
    }
  }

  //console.log(course);
  return (
    <div className="w-full  mx-auto relative ">
      {/* section 1 */}
      <div className="bg-[#2C333F] relative xl2:px-10 sm:px-5 sm1:px-2 sm:pb-0 xl2:pb-5">
        <div className="max-w-[1350px] p-5  xl2:p-0 flex min-h-72 mx-auto relative xl2:flex-col xl2:gap-10">
          <div className="flex flex-col w-[72%] xl2:w-[100%]  xl2:border-r-0 border-r-2 border-gray-600 pr-5 sm:pr-0">
            <p className="my-5 text-gray-300 text-xl font-semibold">
              Home / Learning /{" "}
              <span className="text-yellow-400">{course.category}</span>
            </p>
            <p className="text-white text-3xl font-bold sm1:text-2xl ">{course.title}</p>
            <p className="my-4 text-lg text-gray-400  sm:text-base ">
              {course.shortDesciption}
            </p>
            <div className="flex gap-2 mb-1 pb-2 text-lg sm:flex-col">
              <div className="flex gap-2">
              <p className="text-yellow-400 font-semibold text-2xl">{course?.AvgRating}</p>
              <ReactStars
                count={5}
                size={35}
                value={course?.AvgRating}
                edit={false}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
              </div>
              <p className="text-gray-400">{`(${course?.ratingAndReview?.length} review)`}</p>
              <p className="text-gray-400">
                {course?.student?.length} students enroll
              </p>
            </div>
            <div className="mb-2">
              <p className="text-gray-300 text-lg">
                Created by{" "}
                <span className="text-xl text-yellow-100 font-semibold italic">
                  {course.instructor?.firstName} {course.instructor?.lastName}
                </span>
              </p>
            </div>
            <div className="mb-2 text-gray-200 flex gap-5 text-lg  md:flex-col md:items-start md:gap-1">
              <p className="flex justify-center items-center gap-1">
                <MdOutlinePublishedWithChanges className="" />
                Last updated : {course?.updatedAt?.split("T")?.at(0)}
              </p>
              <p className="flex justify-center items-center gap-1">
                <MdCreateNewFolder /> Created at : {course?.cratedAt}
              </p>
              <p className="flex justify-center items-center gap-1">
                <MdOutlineLanguage /> {course.courseLanguage}
              </p>
            </div>
          </div>

          <div className="absolute right-0 top-8 xl2:static  ">
            <div className="bg-gray-800 w-[350px] xl2:w-[100%]   xl2:flex xl2:items-start  xl2:gap-5  lg1:flex-col xl2:p-5 sm:px-2 sm2:px-1">
              <img src={course.thumbnail} className="w-[350px] xl2:w-[400px] sm1:w-[95%] xl:w-[60%] mx-auto " alt="img" />
              <div className="px-4  xl2:flex xl2:gap-5  xl2:w-[100%] xl:flex-col">
                <div className="xl2:w-[50%] xl:w-[100%]">
                <p className="text-white text-3xl my-4">Rs. {course.price}</p>
                <button
                  onClick={(e) => addItem(e, course._id)}
                  className="w-[100%] font-semibold rounded-md bg-yellow-400 border-[1px] border-yellow-100 py-2 mb-4 mt-3 text-black round-md"
                >
                  Add to Cart
                </button>
                <button
                  onClick={(e) => handelPayment(e, course._id, course.price)}
                  className="w-[100%] font-semibold bg-[#161D29] border-[1px] border-gray-700 py-2 text-white rounded-md"
                >
                  Buy now
                </button>
                </div>
                <div className="mt-5 xl2:mt-0 pb-8  xl2:pb-0">
                  <p className="text-gray-200 text-lg mb-1 xl2:mb-3">
                    This course includes:
                  </p>
                  {course?.courseInclude?.length > 0 &&
                    course?.courseInclude[0]?.split(",").map((data, index) => {
                      return (
                        <p key={index} className="text-gray-400  pl-4">
                          {data}
                        </p>
                      );
                    })}
                  <div className="mt-10 flex flex-col justify-center items-center">


                    <p
                      className="text-yellow-400 text-xl cursor-pointer "
                      onClick={(e) => ShareLink(e)}
                    >
                      <FaShareFromSquare />
                    </p>
                    <p
                      className="text-yellow-400 mt-1 cursor-pointer "
                      onClick={(e) => ShareLink(e)}
                    >
                      Share
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div className="bg-[#000814] mx-auto ">
        <div className="max-w-[1350px] xl2:px-10 md:px-5  flex min-h-[100vh]  mx-auto">
          <div className="w-[72%] pt-10  xl2:w-[100%]">
            <div className="border-2 mb-16 border-gray-800 w-full p-7 flex flex-col">
              <p className="text-gray-200 text-3xl mb-2 text-wrap">
                What you'll learn
              </p>
              {course?.whatYouLern?.length > 0 &&
                course?.whatYouLern[0].split(".").map((data, index) => {
                  return (
                    data &&    <div
                      className="text-gray-400 text-lg pl-3 break-words flex items-baseline gap-2"
                      key={index}
                    >
                      <p className="">
                        <MdDone className="font-bold" />
                      </p>
                      <p className="break-words w-[92%] inline">{data.replace(",","")}.</p>
                    </div>
                  );
                })}
            </div>

            <CourseContent
              content={course}
              totalduration={course.totalDuration}
            ></CourseContent>

            <div className="mt-16 sm:ml-2 sm:mr-3">
              <p className="text-white text-3xl mb-3 font-bold">Requirements</p>
              <ul className="text-gray-400 list-disc">
                {course?.Requirements?.length > 0 &&
                  course?.Requirements[0].split(".").map((data, index) => {
                    return (
                      data && <li key={index} className="ml-7 pb-1 ">
                        {data.toString().replace(",","")}.
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="mt-16 sm:ml-2 sm:mr-3">
              <p className="text-white text-3xl mb-3 font-bold">Benefits</p>
              <p
                className={`text-gray-400 indent-7 text-justify ${!linecamp1 && "line-clamp-4"
                  } `}
              >
                {course.Benefits}
              </p>
              <p
                className="text-gray-600 mt-3 italic underline cursor-pointer"
                onClick={() => {
                  setLinecamp1(!linecamp1);
                }}
              >
                {linecamp1 ? "Show Less" : "Show More"}
              </p>
            </div>

            <div className="mt-16 sm:ml-2 sm:mr-3">
              <p className="text-white text-3xl mb-3 font-bold">description</p>
              <p
                className={`text-gray-400 indent-7 text-justify ${!linecamp2 && "line-clamp-4"
                  } `}
              >
                {course.description}
              </p>
              <p
                className="text-gray-600 mt-3 italic underline cursor-pointer"
                onClick={() => {
                  setLinecamp2(!linecamp2);
                }}
              >
                {linecamp2 ? "Show Less" : "Show More"}
              </p>
            </div>

            <div className="mt-16 sm:ml-2 sm:mr-3">
              <p className="text-white text-3xl mb-3 font-bold">Author</p>
              <div>
                <div className="flex gap-5 mb-4 mt-4 items-center">
                  <img
                    src={course.instructor?.image}
                    className="rounded-full h-20 w-20"
                    alt=""
                  />
                  <p className="text-gray-300 text-xl">
                    {course?.instructor?.firstName} {course?.instructor?.lastName}
                  </p>
                </div>
                <div className="mb-10">
                  <div className="text-gray-400 flex items-center gap-2">
                  <div><FaFeatherPointed />{" "}</div>
                    {course?.instructor?.about[0][0]['education']}
                  </div>
                  <div className="text-gray-400 flex items-center gap-2">
                  <div><FaFeatherPointed />{" "}</div>
                    {course?.instructor?.about[0][6]['lifePhilosophy']}
                  </div>
                  <div className="text-gray-400 flex items-center gap-2">
                    <div><FaFeatherPointed />{" "}</div>
                    {course?.instructor?.about[0][1]['pastExperience']}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desci;
