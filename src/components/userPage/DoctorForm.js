import { appSelector } from "../../store/appReducer/appReducer";
import { addPediatrAction} from "../../store/pediatrReducer/pediatrReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { Loader } from "../Loader";
import "../../css/userPage/doctorForm.css";

const DoctorForm = () => {

    const isLoading = useSelector(appSelector).isLoading;

    const [hide, setHide]=useState(false);

    const dispatch = useDispatch();

    const [pediatriciansForm, setPediatriciansForm]=useState(
        {
            pediatrId: Date.now(), 
            doc_name: "", 
            doc_zip: "", 
            doc_city: "", 
            doc_street: "", 
            doc_no: "", 
            doc_phone: "",  
            likes: {count:0, users:[] }
        }
    )
    
    const changeFieldHandler = event => {
        setPediatriciansForm({ ...pediatriciansForm, [event.target.name]: event.target.value })
    } 

    return (
        <div className="doctors-box">
            {hide ? 
            <div className="success-box">
                <p className="success-message">information added successfully!</p>
                <img className="success-img" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/c_fill,h_300,w_300/v1638013551/samples/infinity-love/success_qxuy2k.jpg" alt="success" />
            </div>
            :
            <>
            <form className="doctors-form"
                onSubmit={e=>{
                    e.preventDefault();
                    dispatch(addPediatrAction(pediatriciansForm));
                    setPediatriciansForm({
                        doc_name: "", 
                        doc_zip: "", 
                        doc_city: "", 
                        doc_street: "", 
                        doc_no: "", 
                        doc_phone: "", 
                    });
                    setHide(true)
                }}>
                <div className="body-form">
                    <p>Please add to this field only those pediatricians whom you could really recommend to your friends!</p>

                    <label>name:</label>
                    <input type="text" id="doc_name"
                    placeholder="type doctor's name" name="doc_name" required
                    value={pediatriciansForm.doc_name}
                    onChange={(e) =>changeFieldHandler(e)}/>

                    <label>address:</label>
                    <input type="number" name="doc_zip" id="zip" placeholder="zip code" required
                    value={pediatriciansForm.doc_zip}
                    onChange={(e) =>changeFieldHandler(e)}/>

                    <input type="text" placeholder="city" name="doc_city" required
                    id="doc-city"
                    value={pediatriciansForm.doc_city}
                    onChange={(e) =>changeFieldHandler(e)}/>

                    <input type="text" placeholder="street" required
                    name="doc_street"
                    id="street"
                    value={pediatriciansForm.doc_street}
                    onChange={(e) =>changeFieldHandler(e)}/>

                    <input type="number" required
                    name="doc_no" id="no" placeholder="No"
                    value={pediatriciansForm.doc_no}
                    onChange={(e) =>changeFieldHandler(e)}/>

                    <label>phone:</label>
                    <input type="phone" name="doc_phone" id="doc-phone" required
                    value={pediatriciansForm.doc_phone}
                    onChange={(e) =>changeFieldHandler(e)}/>
                </div>
                    <button className="btn-cancel" >cancel</button>
                    <button className="save-btn">save</button>
            </form>
            </>
            }
            {isLoading && <Loader />}
        </div>
    )
}
export default DoctorForm;