import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { entSelector, getAllEntertainmentAction } from "../store/entertainmentReducer/entertainmentReducer";
import { Loader } from "./Loader";
import "../css/entertainment.css";

const Entertainment=()=>{
    const dispatch = useDispatch()
    const entertainments = useSelector(entSelector)

    useEffect(()=>{
        if(entertainments.length === 0){
        dispatch(getAllEntertainmentAction())
        }
    },[dispatch, entertainments])

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

        for(let i=0; i<entertainments.length; i++) {

            if(zip !== "" && city !== ""){

                if((entertainments[i].ent_zip === zip)&&(entertainments[i].ent_city === city)){
                    resultEnts[index] = entertainments[i];
                    index++;
                }
            } else if(zip !== ""){

                if(entertainments[i].ent_zip === zip){
                    resultEnts[index] = entertainments[i];
                    index++;
                }
            } else if(city!==""){

                if((entertainments[i].ent_city === city)){
                    resultEnts[index] = entertainments[i];
                    index++;
                }
            }

        }
        return resultEnts;
    }
    
    let result=getEntByZipAndOrCity(filterForm.zipCode, filterForm.city);

    return(
        <>
        {entertainments ?
        <main>
            <div className="top-container">
                <div className="container top-box">
                    <div className="friends-form">
                        <h3 className="alert-form">Fill in the city field and/or zip code to quickly find entertainments centers in the place you need:</h3>
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
                        <img className="doc-image" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1635878884/samples/infinity-love/GAMES-1_a7cdue.jpg" alt="entertainment"/>
                    </div>
                </div>
                {result.length ===0 ?

                <div className="container bottom-container card">
                    {entertainments.map(ent=>
                        <article className="doc-calling-card game-card" key={ent.entId}>
                            <p>name: <span className="doc-name">{ent.ent_name}</span></p>
                            <p>address: {ent.ent_city}, {ent.ent_zip}, {ent.ent_street} {ent.ent_no}</p>
                            <p>phone: {ent.ent_phone}</p>
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
                    { result.map(ent =>
                        <article className="doc-calling-card game-card" key={ent.entId}>
                            <p>name: <span className="doc-name">{ent.ent_name}</span></p>
                            <p>address: {ent.ent_city}, {ent.ent_zip}, {ent.ent_street} {ent.ent_no}</p>
                            <p>phone: {ent.ent_phone}</p>
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
        :<Loader/>
        } 
        </>  
    )
}

export default Entertainment;
