import { createSlice } from "@reduxjs/toolkit";
import { AccountType } from "../utils/constnt";

const initialState = {
      //parse() method is used for conver json string data into object data
      token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
      signupData: []
}

const authSlice = createSlice({
     name:"auth",
     initialState,
     reducers:{
        setToken(state,value){
           state.token = value.payload;
        },

        setSignupData(state,value){
          const userdata = {
               userinfo:value.payload
         }
          if( state.signupData.length >= 2){
            while (state.signupData.length) {
               array.pop();
           }
          } 
          state.signupData.push(userdata)
      }
     }
}); 

export const {setToken,setSignupData} = authSlice.actions
export default authSlice.reducer