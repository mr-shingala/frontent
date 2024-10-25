import React from 'react'
import { useSelector } from 'react-redux'
import { AccountType } from '../utils/constnt'
import { Navigate } from 'react-router-dom'

const IsStudet = ({children}) => {
 const {user,id,name,img,profiledata} = useSelector((state)=>state.profile)
 const {token,signupData} = useSelector((state) =>state.auth)
 
  if(user != AccountType[0]){
    console.log(user,id ,name ,profiledata,token,signupData )
   return <Navigate to="/" />
  }
 

  return children
}

export default IsStudet
