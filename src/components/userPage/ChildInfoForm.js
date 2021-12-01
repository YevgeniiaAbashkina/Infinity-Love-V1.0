import { useState} from "react";
import { useDispatch } from "react-redux";
import { addChildAction } from "../../store/childReducer/childReducer";
import "../../css/userPage/childInfoForm.css";

const ChildInfoForm = () => {
    const dispatch=useDispatch();
    const u_id= localStorage.getItem("USER_ID");

    const [hide, setHide]=useState(false)

    const [inputFields, setInputFields] = useState(
        [{
            u_id: u_id,
            ch_id: Date.now(),
            ch_name: '', 
            ch_birth: '',
            hobby:''
        }]  
    );

    const handleAddFields = () => {
        setInputFields([...inputFields, { u_id, ch_id: Date.now(), ch_name: '', ch_birth: '', hobby:''}])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addChildAction(inputFields))
        console.log("27",inputFields)
        setHide(true)
    };

    const changeFieldHandler = (id,event) => {
        const newInputFields = inputFields.map(i => {
            if(id === i.ch_id) {
            i[event.target.name] = event.target.value
            }
            return i;
        })
        setInputFields(newInputFields);
    } 

    return (
        <div className="childrens-box">
            {hide ? 
            <div className="success-box">
                <p className="success-message">information added successfully!</p>
                <img className="success-img" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/c_fill,h_300,w_300/v1638013551/samples/infinity-love/success_qxuy2k.jpg" alt="success" />
            </div>
            :
            <>
            <p >Please fill in the required information about your children (child) on this form!</p>
            <form className={`childrens-form ${hide && 'form-switched'}`}
            onSubmit={handleSubmit}>
                
                { inputFields.map(inputField => (
                <div key={inputField.ch_id}>
                    <div className="body-form ch-body-form">
                        
                        <label>name of child:</label>
                        <input type="text" id="ch_name" name="ch_name" required
                            value={inputField.ch_name}
                            onChange={ e =>changeFieldHandler(inputField.ch_id, e)}/>
                        <label>hobby:</label>
                        <input type="text" id="hobby" name="hobby" required
                            value={inputField.hobby}
                            onChange={ e =>changeFieldHandler(inputField.ch_id, e)}/>      
                        <div className="add-input-group">
                            <label>child's date  of birth:</label>
                            <input type="date" id="ch_birth" name="ch_birth" required
                                value={inputField.ch_birth}
                                onChange={ e =>changeFieldHandler(inputField.ch_id, e)}/>
                            <img className="img-plus"src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1636230424/samples/infinity-love/plus-1_mvursb.jpg" alt="add cildren inputs"
                            onClick={handleAddFields}/>
                        </div>
                    </div>
                    
                </div>
                ))}
                    <button className="btn-cancel">cancel</button>
                    <button className="save-btn" type="submit">save</button>
            </form>
            </>
            }
        </div>
    )
}
export default ChildInfoForm;