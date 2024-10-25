import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import modalRducer from '../slices/modalSlice'
import courseReducer from '../slices/courseSlice'
import sectionRdeucer from "../slices/sectionSlide";

const rootReducer = combineReducers({
        auth:authReducer,
        profile:profileReducer,
        cart:cartReducer,
        modal:modalRducer,
        course:courseReducer,
        section:sectionRdeucer,

})

export default rootReducer