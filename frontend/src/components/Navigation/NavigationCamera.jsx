import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function NavigationCamera({

    currentLocation,

    isNavigating,

}) {

    const map = useMap();

    useEffect(() => {

        if (!isNavigating) return;

        if (!currentLocation) return;

        map.flyTo(

            currentLocation,

            map.getZoom(),

            {

                animate: true,

                duration: 0.8,

            }

        );

    }, [

        currentLocation,

        isNavigating,

        map,

    ]);

    return null;

}