import { createSlice } from "@reduxjs/toolkit";
import { getUserData, updateUserData} from "../../service/userService";
import { startLoading, stopLoading } from "../appReducer/appReducer";

const initialState={
    u_id:"",
    email:"",
    u_name:"",    
    phone:"",
    city:"",
    country:"", 
    zipcode:"",
    language:"", 
    ch_count:"", 
    avatar:""
}

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, {payload})=>{
            state.u_id = payload.u_id;
            state.email = payload.email;
            state.u_name = payload.u_name;
            state.phone = payload.phone;
            state.city = payload.city;
            state.country = payload.country; 
            state.zipcode = payload.zipcode;
            state.language = payload.language; 
            state.ch_count = payload.ch_count; 
            state.avatar = payload.avatar;
        },
        updateUser: (state, {payload}) =>{
            state.u_name = payload.u_name;
            state.phone = payload.phone;
            state.city = payload.city;
            state.country = payload.country; 
            state.zipcode = payload.zipcode;
            state.language = payload.language; 
            state.ch_count = payload.ch_count; 
            state.avatar = payload.avatar;
        }
    }
});

export const {setUser, updateUser} = userReducer.actions;
export default  userReducer.reducer
export const userSelector = state => state.user

export const getUserAction = (uid)=>{
    return async dispatch =>{
        dispatch(startLoading())
        try{
            const responce=await getUserData(uid) //db
            dispatch(setUser(responce)) //state
            //return true
        }catch(error){
            //console.log(error)
            return false
        }finally{
            dispatch(stopLoading())
        }
    }
}

export const updateUserAction=(user, uid)=>{
    return async dispatch=>{
        dispatch(startLoading())
        try{
            const responce= await updateUserData(user, uid)
            dispatch(updateUser(responce));
        }catch(e){
            console.log(e.message)
        }finally{
            dispatch(stopLoading())
        }
    }
} 
