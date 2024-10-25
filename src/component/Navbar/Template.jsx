// import React, { useState, useEffect } from 'react'
// import SignupFrom from './SignupFrom'
// import LoginFrom from './LoginFrom'
// import {signupData} from '../../slices/authSlice'
// import { useDispatch } from 'react-redux';

// const Template = (props) => {

//   const [state, setState] = useState("Student")
//   const array = ["Student", "Instructor"]
//   const dispatch = useDispatch()
//   // dispatch(setSignupData(data.accountType))
//   // const dispatch = us

//    useEffect(()=>{
//     dispatch(setSignupData(signupData["accountType"] = state))
//    },[state])

//   function onButton(data) {
//     setState(data)
//   }

//   return (
//     <div className='bg-[#000814]  min-h-[91vh]'>
//       <div className='flex max-w-[1300px] mx-auto pt-24'>
//         <div className='w-[50%] pl-6'>
//           <div>
//             <p className='text-3xl font-semibold text-white'>{props.h1}</p>
//             <p className='text-lg text-gray-400 mt-4 w-[70%]'>{props.text}<span className='italic text-[#47A5C5] text-lg'>{props.span}</span></p>
//             {props.type !== "login" &&
//               (<div className=' mt-5 bg-[#161d29] w-auto h-auto inline-block p-2 rounded-full mb-5'>
//                 {array.map((data,index) => {
//                   return (
//                     <p className={`text-[#F1F2FF] font-medium cursor-pointer text-lg inline px-4 py-1 rounded-full ${state === array[index] ? "bg-[#000814]" : "bg-inherit"}`} key={index} onClick={() => { onButton(array[index], index) }}>{array[index]}</p>
//                   )
//                 })}
//                </div>)          
//             }
            
//           </div>
//           <div>
//             {
//               (props.type == "login")
//                 ? <LoginFrom></LoginFrom>
//                 : <SignupFrom></SignupFrom>
//             }
//           </div>
//         </div>
//         <div className='w-[50%]'>
//           {
//                (state == "Instructor")
//                 ? <img src={`${props.imgurl2}`} className='rounded-tl-[100px] h-[500px] rounded-br-[100px]' alt="" />
//                 : <img src={`${props.imgurl}`} className='rounded-tl-[100px] h-[500px] rounded-br-[100px]' alt="" />
//           }

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Template

import React, { useState, useEffect } from 'react';
import SignupForm from './SignupFrom';
import LoginForm from './LoginFrom';
import {setSignupData} from '../../slices/authSlice'; // Make sure setSignupData is imported
import { useDispatch } from 'react-redux';

const Template = (props) => {
  const [state, setState] = useState('Student');
  const array = ['Student', 'Instructor'];
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setSignupData(state));
    
  // }, [state]);

  function onButton(data) {
    setState(data);
  }

  return (
    <div className='bg-[#000814] min-h-screen '>
      <div className='flex max-w-[1300px] mx-auto pt-24 xl1:pt-10 items-center justify-center xl1:flex-col-reverse xl1:gap-10'>
        <div className={`pl-6  xl1:pl-0 xl1:flex-col xl1:flex xl1:items-center  ${props.type !== 'login' ?"w-[50%] xl1:w-[100%]":"w-[40%]  xl1:w-[100%]"}`}>
          <div className=' xl1:text-center xl1:w-[500px] sm1:w-[90%]'>
            <p className='text-3xl font-semibold text-white'>{props.h1}</p>
            <p className='text-lg text-gray-400 mt-4 w-[70%] xl1:w-[90%] md:w-[100%]'>
              {props.text}
              <span className='italic text-[#47A5C5] text-lg'>{props.span}</span>
            </p>
            {props.type !== 'login' && (
              <div className='mt-5 bg-[#161d29] w-auto h-auto inline-block p-2 rounded-full mb-5'>
                {array.map((data, index) => {
                  return (
                    <p
                      className={`text-[#F1F2FF] font-medium cursor-pointer text-lg inline px-4 py-1 rounded-full ${state === array[index] ? 'bg-[#000814]' : 'bg-inherit'}`}
                      key={index}
                      onClick={() => {
                        onButton(array[index]);
                      }}
                    >
                      {array[index]}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div className=' xl1:w-[500px] sm1:w-[90%] xl1:mb-10'>
            {props.type === 'login' ? <LoginForm /> : <SignupForm state={state} />}
          </div>
        </div>
        <div className='w-[50%] xl1:w-[90%] '>
          {state === 'Instructor' ? (
            <img
              src={`${props.imgurl2}`}
              className='rounded-tl-[100px] lg:rounded-tl-[70px] xl1:mx-auto h-[500px] rounded-br-[100px] lg:rounded-br-[70px] border-8 border-gray-700 xl1:max-h-[350px] sm2:h-[200px] sm2:lg:rounded-tl-[50px] sm2:lg:rounded-br-[50px]'
              alt=''
            />
          ) : (
            <img
              src={`${props.imgurl}`}
              className='rounded-tl-[100px] lg:rounded-tl-[70px] xl1:mx-auto h-[500px] rounded-br-[100px] lg:rounded-br-[70px] border-8 border-gray-700 xl1:max-h-[350px] sm2:h-[200px] sm2:lg:rounded-tl-[50px] sm2:lg:rounded-br-[50px]'
              alt=''
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Template;