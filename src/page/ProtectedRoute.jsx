import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
   const {user,id,name,img,profiledata} = useSelector((state)=>state.profile)
   const {token,signupData} = useSelector((state) =>state.auth)
   
    if(!user|| !id || !name  || profiledata == [] || !token || signupData == []){
      console.log(user,id ,name ,profiledata,token,signupData )
     return <Navigate to="/" />
    }
   

    return children
 
}

export default ProtectedRoute
