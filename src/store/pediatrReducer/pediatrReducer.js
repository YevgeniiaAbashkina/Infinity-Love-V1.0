import {createSlice} from "@reduxjs/toolkit";
import {startLoading, stopLoading} from "../appReducer/appReducer";
import {getAllPediatricians, addPediatrItem, pediatrLikeChange} from "../../service/pediatrService";
import {checkLike} from "../../components/Pediatricians";

const initialState = {
    pediatricians:[]
}

const pediatrReducer = createSlice({
    name:'pediatr',
    initialState,
    reducers:{
        setPediatricians:(state,{payload})=>{
            state.pediatricians = payload.pediatricians
        },
        likeChange:(state, {payload})=>{
            console.log(payload);
            const index = state.pediatricians.findIndex(p=>p.pediatriciansId === payload.pediatriciansId);
            const pediatr = state.pediatricians[index];
            const like = checkLike(pediatr, payload.uid);
            if(like){
                pediatr.likes.count -=1;
                pediatr.likes.users = pediatr.likes.users.filter(user => user !== payload.uid )
            }else{
                pediatr.likes.count +=1;
                pediatr.likes.users.push(payload.uid)
            }
            state.pediatricians[index] = pediatr;
        }
    }
});

export const {setPediatricians, likeChange} = pediatrReducer.actions;
export default pediatrReducer.reducer;
export const pediatrSelector = state =>state.pediatr.pediatricians;


export function getAllPediatriciansAction(){
    return async dispatch =>{
        dispatch(startLoading());
        try{
            const response = await getAllPediatricians();
            dispatch(setPediatricians({pediatricians:response}));
        }catch(error){
            console.log(error);     
        }finally{
            dispatch(stopLoading());
        }
    }
}

export const addPediatrAction = (pediatricians)=>{
    console.log("addPediatrAction",pediatricians)
    return async dispatch =>{
        dispatch(startLoading())
        try{
            await addPediatrItem(pediatricians) // db
            dispatch(setPediatricians({pediatricians}))  //state
        }catch(error){
            console.log(error)
        }finally{
            dispatch(stopLoading())
        }
    }
}

export function likeCountChange(pediatriciansId, uid){
    return async dispatch =>{
        try{
            dispatch(likeChange({pediatriciansId, uid}));
            await pediatrLikeChange(pediatriciansId, uid);
        }catch(error){
            console.log(error)
        }
    }
}


