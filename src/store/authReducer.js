import {createSlice} from "@reduxjs/toolkit";
import { login, registration } from "../service/authService";
import { authSuccess, startLoading, stopLoading } from "./appReducer/appReducer";
import { setUser } from "./userReducer/userReducer";

const initialState = {
    error: null
}

const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setError:(state, {payload})=>{
            console.log(payload)
            state.error = payload;
        },
        clearError: state=>{
            state.error = null;
        }
    }
})

export default auth.reducer;
export const {setError, clearError} = auth.actions;
export const errorSelector = state => state.auth.error;

export function loginAction(email, password){
    return async dispatch=>{
        dispatch(startLoading());
        dispatch(clearError());
        try{
            await login(email, password);
            dispatch(authSuccess());
            
        }catch(error){
            console.log("loginAction", error)
            dispatch(setError(error.message))
        }finally{
            dispatch(stopLoading())
        }
    }
}

export function registrationAction(email, password){
    return async dispatch=>{
        dispatch(startLoading())
        dispatch(clearError())
        try{
            const user=await registration(email, password);
            console.log("registrationAction", user)
            dispatch(authSuccess());
            dispatch(setUser(user))
            dispatch(clearError())
        }catch(error){
            console.log(error)
            dispatch(setError(error.message))
        }finally{
            dispatch(stopLoading())
        }
    }
}