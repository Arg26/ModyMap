import "./MapView.css";

import { useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    useMap,
} from "react-leaflet";

import MarkerLayer from "./MarkerLayer";
import RouteLayer from "./RouteLayer";
import LiveLocation from "./LiveLocation";

import NavigationBanner from "../Navigation/NavigationBanner";
import NavigationArrow from "../Navigation/NavigationArrow";
import NavigationVoice from "../Navigation/NavigationVoice";
import NavigationCamera from "../Navigation/NavigationCamera";
import CompassButton from "../Navigation/CompassButton";

function FlyToBuilding({ building }) {

    const map = useMap();

    useEffect(() => {

        if (!building) return;

        map.flyTo(

            [

                building.latitude,

                building.longitude,

            ],

            19,

            {

                duration: 1.5,

            }

        );

    }, [building, map]);

    return null;

}

export default function MapView({

    buildings,

    selectedBuilding,

    onSelectBuilding,

    currentLocation,

    followUser,

    startBuilding,

    destinationBuilding,

    isNavigating,

    setRouteInfo,

    navigationSteps,

    setNavigationSteps,

    heading,

    speed,

    accuracy,

    mapType,

}) {

    return (

        <div className="map">

            {

                isNavigating &&

                <>

                    <NavigationBanner

                        steps={navigationSteps}

                    />

                    <NavigationArrow

                        heading={heading}

                    />

                    <NavigationVoice

                        steps={navigationSteps}

                    />

                    <CompassButton />

                </>

            }

            <MapContainer

                center={[27.801909,75.036435]}

                zoom={17}

                scrollWheelZoom

                zoomControl

            >

                {

                    mapType==="satellite"

                    ?

                    <TileLayer

                        attribution="Esri"

                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

                    />

                    :

                    <TileLayer

                        attribution="© OpenStreetMap"

                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                    />

                }

                <FlyToBuilding

                    building={selectedBuilding}

                />

                <NavigationCamera

                    currentLocation={currentLocation}

                    isNavigating={isNavigating}

                />

                <MarkerLayer

                    buildings={buildings}

                    onSelectBuilding={onSelectBuilding}

                    isNavigating={isNavigating}

                    startBuilding={startBuilding}

                    destinationBuilding={destinationBuilding}

                />

                <RouteLayer

                    startBuilding={startBuilding}

                    destinationBuilding={destinationBuilding}

                    currentLocation={currentLocation}

                    isNavigating={isNavigating}

                    setRouteInfo={setRouteInfo}

                    setNavigationSteps={setNavigationSteps}

                />

                <LiveLocation

                    position={currentLocation}

                    followUser={followUser}

                />

            </MapContainer>

        </div>

    );

}