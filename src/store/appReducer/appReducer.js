import {createSlice} from "@reduxjs/toolkit";
import { logout } from "../../service/authService";


const initialState = {
    isLoading: false,
    auth: false
}

const appReducer = createSlice({
    name: "app", 
    initialState,
    reducers: {
        startLoading: state =>{
            state.isLoading = true
        },
        stopLoading: state =>{
            state.isLoading = false
        },
        authSuccess: state=>{
            state.auth = localStorage.getItem("USER_ID") !==null
        },
        appLogout: state =>{
            state.auth = false
        }
    }
})

export default appReducer.reducer; 
export const {startLoading, stopLoading, authSuccess, appLogout} = appReducer.actions; 
export const appSelector = state => state.app

export const logoutAction = ()=>{
    return async dispatch =>{
        dispatch(startLoading())
        try{
            await logout()
            dispatch(appLogout())
        }catch(e){
            console.log(e.message)
        }
        finally{
            dispatch(stopLoading())
        }
    }
}