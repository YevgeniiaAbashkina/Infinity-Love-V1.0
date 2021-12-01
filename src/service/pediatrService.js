import {db} from "./../config/firebase-config";
import {doc, getDoc, setDoc, updateDoc, getDocs, collection, query,} from "firebase/firestore";

export async function addPediatrItem({pediatrId, doc_name, doc_zip, doc_city, doc_street, doc_no, doc_phone, likes}={}){
    try{
        await setDoc(doc(db, "pediatricians", `${pediatrId}`), {
            pediatrId, doc_name, doc_zip, doc_city, doc_street, doc_no, doc_phone, likes
        })
        return ({pediatrId, doc_name, doc_zip, doc_city, doc_street, doc_no, doc_phone, likes})
    }catch(error){
        return Promise.reject(error.message)
    }    
}

export async function getAllPediatricians() {
    try {
        const pediatricians = [];
        const q = query(collection(db, "pediatricians"))
        const querySnapshot = await getDocs(q)
        if (querySnapshot) {
            querySnapshot.forEach(doc => {
                pediatricians.push(doc.data());
            });
        }
        return pediatricians;
    } catch (error) {
        return Promise.reject(error.message);
    }
}


export async function pediatrLikeChange(pediatrId, uid) {
    try {
        console.log(pediatrId, uid)
        const docRef = doc(db, 'pediatricians', pediatrId);
        const pediatrData = (await getDoc(docRef)).data();

        const userLiked = pediatrData.likes.users.find(user => user === uid);
        const oldUsers = pediatrData.likes.users;
        console.log(userLiked)

        if (userLiked) {
            await updateDoc(docRef, {
                "likes": {                   
                    users: oldUsers.filter(user => user !== uid),
                    count: oldUsers.length,
                }
            })
        } else {
            await updateDoc(docRef,{
                ...pediatrData,
                "likes": {
                    count: oldUsers.length +1,
                    users: [...oldUsers, uid]
                }

            })
        }
        console.log("Document successfully updated!");
    } catch (error) {
        console.log(error.message);
    }
}