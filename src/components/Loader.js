import "../css/userNotPage.css";
import "../css/loader.css";

export const Loader = () => {
    return (
            <div className="container container-body">
                <div className="infinity-loader">
                    <div className="bg">
                        <div className="left-bg"></div>
                        <div className="right-bg"></div>
                    </div>
                    <div className="fg">
                        <div className="top-left-rect">
                            <div></div>
                        </div>
                        <div className="bottom-right-rect">
                            <div></div>
                        </div>
                        <div className="top-right-rect">
                            <div></div>
                        </div>
                        <div className="bottom-left-rect">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>       
    )
}
