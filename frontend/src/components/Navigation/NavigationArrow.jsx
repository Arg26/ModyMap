import { Marker } from "react-leaflet";
import L from "leaflet";

const icon=L.divIcon({

    className:"",

    html:`

    <div style="
    width:28px;
    height:28px;
    background:#1E88E5;
    clip-path:polygon(50% 0%,100% 100%,50% 75%,0% 100%);
    transform:rotate(0deg);
    "></div>

    `,

    iconSize:[28,28]

});

export default function NavigationArrow({

    currentLocation,

}){

    if(!currentLocation) return null;

    return(

        <Marker

            position={currentLocation}

            icon={icon}

        />

    );

}