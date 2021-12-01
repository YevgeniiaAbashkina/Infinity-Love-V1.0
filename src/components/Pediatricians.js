import { useEffect, useState } from "react";
import { pediatrSelector, getAllPediatriciansAction} from "../store/pediatrReducer/pediatrReducer";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./Loader";
import "../css/pediatricians.css";

const Pediatricians=()=>{
    const dispatch = useDispatch()
    const pediatricians = useSelector(pediatrSelector)

    useEffect(()=>{
        if(pediatricians.length === 0){
        dispatch(getAllPediatriciansAction())
        }
    },[dispatch, pediatricians])

    const [filterForm, setFilterForm]=useState({
        city: "",
        zipCode:""
    })

    const changeFieldHandler = event => {
        setFilterForm({ ...filterForm, [event.target.name]: event.target.value })
    } 
    
    const getEntByZipAndOrCity=(zip, city)=>{
        let resultEnts = [];
        let index = 0;

        for(let i=0; i<pediatricians.length; i++) {
            if(zip !== "" && city !== ""){
                if((pediatricians[i].doc_zip === zip)&&(pediatricians[i].doc_city === city)){
                    resultEnts[index] = pediatricians[i];
                    index++;
                }
            } else if(zip !== ""){
                if(pediatricians[i].doc_zip === zip){
                    resultEnts[index] = pediatricians[i];
                    index++;
                }
            } else if(city!==""){
                if((pediatricians[i].doc_city === city)){
                    resultEnts[index] = pediatricians[i];
                    index++;
                }
            }
        }
        return resultEnts;
    }
    
    let result=getEntByZipAndOrCity(filterForm.zipCode, filterForm.city);

    return(
        <>
        {pediatricians ?
        <main>
            <div className="top-container">
                <div className="container top-box">
                    <div className="friends-form">
                        <h3 className="alert-form">Fill in the city field and/or zip code to quickly find pediatrics in the place you need:</h3>
                        <form onSubmit={e =>{
                            e.preventDefault()
                            console.log(filterForm)
                            getEntByZipAndOrCity(filterForm.zipCode, filterForm.city)
                        }}>
                            <input type="text" placeholder="city:"
                            id="friens-city"
                            name="city"
                            onChange={changeFieldHandler}
                            />
                            
                            <input type="text" placeholder="zip code:"
                            id="friens-zip"
                            name="zipCode"
                            onChange={changeFieldHandler}
                            />

                        </form>
                    </div>
                    <div className="doc-image-box">
                        <img className="doc-image" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1635878884/samples/infinity-love/DOC-1_xcxbzn.jpg" alt="pediatricians"/>
                    </div>
                </div>
                {result.length ===0 ?
                <div className="container bottom-container card">
                    {pediatricians.map(ped =>
                        <article className="doc-calling-card" key={ped.pediatrId}>
                            <p>name: <span className="doc-name">{ped.doc_name}</span></p>
                            <p>address: {ped.doc_zip}, {ped.doc_city},  {ped.doc_street} {ped.doc_no}</p>
                            <p>phone: {ped.doc_phone}</p>
                            <hr/>
                            <div className="like-box">
                                <h4>5</h4>
                                <img className="like" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/c_fit,h_400,w_400/v1635878884/samples/infinity-love/like-1_g679lu.png" alt="dislike"/>
                                <h4>2</h4>
                                <img className="like" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/c_fit,h_400,w_400/v1637695185/samples/infinity-love/dislike-1_qdrqaz.png" alt="like"/>
                            </div>
                    </article>)}
                </div>
                :
                <div className="container bottom-container card">
                {result.map(ped =>
                    <article className="doc-calling-card" key={ped.pediatrId}>
                        <p>name: <span className="doc-name">{ped.doc_name}</span></p>
                        <p>address: {ped.doc_zip}, {ped.doc_city},  {ped.doc_street} {ped.doc_no}</p>
                        <p>phone: {ped.doc_phone}</p>
                        <hr/>
                        <div className="like-box">
                            <h4>5</h4>
                            <img className="like" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/c_fit,h_400,w_400/v1635878884/samples/infinity-love/like-1_g679lu.png" alt="dislike"/>
                            <h4>2</h4>
                            <img className="like" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/c_fit,h_400,w_400/v1637695185/samples/infinity-love/dislike-1_qdrqaz.png" alt="like"/>
                        </div>
                    </article>)}
                </div>
                }
            </div>  
        </main>
        :
        <Loader/>
        }
        </>
    )
}
export function checkLike(post, userId) {
        return post.likes.users.find(user => user === userId);
    }

export default Pediatricians;