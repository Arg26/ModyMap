import L from "leaflet";
import "leaflet-routing-machine";

/**
 * Create a walking route between two locations.
 *
 * @param {L.Map} map
 * @param {[number, number]} start
 * @param {{ latitude:number, longitude:number }} destination
 *
 * @returns Routing Control
 */

export function createRoute(
    map,
    start,
    destination
) {
    if (!map || !start || !destination) {
        return null;
    }

    return L.Routing.control({
        waypoints: [
            L.latLng(start[0], start[1]),
            L.latLng(
                destination.latitude,
                destination.longitude
            ),
        ],

        routeWhileDragging: false,

        addWaypoints: false,

        draggableWaypoints: false,

        fitSelectedRoutes: true,

        show: false,

        createMarker: () => null,

        lineOptions: {
            styles: [
                {
                    color: "#850000",
                    weight: 5,
                    opacity: 0.9,
                },
            ],
        },
    });
}

/**
 * Remove route from map
 */

export function removeRoute(
    map,
    routingControl
) {
    if (map && routingControl) {
        map.removeControl(routingControl);
    }
}