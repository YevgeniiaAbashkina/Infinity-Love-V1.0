import { createSlice } from '@reduxjs/toolkit';
import { addChildItem, getAllChildren} from "../../service/childService";
import { startLoading, stopLoading } from "../appReducer/appReducer";

const initialState = {
    children: []
}

const childReducer = createSlice({
    name:'child',
    initialState,
    reducers:{
        setChildren: (state, {payload}) =>{
            state.children = payload.children
        }
    }
})

export const {setChildren} = childReducer.actions
export default childReducer.reducer
export const childSelector = state => state.child.children

export const addChildAction = (children)=>{
    return async dispatch =>{
        dispatch(startLoading())
        try{
            await addChildItem(children) // db
            dispatch(setChildren({children}))  //state
        }catch(error){
            console.log(error)
        }finally{
            dispatch(stopLoading())
        }
    }
}


export const getAllChildrenAction = ()=>{
    return async dispatch =>{
        dispatch(startLoading())
        try{
            const response = await getAllChildren()
            dispatch(setChildren({children:response}))
        }catch(error){
            console.log(error)
        }
        finally{
            dispatch(stopLoading())
        }
    }
}
