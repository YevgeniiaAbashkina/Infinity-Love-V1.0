import { Link, useHistory } from "react-router-dom";
import { serviceDropdown } from "./navItems";
import "../App.css";
import "../css/home.css";

const Home=({auth})=>{
    
    const history=useHistory();

    return(
        <>
        <main>
            <div className="container">
                <header>
                    <div className="home-circle-img left-img"></div>
                    <div className="logo-img"></div>
                    <div className="home-circle-img right-img"></div>
                </header>
                {auth ||
                <Link to="/registration" className="content-btn">registration</Link>}
                {/* section cards */}
                <section className="home-cards">
                    {serviceDropdown.map(item =>{
                        return(
                            <article className="item" key={item.id}>
                                <h3>{item.title}</h3>
                                <div className="card-body">
                                    {auth ? 
                                        <img  src={item.img} alt="service" className="card-img"
                                        onClick={()=> history.push(`${item.path}`)}
                                        />:
                                        <>
                                        <img className="card-imgIL" src={item.imgIL} alt="logo-mini"/>
                                        <p className="card-img">{item.description}</p>
                                        </>
                                    }
                                </div>
                            </article>
                        )    
                    })}
                </section>
                {/* section about */}
                <section className="about">
                    <div className="text-about">
                        <h2>about</h2>
                        <ul>
                            <li>Infinity Love is a community for parents who have children from 0 to 12 years old.</li>
                            <li>Infinity Love intentionally does not publish your home address, phone number and last name on its content pages.<br/>
                            You just indicate the city and zip code.<br/>
                            You are allowed not to indicate your real name, you can use a nickname.<br/>
                            Infinity Love is not responsible for the use of false data by the user.<br/>
                            Only in personal correspondence, making an appointment or closer communication, you  can indicate them yourself.</li>
                            <li>Only an adult should be a registered user of Infinity Love.</li>
                        </ul>
                    </div>
                    
                </section>
                <section className="violets">
                    <h1>Infinity Love <span>for children...</span></h1>
                </section>
            </div>
        </main>
        </>
    )
}

export default Home;