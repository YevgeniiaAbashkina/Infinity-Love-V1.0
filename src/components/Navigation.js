import { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { navItems } from "./navItems";
import Dropdown from "./Dropdown";
import {useDispatch} from "react-redux";
import{logoutAction} from "../store/appReducer/appReducer"
import "../css/navigation.css";

const Navigation =({auth, user})=>{
    const [dropdown, setDropdown]=useState(false);
    const history = useHistory();
    const dispatch= useDispatch();

    const user_id=localStorage.getItem("USER_ID");

    return(
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo-box">
                        <NavLink to="/"><img className="logo" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1636109617/samples/infinity-love/logo-lit_kkwvmo.png" alt="logo"/>        
                        </NavLink>
                    </div>
                    {auth ?
                    <>
                    <ul className="nav-items">
                        {navItems.map(item => 
                            item.title === "Services" &&
                                    <li key={item.id} className={item.cName}
                                    onMouseEnter={()=>setDropdown(true)}
                                    onMouseLeave={()=>setDropdown(false)}>
                                        <Link to="/">{item.title}</Link>
                                        {dropdown && <Dropdown/>}
                                    </li>
                        )}
                    </ul>
                    <div className="user-link">
                        {user.avatar ?
                            <img className="user-img" src={user.avatar} alt="user"
                            onClick={()=>history.push(`/us_page/${user_id}`)}/>
                        :
                        <img className="user-img" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1635878886/samples/infinity-love/profile_img_fpd0oe.png" alt="avatar"
                            onClick={()=>history.push(`/us_page/${user_id}`)}/>}
                        
                        <NavLink to="/" className="login-btn"
                            onClick={()=>{dispatch(logoutAction())
                            }}>
                                sign up
                        </NavLink>
                    </div>    
                    </>:
                    <NavLink to="/login" className="login-btn">
                        sign in
                    </NavLink>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navigation;