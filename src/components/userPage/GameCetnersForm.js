import { appSelector } from "../../store/appReducer/appReducer";
import { addEntertainmentAction} from "../../store/entertainmentReducer/entertainmentReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { Loader } from "../Loader";
import "../../css/userPage/gameCentersForm.css";

const GameCetnersForm = () => {
    
    const isLoading = useSelector(appSelector).isLoading;

    const [hide, setHide]=useState(false);

    const dispatch = useDispatch();

    const [entertainmentForm, setEntertainmentForm]=useState(
        {
            entId: Date.now(), 
            ent_name: "", 
            ent_zip: "", 
            ent_city: "", 
            ent_street: "", 
            ent_no: "", 
            ent_phone: "",  
            likes: {count:0, users:[] }
        }
    )
    
    const changeFieldHandler = event => {
        setEntertainmentForm({ ...entertainmentForm, [event.target.name]: event.target.value })
    } 
    return (
        <div className="game-centers-box">
            {hide ?
            <div className="success-box">
                <p className="success-message">information added successfully!</p>
                <img className="success-img" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/c_fill,h_300,w_300/v1638013551/samples/infinity-love/success_qxuy2k.jpg" alt="success" />
            </div>
            :
            <>
            <form className="games-form"
            onSubmit={e=>{
                e.preventDefault();
                dispatch(addEntertainmentAction(entertainmentForm));
                console.log("form",entertainmentForm)
                setEntertainmentForm({
                    ent_name: "", 
                    ent_zip: "", 
                    ent_city: "", 
                    ent_street: "", 
                    ent_no: "", 
                    ent_phone: "", 
                });
                setHide(true)
            }}>
                <div className="body-form">
                    <p>Please add to this field only those game centers that you really could recommend to your friends!</p>

                    <label>name:</label>
                    <input type="text"
                    placeholder="type game center's name"
                    id="gameCentr_name"
                    name="ent_name" required
                    value={entertainmentForm.ent_name}
                    onChange={(e) =>changeFieldHandler(e)}/>

                    <label>address:</label>
                    <input type="number" placeholder="zip code"
                    name="ent_zip" id="zip" required
                    value={entertainmentForm.ent_zip}
                    onChange={(e) =>changeFieldHandler(e)}/>

                    <input type="text" placeholder="city"
                    name="ent_city"
                    id="doc-city" required
                    value={entertainmentForm.ent_city}
                    onChange={(e) =>changeFieldHandler(e)}/>

                    <input type="text" placeholder="street"
                    name="ent_street"
                    id="street"required
                    value={entertainmentForm.ent_street}
                    onChange={(e) =>changeFieldHandler(e)}/>

                    <input type="number" 
                    name="ent_no" id="no" 
                    placeholder="No" required
                    value={entertainmentForm.ent_no}
                    onChange={(e) =>changeFieldHandler(e)}/>

                    <label>phone:</label>
                    <input type="phone"
                    name="ent_phone" id="doc-phone" required
                    value={entertainmentForm.ent_phone}
                    onChange={(e) =>changeFieldHandler(e)}/>
                </div>
                    <button className="btn-cancel">cancel</button>
                    <button className="save-btn">save</button>
            </form>
            </>
            }
            {isLoading && <Loader />}
        </div>
    )
}
export default GameCetnersForm;