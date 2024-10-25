import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      //parse() method is used for conver json string data into object data
      totalItems: 0
}

const cartSlice = createSlice({
     name:"cart",
     initialState,
     reducers:{
        setTotalItems(state,value){
           state.totalItems = value.payload;
        }
     }
}); 

export const { setTotalItems} = cartSlice.actions
export default cartSlice.reducer