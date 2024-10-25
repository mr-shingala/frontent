import React from 'react'
import { AccountType } from '../utils/constnt'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtecedIns = ({children}) => {
 const {user,id,name,img,profiledata} = useSelector((state)=>state.profile)
 const {token,signupData} = useSelector((state) =>state.auth)
 
  // if(user != AccountType[1]){
   
  //  return <Navigate to="/" />
  // }
 

  return children
}

export default ProtecedIns
