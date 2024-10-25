import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AccountType } from '../../utils/constnt'
import { FaEdit } from "react-icons/fa";
import Button from '../homePage/Button';



const GetProfile = () => {
  const img = useSelector((state) => state.profile.img)
  const profiledata = useSelector((state) => state.profile.profiledata)
  const AC = useSelector((state) => state.profile.user)
  const Pd = ["FirstName","LastName","Email","Phone","Country","State","City",`${AccountType[0] === AC  ? 'University' : 'Language'}`,"AccountType","Gender", "dateOfBirth","Profession","About"]

  console.log(profiledata);
  //  console.log( )
  const length = profiledata.length - 1

   
  
  return (
    <div className='w-[100%]  max-w-[1200px] md:overflow-x-scroll'>
      <div className=' items-center flex flex-col gap-6  mt-5'>
        <img src={img} alt="profileImg" className='rounded-full border-4 border-gray-800 h-40 w-40 ' />
        <div className='w-[100%] text-gray-300 px-4 '>
          <table className='max-w-[75%] lg1:min-w-[95%] w-[70%] mx-auto border-spacing-6 md:border-spacing-0 border-separate md:max-w-[100%] '>
            <tbody>
              {
                Pd.map((data, index) => {
                //  console.log(data,profiledata[index] ? (profiledata[index][data] ? (profiledata[9][data]) : ("-",index)) : "-")
                  return (
                       (data === "About") ?
                        (<tr key={index} className='flex flex-col border-4  px-2 py-3  w-[100%] border-gray-800'>
                          <td className='w-[100%]  border-b-0 py-2'>{data}</td>
                          <td className='w-[100%] p-2 rounded-md '>
                            { 
                              
                              (profiledata && profiledata[ profiledata.length - 1] &&  profiledata[ profiledata.length - 1]['About'] === null)?
                              (
                                <p key={index} className='mb-2 text-lg text-gray-100' >-</p>
                              )
                              :(
                              profiledata && profiledata[length] && profiledata[length]['About'] && profiledata[length]['About']?.map((data,index) => ( 
                                 Object.values(data).map((e,index) => {      
                                  console.log(e,Object.keys(e).at(0),Object.values(e).at(0))
                                     return <p key={index} className='text-lg  bg-gray-800 text-gray-300 rounded-md p-2 border-2 border-gray-800 mb-2' ><span className='text-gray-300'>{Object.keys(e).at(0)} :-  </span> {Object.values(e).at(0)}</p>
                                 })
                              ))
                              
                            )

                            }
                    
                          </td>
                        </tr>)
                        :  data === "Language" ? 
                        <tr className='flex flex-col border-4  px-2 py-3  w-[100%] mb-4 border-gray-800' key={index}>
                        <td className='w-[100%]  border-b-0 py-2'>{data}</td>
                        <td className='w-[100%] p-2 rounded-md border-b-0 bg-gray-800 '>
                          {
                            profiledata  && profiledata[index] && profiledata[index]['Language'].length <= 0 &&  <p key={index} className='capitalize text-lg mb-1' >-</p>
                          }
                          {
                               profiledata  && profiledata[index] && profiledata[index]['Language'].map((value,index)=>{
                                  return  <p key={index} className='capitalize text-lg mb-1' >{value ? `${value}` : "-"}</p>
                               })
                          }</td>
                        </tr> 
                        :<tr className=' flex flex-col border-4  px-2 py-3  w-[100%] mb-4 border-gray-800' key={index}>
                          <td className='w-[100%]  border-b-0 py-2'>{data}</td>
                          <td className='w-[100%] p-2 rounded-md border-b-0 bg-gray-800 '> {profiledata[index] ? (profiledata[index][data] ? (profiledata[index][data]) : ("-")) : "-"}</td>
                        </tr>
                  )
                })
              }
            </tbody>
          </table>
          <div className='w-[63%] flex mx-auto justify-end mt-2 mb-10 text-black md:mt-10  md:w-[100%]'>
            <Button text={'Edit'} active={true} linkto={'/dashboard/Edit Profile'} icon={<FaEdit />}></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetProfile
