import { Link } from "react-router-dom";
import { useEffect, useState} from "react";
import DoctorForm from "./DoctorForm";
import GameCetnersForm from "./GameCetnersForm";
import ChildInfoForm from "./ChildInfoForm";
import { Loader } from "../Loader";
import { childSelector, getAllChildrenAction } from "../../store/childReducer/childReducer";
import { useDispatch, useSelector } from "react-redux";
import "../../css/userPage/userPage.css";

const UserPage=({user})=>{

    const [hideInfoChildren, setHideInfoChildren]=useState(true);
    const [hideInfoPediatrice, setHideInfoPediatrice]=useState(true);
    const [hideInfoGameCenters, setHideInfoGameCenters]=useState(true);

    const dispatch=useDispatch();

    const children=useSelector(childSelector);

    useEffect(()=>{
        dispatch(getAllChildrenAction())
    }, [dispatch])

    const getChildByUId=(u_id)=>{
        let userChildren = [];
        let index = 0;
        for(let i=0; i<children.length; i++) {
            if(children[i].u_id === u_id){
                userChildren[index] = children[i];
                index++;
            }
        }
        return userChildren;
    }
    const usChildern=getChildByUId(user.u_id)

    const calculateAge=(birthday)=>{ // birthday is a date
        const myBirthday = new Date(birthday);
        const ageDifMs = Date.now() - myBirthday;
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    } 

    return(
        <main>
            <div className="container page-container">
                {user.u_name ?
                <>
                <section className="left">
                    <div className="profile">
                            {user.avatar !=="" ?
                            <img className="profile-img" src={user.avatar} alt="avatar"/>
                            :
                            <img className="profile-img" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1635878886/samples/infinity-love/profile_img_fpd0oe.png" alt="avatar"/>
                            }
                        <p>Hello, everybody!</p>
                        <div className="edit-box">
                            <h3>My name is {user.u_name}.</h3>
                            <Link to="/registration/us_data"><img className="pencil" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1635878885/samples/infinity-love/PENCIL-1_chwxi2.png" alt="pencil"/></Link>
                        </div>
                        <p>I live in {user.country} ({user.city})</p>
                        
                        <div className="child-list">
                            <p className="parentOf">I am a parent of:</p>
                            <ol>
                                {usChildern.map(kid =>
                                    <li key={kid.ch_id}>
                                        {kid.ch_name}, {calculateAge(kid.ch_birth)} years
                                    </li>
                                )}
                            </ol>
                        </div> 
                        
                    </div>

                    <div className="us_friends"></div>
                    {/* <button className="content-btn page-btn">friends</button> */}
                </section>
                <section className="right">
                        {hideInfoChildren ? 
                        <> </> 
                        :
                        <ChildInfoForm/>}
                    <button className="content-btn page-right-btn"
                        onClick={()=>setHideInfoChildren(!hideInfoChildren)}>Add information about children
                    </button>
                    {/* doctors */}
                        {hideInfoPediatrice ? 
                        <> </> 
                        :
                        <DoctorForm/>}
                    <button className="content-btn page-right-btn"
                        onClick={()=>setHideInfoPediatrice(!hideInfoPediatrice)}>Add favorite pediatrice
                    </button>
                    {/* game centers */}
                        {hideInfoGameCenters ? 
                        <> </> 
                        :
                        <GameCetnersForm/>}
                    <button className="content-btn page-right-btn"
                        onClick={()=>setHideInfoGameCenters(!hideInfoGameCenters)}>Add favorite game centers
                    </button>
                </section>
                </>
                :
                <Loader/>
                }
            </div>
        </main>
    )
}   

export default UserPage;