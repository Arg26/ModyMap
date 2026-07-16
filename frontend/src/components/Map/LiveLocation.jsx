import { useEffect } from "react";
import {
    Circle,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import L from "leaflet";

const blueIcon = new L.Icon({
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function LiveLocation({
    position,
    followUser = false,
}) {
    const map = useMap();

    useEffect(() => {
        if (followUser && position) {
            map.flyTo(position, 18, {
                duration: 1.5,
            });
        }
    }, [position, followUser, map]);

    if (!position) return null;

    return (
        <>
            <Marker
                position={position}
                icon={blueIcon}
            >
                <Popup>Your Current Location</Popup>
            </Marker>

            <Circle
                center={position}
                radius={20}
                pathOptions={{
                    color: "#2196f3",
                    fillColor: "#2196f3",
                    fillOpacity: 0.2,
                }}
            />
        </>
    );
}