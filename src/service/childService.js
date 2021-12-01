import {db} from "./../config/firebase-config";
import {doc, collection, setDoc, getDocs} from "firebase/firestore";

export async function addChildItem(children){
    const childrenRef = collection(db, "children");
    try{
        for (let kid of children){
        await setDoc(doc(childrenRef, `${kid.ch_id}`), {
            u_id: kid.u_id,
            ch_id: kid.ch_id.toString(),
            ch_name: kid.ch_name, 
            ch_birth: kid.ch_birth,
            hobby: kid.hobby
        })}
    }catch(error){
        return Promise.reject(error.message)
    }    
} 

export const getAllChildren = async () =>{
    try{
        const children =[];
        const querySnapshot = await getDocs(collection(db, "children"));
        if (querySnapshot) {
            querySnapshot.forEach(doc => {
                children.push(doc.data());
            });
        }
        return children;
    }catch(error){
        return Promise.reject(error.message);
    }
}
