import "./NavigationBanner.css";

export default function CompassButton({

    rotate,
    setRotate,

}){

    return(

        <button

            className="compass-button"

            onClick={()=>setRotate(!rotate)}

        >

            🧭

        </button>

    );

}