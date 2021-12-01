import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUserAction, userSelector, getUserAction } from "../store/userReducer/userReducer";
import { appSelector } from "../store/appReducer/appReducer";
import { storage } from '../config/firebase-config';
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { useHistory} from "react-router-dom";
import { Loader } from "./Loader";
import "../css/userData.css";

const UserData=()=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoading = useSelector(appSelector).isLoading;
    const user = useSelector(userSelector);
    const u_id= localStorage.getItem("USER_ID");
    
    useEffect(()=>{
        if(!user)
        dispatch(getUserAction(u_id))
    }, [dispatch, user, u_id]) 

    const [userForm, setUserForm] = useState({
        email: user.email,
        u_name: user.u_name,
        phone: user.phone,
        city:user.city,
        country:user.country, 
        zipcode: user.zipcode,
        language:user.language, 
        ch_count: user.ch_count, 
    }); 

    const [fileUrl, setFileUrl] = useState(user.avatar);
    
    const onFileLoaded = async(e)=>{
        const file = e.target.files[0];
        const fileName =(Date.now()%1000)+"_"+ file.name
        const imageRef = ref(storage, "/us_avatar", fileName); 
        const metadata ={
            contentType: "image/jpeg"
        };
        await uploadBytes(imageRef, file, metadata);
        const url=await getDownloadURL(imageRef);
        setFileUrl(url)
    }

    const changeFieldHandler = event => {
        setUserForm({ ...userForm, [event.target.name]: event.target.value })
    } 

    useEffect(()=>{
        setUserForm({
            email: user.email, 
            u_name: user.u_name,
            phone:user.phone,
            city:user.city,
            country:user.country, 
            zipcode:user.zipcode,
            language:user.language, 
            ch_count:user.ch_count, 
        })
    }, [user]) 
    
    return(
        
        <main className="userForm-container">
            {user ?
            <div className="container user-container">
                
                <section className="login usData">
                    
                    <form className="usDataForm"
                    onSubmit ={e =>{
                        e.preventDefault();
                        dispatch(updateUserAction( u_id, {
                            email: userForm.email,
                            u_name: userForm.u_name,
                            phone:userForm.phone,
                            city:userForm.city,
                            country:userForm.country, 
                            zipcode:userForm.zipcode,
                            language:userForm.language, 
                            ch_count:userForm.ch_count, 
                            avatar: fileUrl ? fileUrl : user.avatar}
                            ));
                    }}>
                        {user.avatar !==""  ?
                        <div className="avatar-box">
                            <div className="usAvatar" style={{backgroundImage:`url(${user.avatar})`}}>
                            </div>
                            <img className="add-avatar" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1635878885/samples/infinity-love/PENCIL-1_chwxi2.png" alt="pencil"/>
                            <input type="file" id="avatar" name="avatar"
                                onChange={onFileLoaded}/>
                        </div>
                        :
                        <div className="avatar-box">
                            <div className="usAvatar" style={{backgroundImage:`url("https://res.cloudinary.com/ds9xmjqj8/image/upload/v1635878886/samples/infinity-love/profile_img_fpd0oe.png")`}}></div>
                            <img className="avatar-plus"src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1636230424/samples/infinity-love/plus-1_mvursb.jpg" alt="add cildren inputs"/>

                            <input type="file" id="avatar" name="avatar"
                                onChange={onFileLoaded}/>
                        </div>
                        }
                        <label>email:</label>
                        <input type="email" id="email" name="email"
                            defaultValue={user.email}
                            onChange={ (e) =>changeFieldHandler(e)}/>
                        <label>name:</label>
                        <input type="text" id="u_name" name="u_name" placeholder="type your phone number"
                            required
                            value={userForm.u_name}
                            onChange={ e =>changeFieldHandler(e)}/>
                        <label>phone:</label>
                        <input type="phone" id="phone" name="phone" placeholder="type your phone number"
                            value={userForm.phone}
                            onChange={ e =>changeFieldHandler(e)}/>
                        <label>country:</label>
                        <input type="text" id="country" name="country" placeholder="type your country"
                            required
                            value={userForm.country}
                            onChange={ e =>changeFieldHandler(e)}/>
                        <label>city:</label>
                        <input type="text" id="city" name="city" placeholder="type your city"
                            required
                            value={userForm.city}
                            onChange={ e =>changeFieldHandler(e)}/>
                        <label>zip code:</label>
                        <input type="text" id="zipcode" name="zipcode" placeholder="type your zip-code"
                            required
                            value={userForm.zipcode}
                            onChange={ e =>changeFieldHandler(e)}/>
                        <label>language:</label>
                        <input type="text" id="language" name="language" placeholder="type your language within the family" required
                            value={userForm.language}
                            onChange={ e =>changeFieldHandler(e)}/>
                        <label className="ch_count">amount of children:</label>
                        <input type="number" id="ch_count" name="ch_count" placeholder="how many kids do you have?"
                            required
                            value={userForm.ch_count}
                            onChange={ e =>changeFieldHandler(e)}/>
                        <button className="content-btn login-btn cancel-btn"
                                onClick={e => history.push("/")
                                }>cancel</button>
                        <button className="content-btn login-btn" type="submit"
                                >submit</button>
                    </form>
                </section>
                {user.u_name && user.phone && user.city && user.country && user.ch_count &&
                <button className="content-btn stick-btn" 
                        onClick={()=>history.push(`/us_page/${u_id}`)}>go to account
                </button>}
            </div>
            :  isLoading && <Loader/>
            } 
        </main>
        
        
    )
}    
export default UserData;