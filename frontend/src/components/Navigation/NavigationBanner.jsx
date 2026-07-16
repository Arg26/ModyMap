import "./NavigationBanner.css";

export default function NavigationBanner({

    isNavigating,
    destination,
    routeInfo,

}){

    if(!isNavigating || !destination) return null;

    return(

        <div className="navigation-banner">

            <div className="banner-left">

                <div className="banner-arrow">
                    ↑
                </div>

                <div>

                    <h3>
                        {destination.name}
                    </h3>

                    <p>
                        Continue Straight
                    </p>

                </div>

            </div>

            <div className="banner-right">

                <div>

                    <strong>
                        {routeInfo?.distance || "--"}
                    </strong>

                    <span>Distance</span>

                </div>

                <div>

                    <strong>
                        {routeInfo?.time || "--"}
                    </strong>

                    <span>ETA</span>

                </div>

            </div>

        </div>

    );

}