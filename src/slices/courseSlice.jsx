import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 course: [],
 step: 1,
 category:[],
 update:false,
 courseId:null,
 deleteSectionId:null,
 deleteSectionfleg:false,
 isSubsectioncreating:false,
 deleteSubsectionSectionId:null
}

const courseSlice = createSlice({
 name: "addcourse",
 initialState,
 reducers:{
    setStep(state,action){
        state.step = action.payload
    },
    setCourse(state,action){
     state.course = action.payload
    },
    setCategory(state,action){
      state.category = action.payload
    },
    setUpdate(state,action){
      state.update = action.payload
    },
    setcourseId(state,action){
      state.courseId = action.payload
    },
    setdeleteSectionId(state,action){
      state.deleteSectionId = action.payload
    },
    setdeleteSectionfleg(state,action){
      state.deleteSectionfleg = action.payload
    },
    setIsSubsectioncreating(state,action){
      state.isSubsectioncreating = action.payload
    },
    setdeleteSubsectionSectionId(state,action){
      state.deleteSubsectionSectionId = action.payload
    }

}
})

export const {setStep,setCourse,setCategory,setUpdate,setcourseId,setdeleteSectionId,setdeleteSectionfleg,setIsSubsectioncreating,setdeleteSubsectionSectionId} = courseSlice.actions
export default courseSlice.reducer