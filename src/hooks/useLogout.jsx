import React from 'react'
import Cookies from 'js-cookie';
import {setToken} from '../slices/authSlice'
import {setName,setId,setUser,setPD} from '../slices/profileSlice'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';


export function useLogout() {
 const dispatch = useDispatch()
 return useCallback(() => {
        localStorage.clear();
        Cookies.remove('token',{path:'/'})
        dispatch(setUser(null))
        dispatch(setId(null))
        dispatch(setName(null))
        dispatch(setToken(null))
        dispatch(setPD([]))
 }, []);
}


