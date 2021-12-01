import { useHistory, Redirect} from "react-router-dom";
import {useState} from "react";
import {registrationAction, errorSelector, clearError } from "../store/authReducer";
import {useDispatch, useSelector} from "react-redux";
import "../App.css";
import "../css/login+reg.css";

const Registration=({auth})=>{
    
    const dispatch= useDispatch();
    const history = useHistory();
    const error = useSelector(errorSelector);
    
    const [state, setState]=useState({
        email:"",
        password:""
    })

    const onChangeHandler =(e)=>{
        setState({...state, [e.target.name]: e.target.value})
    }

    return(
        <>
        {auth && <Redirect to="registration/us_data"/>} 
        <main className="main-login">
            <div className="container">
                
                <section className="login">
                    <img src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1636109617/samples/infinity-love/logo-lit_kkwvmo.png" alt="little-logo"/>
                    <h1 id="modal-titel"><span className="modal-titel">welcome to</span> Infinity Love!</h1>
                    <p className="modal-message">Already have an account? 
                        <span className="link-to-form" onClick={()=>{
                            history.push("/login")
                            dispatch(clearError())}}>Sign in</span>
                        </p>{error && <h3 className="errors-messages">{error}</h3>}
                    <form 
                        onSubmit={e =>{
                            e.preventDefault()
                            dispatch(registrationAction(state.email, state.password))
                            setState({email:"", password:""})
                            dispatch(clearError())
                        }}>
                            
                        <label>email:</label>
                        <input type="email" 
                            name="email"
                            placeholder="type your email"
                            value={state.email}
                            onChange={e =>{
                                onChangeHandler(e)}}/>
                        <label>password:</label>
                        <input type="password" 
                            name="password"
                            placeholder="type your password"
                            value={state.password}
                            onChange={e =>{
                                onChangeHandler(e)}}/>
                        <hr/>
                        <p className="descrip">Password must have at least 8 characters with at least one Capital letter, at least one lower case letter and at least one number or special character.</p>
                        <button className="content-btn login-btn cancel-btn"
                                onClick={e => history.push("/")
                        }>cancel</button>        
                        <button className="content-btn login-btn"  type="submit" name="registration">Registration</button>
                    </form>
                </section>
            </div>
        </main>
        </>
    )
}

export default Registration;