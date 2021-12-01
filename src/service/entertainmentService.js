import {db} from "./../config/firebase-config";
import {doc, getDoc, setDoc, updateDoc, getDocs, collection} from "firebase/firestore";

export async function addEntertainmentItem({entId, ent_name, ent_zip, ent_city, ent_street, ent_no, ent_phone, likes}={}){
    try{
        await setDoc(doc(db, "entertainments", `${entId}`), {
            entId, ent_name, ent_zip, ent_city, ent_street, ent_no, ent_phone, likes
        })
        return ({entId, ent_name, ent_zip, ent_city, ent_street, ent_no, ent_phone, likes})
    }catch(error){
        return Promise.reject(error.message)
    }    
}

export async function getAllEntertainments() {
    try {
        const entertainments = [];
        const querySnapshot = await getDocs(collection(db, "entertainments"))
        if (querySnapshot) {
            querySnapshot.forEach(doc => {
                //console.log(doc.id)
                entertainments.push(doc.data());
            });
        }
        return entertainments;
    } catch (error) {
        return Promise.reject(error.message);
    }
}


export async function entLikeChange(entId, uid) {
    try {
        console.log(entId, uid)
        const docRef = doc(db, 'entertainments', entId);
        const entData = (await getDoc(docRef)).data();

        const userLiked = entData.likes.users.find(user => user === uid);
        const oldUsers = entData.likes.users;
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
                ...entData,
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