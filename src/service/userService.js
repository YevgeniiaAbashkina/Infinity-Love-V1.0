import {db} from "./../config/firebase-config";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";

export async function addUserData(u_id, email, u_name="", phone="", city="", country="", zipcode="", language="",  ch_count="", avatar=""){
    try{
        await setDoc(doc(db, "users", u_id), {u_id, email, u_name, phone, city, country, zipcode, language,  ch_count, avatar})
        const user = await getUserData(u_id)
        return user
    }catch(error){
        return Promise.reject(error.message);
    }
}

export async function getUserData(uid){
    try{
        const docRef = doc(db, 'users', uid);
        const docData = await getDoc(docRef)
        if(docData.exists()){
            return docData.data();
        }
    }catch(error){
        return Promise.reject(error.message);
    }
}

export async function updateUserData(uid, user){
    try{
        const docRef = doc(db, 'users', uid);
        await updateDoc(docRef, {...user}, {merge:true})
        const docData = await getDoc(docRef)
        return docData.data()
    }catch(error){
        return Promise.reject(error.message);
    }
}
