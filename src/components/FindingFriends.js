
import "../css/findingFriends.css";

const FindingFriends=()=>{
    return(
        <main>
            <div className="top-container">
                <div className="container top-box">
                    <div className="friends-form">
                        <form>
                            <input type="text" placeholder="city:"
                            id="friens-city"
                            name="city">
                            
                            </input>
                            <input type="number" placeholder="zip code:"
                            id="friens-zip"
                            name="zipcode">
                            
                            </input>
                            <select  name="age-filter"
                            id="friens-age">
                                <option value="the age of your future friends">the age of your future friends</option>
                                <option value="0-1">0-1</option>
                                <option value="2-3">2-3</option>
                                <option value="4-5">4-5</option>
                                <option value="6-8">6-8</option>
                                <option value="9-12">9-12</option>
                            </select>
                            <input type="text" placeholder="language:"
                            id="friens-language"
                            name="language">
                            
                            </input>
                            <input type="text" placeholder="child's hobby:"
                            id="friens-hobby"
                            name="hobby">
                            
                            </input>
                            <button className="content-btn friends-btn">search friends</button>
                        </form>
                    </div>
                    <div className="friends-image-box">
                        <img className="friends-image" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1635878884/samples/infinity-love/FREUNDS_cqhlyd.jpg" alt="friends-service"/>
                    </div>
                </div>

                <div className="container bottom-container">
                    <article className="item friend-item" /* key={item.id} */>
                        <img className="fr-profile-img" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1635878886/samples/infinity-love/profile_img_fpd0oe.png" alt="avatar"/>
                            
                                <h3>Kate, 12345 Berlin</h3>
                                <h2>Mark, 2 years old</h2>
                            
                    </article>
                    <article className="item friend-item" /* key={item.id} */>
                        <img className="fr-profile-img" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1635878886/samples/infinity-love/profile_img_fpd0oe.png" alt="avatar"/>
                        <h3>Kate, 12345 Berlin</h3>
                        <h2>Mark, 2 years old</h2>
                    </article>
                    <article className="item friend-item" /* key={item.id} */>
                        <img className="fr-profile-img" src="https://res.cloudinary.com/ds9xmjqj8/image/upload/v1635878886/samples/infinity-love/profile_img_fpd0oe.png" alt="avatar"/>
                            <h4>Kate, 12345 Berlin</h4>
                            <h2>Mark, 2 years old</h2>
                            <h2>Mark, 2 years old</h2>
                            <h2>Mark, 2 years old</h2>
                            <h2>Mark, 2 years old</h2>
                    </article>
                    
                </div>
            </div>  
        </main>

    )
}

export default FindingFriends;