import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const startIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const endIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function MarkerLayer({
    buildings,
    onSelectBuilding,
    isNavigating,
    startBuilding,
    destinationBuilding,
}) {
    if (!buildings?.length) return null;

    // Navigation Mode
    if (isNavigating) {
        return (
            <>
                {startBuilding && (
                    <Marker
                        position={[
                            startBuilding.latitude,
                            startBuilding.longitude,
                        ]}
                        icon={startIcon}
                    >
                        <Popup>
                            <strong>Start</strong>
                            <br />
                            {startBuilding.name}
                        </Popup>
                    </Marker>
                )}

                {destinationBuilding && (
                    <Marker
                        position={[
                            destinationBuilding.latitude,
                            destinationBuilding.longitude,
                        ]}
                        icon={endIcon}
                    >
                        <Popup>
                            <strong>Destination</strong>
                            <br />
                            {destinationBuilding.name}
                        </Popup>
                    </Marker>
                )}
            </>
        );
    }

    // Normal Mode
    return (
        <>
            {buildings.map((building) => (
                <Marker
                    key={building.id}
                    position={[
                        building.latitude,
                        building.longitude,
                    ]}
                    eventHandlers={{
                        click() {
                            onSelectBuilding(building);
                        },
                    }}
                >
                    <Popup>
                        <strong>{building.name}</strong>
                        <br />
                        {building.category}
                    </Popup>
                </Marker>
            ))}
        </>
    );
}