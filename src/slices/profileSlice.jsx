import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      //parse() method is used for conver json string data into object data
      user: localStorage.getItem("AccountType") ? JSON.parse(localStorage.getItem("AccountType")) : null,
      id:localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id")) : null,
      name:localStorage.getItem("Name") ? JSON.parse(localStorage.getItem("Name")) : null,
      img: 'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1722761555/user_awhm9r.jpg',
      profiledata:[]
}

const profileSlice = createSlice({
     name:"profile",
     initialState,
     reducers:{
        setUser(state,value){
           state.user = value.payload;
        },
        setId(state,value){
         state.id = value.payload;
        },
        setName(state,value){
          state.name=value.payload;
        },
        setImage(state,value){
         state.img = value.payload;
        },
        setPD(state,value){
         state.profiledata = value.payload;
        }
     }
}); 

export const {setUser,setId,setName,setImage,setPD} = profileSlice.actions
export default profileSlice.reducer