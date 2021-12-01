import {createSlice} from "@reduxjs/toolkit";
import {startLoading, stopLoading} from "../appReducer/appReducer";
import {getAllEntertainments, addEntertainmentItem, entLikeChange} from "../../service/entertainmentService";
import {checkLike} from "../../components/Pediatricians";

const initialState = {
    entertainments:[]
}

const entertainmentReducer = createSlice({
    name:'entertainment',
    initialState,
    reducers:{
        setEntertainments:(state,{payload})=>{
            state.entertainments = payload.entertainments
        },
        likeChange:(state, {payload})=>{
            console.log(payload);
            const index = state.entertainments.findIndex(p=>p.entId === payload.entId);
            const ent = state.entertainments[index];
            const like = checkLike(ent, payload.uid);
            if(like){
                ent.likes.count -=1;
                ent.likes.users = ent.likes.users.filter(user => user !== payload.uid )
            }else{
                ent.likes.count +=1;
                ent.likes.users.push(payload.uid)
            }
            state.entertainments[index] = ent;
        }
    }
});

export const {setEntertainments, likeChange} = entertainmentReducer.actions;
export default entertainmentReducer.reducer;
export const entSelector = state =>state.entertainment.entertainments;


export function getAllEntertainmentAction(){
    return async dispatch =>{
        dispatch(startLoading());
        try{
            const response = await getAllEntertainments();
            dispatch(setEntertainments({entertainments:response}));
        }catch(error){
            console.log(error);     
        }finally{
            dispatch(stopLoading());
        }
    }
}

export const addEntertainmentAction = (entertainments)=>{
    console.log("addPediatrAction", entertainments)
    return async dispatch =>{
        dispatch(startLoading())
        try{
            await addEntertainmentItem(entertainments) // db
            dispatch(setEntertainments({entertainments}))  //state
        }catch(error){
            console.log(error)
        }finally{
            dispatch(stopLoading())
        }
    }
}

export function likeCountChange(entId, uid){
    return async dispatch =>{
        try{
            dispatch(likeChange({entId, uid}));
            await entLikeChange(entId, uid);
        }catch(error){
            console.log(error)
        }
    }
}