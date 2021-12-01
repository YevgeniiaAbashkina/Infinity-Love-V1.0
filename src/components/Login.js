import {useHistory, Redirect} from "react-router-dom";
import { useState} from "react";
import { loginAction, errorSelector, clearError } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";
import "../css/login+reg.css";
import "../App.css";

const Login =({auth})=>{
    const [state, setState]=useState({
        email:"",
        password:""
    })
    const error = useSelector(errorSelector);
    
    //const [errorState, setStateError]=useState(error)

    const onChangeHandler =(e)=>{
        setState({...state, [e.target.name]: e.target.value})
    }

    const dispatch= useDispatch();
    const history=useHistory();

    return(
        <>
        {auth && <Redirect to="/"/>}
        <main className="main-login">
            <div className="container">
                <section className="login">
                    
                    <img src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1636109617/samples/infinity-love/logo-lit_kkwvmo.png" alt="little-logo"/>
                    <h1 id="modal-titel"><span className="modal-titel">welcome to</span> Infinity Love!</h1>
                    <p className="modal-message">Are you already a registered user? Then lets go!<br/> If you are a beginner - please go to the 
                        <span className="link-to-form" 
                                onClick={()=>{
                                    dispatch(clearError())
                                    history.push("/registration")
                                }}>registration
                        </span>!
                    </p>
                    {error && <h3 className="errors-messages">{error}</h3>}
                    <form
                    onSubmit={e =>{
                        e.preventDefault()
                        dispatch(loginAction(state.email, state.password))

                        setState({email:"", password:""})
                        
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
                        <button className="content-btn login-btn cancel-btn"
                            onClick={e => history.push("/")
                        }>cancel</button>
                        <button className="content-btn login-btn" type="submit" name ="login"
                        >Login</button>
                    </form>
                </section>
            </div>
        </main>
        </>
    )
}

export default Login;