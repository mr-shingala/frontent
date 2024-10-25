import React, { useEffect, useState } from "react";
import { json, Link, NavLink } from "react-router-dom";
import { Menu } from "./NavData";
import { IoIosArrowDropdown } from "react-icons/io";
import "/src/page/style1.css";
import { useDispatch, useSelector } from "react-redux";
import { AccountType } from "../../utils/constnt";
import { FaShoppingCart } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";
import { setCategory } from "../../slices/courseSlice";
import '../../page/style1.css'
import { BsFillMenuButtonWideFill } from "react-icons/bs";

const Navbar = () => {
   const [dataCatelog, setData] = useState([]);


   const token = useSelector((state) => state.auth.token);
   const user = useSelector((state) => state.profile.user);
   const totalItems = useSelector((state) => state.cart.totalItems);
   const dispatch = useDispatch();
   const [isvisible, setIsvisible] = useState(false);

   // useEffect((
   //    dispatch()
   // ) => [totalItems])
   console.log(AccountType[2] == user)


   function afterClick() {
      setIsvisible(true);
   }

   async function getCatalog() {
      try {
         const response = await fetch(
            `${import.meta.env.REACT_APP_BASE_URL}showAllcategorys`
         );
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         const jsonData = await response.json();
         const data = jsonData.data;
         setData(data);

         //send data from react redux store
         const array = [];
         data.map((data, index) => {
            array.push(data.name);
         });
         console.log(array);
         dispatch(setCategory(array));
      } catch (error) {
         console.error("Error fetching data: ", error);
         setData([
            {
               url: "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1728965931/notfound_a9xf4x.png",
               name: "Failed to fetch data. Please try again",
            },
         ]);
      }
   }

   useEffect(() => {
      getCatalog();
   }, []);

   return (
      <div className="bg-[#2C333F] h-16 ">
         <div className="max-w-[1350px] h-[100%] mx-auto flex justify-between sm2:gap-5 sm2:px-4 items-center 1xl:px-8">
            {/* logo */}

            <div className="w-[250px] md:w-[100%]">
               <Link to={"/"}>
                  <img
                     src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725556923/logo_qwmneo.png"
                     alt="logo"
                  />
               </Link>
            </div>


            {/* menu */}
            <div className="flex gap-10 h-[100%] justify-center items-center sm2:hidden">
               {Menu.map((data, index) => {
                  return data.tag === "Catalog" ? (
                     <div
                        className="hover:text-[#DBDDEA] h-[100%]  group cursor-pointer relative items-center  gap-2 text-yellow-400 flex lg1:hidden"
                        key={index}
                     >
                        {data.tag}
                        <IoIosArrowDropdown />
                        <div className="absolute w-[300px]  p-2 group-hover:block group-hover:opacity-100 opacity-0  hidden h-[auto] bg-[#25292f] top-[50px] z-[70] left-[-70px]">
                           {dataCatelog.map((el, index) => {
                              return (
                                 <NavLink
                                    key={index}
                                    to={`Catelog/${el.name.replace("/", "%s")}`}
                                 >
                                    <div className="flex parent hover:bg-slate-950 transition  gap-4 p-2 items-center border-2 border-gray-600 m-2 text-white ">
                                       <img
                                          src={`${el.url}`}
                                          className="h-7 w-7 child "
                                          alt="icon"
                                       />
                                       <p className="child2">{el.name}</p>
                                    </div>
                                 </NavLink>
                              );
                           })}
                        </div>
                     </div>
                  ) : (
                     <Link to={data.link} key={index}>
                        <p
                           key={index}
                           className=" text-[#DBDDEA] hover:text-yellow-400 lg:hidden"
                        >
                           {data.tag}
                        </p>
                     </Link>
                  );
               })}
            </div>
            {/* login */}
            <div className="flex gap-3 items-center lg:hidden">
               {user && user === AccountType[0] && (
                  <Link to="/deshboard/cart" className="relative">
                     <img
                        src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725556939/cart_apjfv6.png"
                        className=" hover:border-yellow-400 h-11 w-11 bg-[#161D29] rounded-md border-gray-500 border-2 p-2"
                        alt="cart"
                     />
                     {totalItems > 0 && (
                        <span className="absolute top-[-4px] right-0 animate-bounce bg-yellow-400 text-black rounded-full text-xs font-bold px-2">
                           {totalItems}
                        </span>
                     )}
                  </Link>
               )}
               {token !== null && user !== AccountType[2] && (
                  <Link to={"/dashboard"}>
                     <div className="text-white py-2  hover:text-yellow-300 hover:border-yellow-400 px-3 bg-[#161D29] rounded-md border-gray-500 border-2 flex gap-2 items-center">
                        <img
                           src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725556908/dashboard_ctmgot.png"
                           alt=""
                           className="h-7 w-7"
                        />
                        Dashboard
                     </div>
                  </Link>
               )}

               {token !== null && user == AccountType[2] && (
                  <Link to={"/admin"}>
                     <div className="text-white py-2  hover:text-yellow-300 hover:border-yellow-400 px-3 bg-[#161D29] rounded-md border-gray-500 border-2 flex gap-2 items-center">
                        <img
                           src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725556908/dashboard_ctmgot.png"
                           alt=""
                           className="h-7 w-7"
                        />
                        Admin
                     </div>
                  </Link>
               )}

               {token === null && (
                  <>
                     <Link to={"/Login"}>
                        <div className="text-white py-2  hover:text-yellow-300 hover:border-yellow-400 px-3 bg-[#161D29] rounded-md border-gray-500 border-2">
                           log in
                        </div>
                     </Link>
                     <Link to={"/SignUp"}>
                        <div className="text-white py-2 px-3 hover:border-yellow-400 hover:text-yellow-300 bg-[#161D29] rounded-md border-gray-500 border-2">
                           sign up
                        </div>
                     </Link>
                  </>
               )}
               {token !== null && user !== AccountType[2] && <ProfileMenu></ProfileMenu>}
            </div>

            {/* responseive */}
            <div
               className="relative  group text-3xl  lg:flex rounded-md border-2 border-gray-500 my-scrollable-div hover:border-yellow-500  bg-[#000814] p-2 hidden"
               onClick={afterClick}
            >
               <BsFillMenuButtonWideFill className="text-white" />
               <div className="absolute bg-[#25292f] w-[300px]   px-4 py-4  top-12 group-hover:block z-[100]  -right-0 hidden group-hover:opacity-100 opacity-0 ">

                  {token !== null && user !== AccountType[2] && <ProfileMenu></ProfileMenu>}

                  {user && user === AccountType[0] && (
                     <Link to="/deshboard/cart" className="relative">
                        <div className="bg-[#161D29] text-base  text-white rounded-md border-gray-500 border-2 group my-2 flex items-center justify-center hover:border-yellow-400 hover:text-yellow-400">
                           <img
                              src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725556939/cart_apjfv6.png"
                              className=" h-11 w-11 p-2"
                              alt="cart"
                           />
                           {totalItems > 0 && (
                              <span className="absolute top-[-4px] right-0 animate-bounce bg-yellow-400 text-black rounded-full text-xs font-bold px-2">
                                 {totalItems}
                              </span>
                           )}
                           Cart
                        </div>
                     </Link>
                  )}
                  {token !== null && user !== AccountType[2] && (
                     <Link to={"/dashboard"}>
                        <div className="text-white justify-center py-2 text-base hover:text-yellow-300 hover:border-yellow-400 px-3 bg-[#161D29] rounded-md border-gray-500 border-2 flex gap-2 items-center">
                           <img
                              src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725556908/dashboard_ctmgot.png"
                              alt=""
                              className="h-7 w-7"
                           />
                           Dashboard
                        </div>
                     </Link>
                  )}

                {token !== null && user === AccountType[2] && (
                     <Link to={"/admin"}>
                        <div className="text-white justify-center py-2 text-base hover:text-yellow-300 hover:border-yellow-400 px-3 bg-[#161D29] rounded-md border-gray-500 border-2 flex gap-2 items-center">
                           <img
                              src="https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725556908/dashboard_ctmgot.png"
                              alt=""
                              className="h-7 w-7"
                           />
                           Admin
                        </div>
                     </Link>
                  )}

                  

                  {token === null && (
                     <>
                        <Link to={"/Login"}>
                           <div className="text-white py-2 flex items-center justify-center my-2  text-base hover:text-yellow-300 hover:border-yellow-400 px-3 bg-[#161D29] rounded-md border-gray-500 border-2">
                              log in
                           </div>
                        </Link>
                        <Link to={"/SignUp"}>
                           <div className="text-white text-base flex items-center justify-center py-2 px-3 hover:border-yellow-400 hover:text-yellow-300 bg-[#161D29] rounded-md border-gray-500 border-2">
                              sign up
                           </div>
                        </Link>
                     </>
                  )}

                  <div className="gap-2 h-[100%] justify-center items-center flex-col text-base  mt-2 w-full ">
                     {Menu.map((data, index) => {
                        return data.tag === "Catalog" ? (
                           <>
                              {/* <p
                                 key={index}
                                 className="border-2 my-2 border-gray-500 text-[#DBDDEA] hover:text-yellow-400 w-full p-2 rounded-md text-center bg-[#161D29]"
                              >
                                 {data.tag}
                              </p> */}
                              <div key={index} className="w-full h-44 overflow-y-scroll my-scrollable-div hidden lg1:block">
                                 <div className="h-[auto] bg-[#25292f] my-3">
                                    {dataCatelog.map((el, index) => {
                                       return (
                                          <NavLink
                                             key={index}
                                             to={`Catelog/${el.name.replace("/", "%s")}`}
                                          >
                                             <div className="flex parent hover:bg-slate-950 transition   gap-4 p-2 items-center border-2 border-gray-600 m-2 text-white ">
                                                <img
                                                   src={`${el.url}`}
                                                   className="h-7 w-7 child "
                                                   alt="icon"
                                                />
                                                <p className="child2">{el.name}</p>
                                             </div>
                                          </NavLink>
                                       );
                                    })}
                                 </div>
                              </div>
                           </>
                        ) : (
                           <Link to={data.link} key={index}>
                              <p
                                 key={index}
                                 className="border-2 my-2 border-gray-500 text-[#DBDDEA] hover:text-yellow-400 w-full p-2 rounded-md text-center bg-[#161D29]"
                              >
                                 {data.tag}
                              </p>
                           </Link>
                        );
                     })}
                  </div>
                  <div></div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
