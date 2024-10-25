import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute2 = ({children}) => {
 const {user,id,name,img,profiledata} = useSelector((state)=>state.profile)
 const {token,signupData} = useSelector((state) =>state.auth)
 
  if( token || id || user || name || profiledata.length > 0){
    // console.log("hii how")
    console.log(token || id || user || name || profiledata)
    if(user === 'Admin'){
      return <Navigate to="/Admin" />
    }else{
      return <Navigate to="/dashboard" />
    }
   
  }

  return children

}

export default ProtectedRoute2
