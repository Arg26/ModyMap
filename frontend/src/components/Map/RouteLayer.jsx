import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

export default function RouteLayer({

    startBuilding,

    destinationBuilding,

    currentLocation,

    isNavigating,

    setRouteInfo,

    setNavigationSteps,

}) {

    const map = useMap();

    const routingRef = useRef(null);

    useEffect(() => {

        if (!isNavigating) {

            if (routingRef.current) {

                map.removeControl(routingRef.current);

                routingRef.current = null;

            }

            setRouteInfo({

                distance: "",

                time: "",

            });

            setNavigationSteps([]);

            return;

        }

        if (!destinationBuilding) return;

        let start;

        if (startBuilding) {

            start = [

                startBuilding.latitude,

                startBuilding.longitude,

            ];

        }

        else {

            if (!currentLocation) return;

            start = currentLocation;

        }

        if (routingRef.current) {

            map.removeControl(routingRef.current);

        }

        routingRef.current = L.Routing.control({

            waypoints: [

                L.latLng(start[0], start[1]),

                L.latLng(

                    destinationBuilding.latitude,

                    destinationBuilding.longitude

                ),

            ],

            routeWhileDragging: false,

            addWaypoints: false,

            draggableWaypoints: false,

            fitSelectedRoutes: true,

            show: false,

            lineOptions: {

                styles: [

                    {

                        color: "#0066ff",

                        weight: 7,

                        opacity: 0.9,

                    },

                ],

            },

            createMarker(i, wp) {

                return L.marker(wp.latLng);

            },

        }).addTo(map);

        routingRef.current.on("routesfound", (e) => {

            const route = e.routes[0];

            const distance =

                (route.summary.totalDistance / 1000).toFixed(2) +

                " km";

            const totalMinutes = Math.round(

                route.summary.totalTime / 60

            );

            const hours = Math.floor(totalMinutes / 60);

            const minutes = totalMinutes % 60;

            const time =

                hours > 0

                    ? `${hours} hr ${minutes} min`

                    : `${minutes} min`;

            setRouteInfo({

                distance,

                time,

            });

            const instructions = route.instructions.map(

                (instruction) => ({

                    text: instruction.text,

                    distance:

                        instruction.distance.toFixed(0) +

                        " m",

                    time:

                        Math.round(instruction.time / 60) +

                        " min",

                    type: instruction.type,

                })

            );

            setNavigationSteps(instructions);

        });

        return () => {

            if (routingRef.current) {

                map.removeControl(routingRef.current);

                routingRef.current = null;

            }

        };

    }, [

        map,

        startBuilding,

        destinationBuilding,

        currentLocation,

        isNavigating,

        setRouteInfo,

        setNavigationSteps,

    ]);

    return null;

}