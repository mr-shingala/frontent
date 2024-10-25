import { createSlice } from "@reduxjs/toolkit";
import { FunctioId } from '../utils/constnt';

const initialState = {
 modaldata: {
  icon: null,
  heading: null,
 },
 id: FunctioId[0],
 fleg: false,
 subSectionFleg: false,
 subSectionData: null,
 IdDeleteSubSection: null
}

const modalSlice = createSlice({
 name: "modal",
 initialState,
 reducers: {
  setFleg(state, value) {
   state.fleg = value.payload;
  },
  setId(state, value) {
   state.id = value.payload;
  },
  setData(state, value) {
   state.modaldata= {
    icon: value.payload.icon,
    heading: value.payload.heading,
   }
  },
  setSubSectionFleg(state, value){
     state.subSectionFleg = value.payload
  },
  setSubsectionData(state,value){
     state.subSectionData = value.payload
  },
  setIdDeleteSubSection(state,value){
   state.IdDeleteSubSection = value.payload
  }
 }

});

export const { setFleg, setId, setData,setSubSectionFleg,setSubsectionData,setIdDeleteSubSection } = modalSlice.actions
export default modalSlice.reducer