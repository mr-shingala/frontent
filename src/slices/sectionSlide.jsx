import { createSlice } from "@reduxjs/toolkit";

const initialState = {

   currentSubSectionUrl: "",
   currentSubSectionData:null,
   isFirstVideOfCourse:false,
   isLastVideoOfCourse:false,
   currentSubSectionIndex:0,
   currentSectionIndex:0,
   currentSectionLen:0,
   //for rating & review modal
   currentcourseId:""
}

const sectionSlice = createSlice({
   name: "section",
   initialState,
   reducers: {
      setcurrentSubSectionUrl(state, value) {
         state.currentSubSectionUrl = value.payload;
      },
      setcurrentSubSectionData(state, value) {
         state.currentSubSectionData = value.payload;
      },
      setisFirstVideOfCourse(state, value) {
         state.isFirstVideOfCourse = value.payload;
      },
      setisLastVideoOfCourse(state, value) {
         state.isLastVideoOfCourse = value.payload;
      },
      setcurrentSubSectionIndex(state, value){
         state.currentSubSectionIndex = value.payload;
      },
      setcurrentSectionIndex(state, value){
         state.currentSectionIndex = value.payload;
      },
      setcurrentSectionLen(state, value){
         state.currentSectionLen = value.payload;
      },
      setcurrentcourseId(state, value){
         state.currentcourseId = value.payload;
      }
   }
})

export const { setcurrentSubSectionUrl,setcurrentSubSectionData,setisFirstVideOfCourse ,setcurrentcourseId, setisLastVideoOfCourse ,setcurrentSubSectionIndex,setcurrentSectionIndex, setcurrentSectionLen} = sectionSlice.actions
export default sectionSlice.reducer

