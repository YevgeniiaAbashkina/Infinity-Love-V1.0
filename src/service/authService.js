import { fb } from "../config/firebase-config";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { addUserData } from "./userService";


const auth=getAuth(fb)

export const login =async(email, password)=>{
    try{
        const responce = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("USER_ID", responce.user.uid)
    }catch(error){
        await Promise.reject(error)
    }
}

export const registration=async(email, password)=>{
    try{
        const responce = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem("USER_ID", responce.user.uid)
        const data=await addUserData(responce.user.uid, email)
        return data
    }catch(error){
        await Promise.reject(error)
    }
}

export const logout= async()=>{
    try{
        await signOut(auth)
        localStorage.removeItem("USER_ID")
    }catch(error){
        await Promise.reject(error)
    }
}