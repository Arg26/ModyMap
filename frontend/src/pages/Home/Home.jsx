import { useMemo, useState } from "react";

import "./Home.css";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import MapView from "../../components/Map/MapView";
import Loader from "../../components/Common/Loader";

import useBuildings from "../../hooks/useBuildings";
import useUserLocation from "../../hooks/useUserLocation";

import { searchBuilding } from "../../services/nlpService";

export default function Home() {

    const {

        buildings,

        loading,

        error,

    } = useBuildings();

    const {

        currentLocation,

        heading,

        speed,

        accuracy,

    } = useUserLocation();

    const [selectedBuilding, setSelectedBuilding] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [followUser, setFollowUser] = useState(false);

    const [startBuilding, setStartBuilding] = useState(null);

    const [destinationBuilding, setDestinationBuilding] = useState(null);

    const [isNavigating, setIsNavigating] = useState(false);

    const [routeInfo, setRouteInfo] = useState({

        distance: "",

        time: "",

    });

    const [navigationSteps, setNavigationSteps] = useState([]);

    const [theme, setTheme] = useState("light");

    const [mapType, setMapType] = useState("street");

    const [nlpQuery, setNlpQuery] = useState("");

    const filteredBuildings = useMemo(() => {

        if (isNavigating) {

            return buildings;

        }

        if (selectedCategory === "All") {

            return buildings;

        }

        return buildings.filter(

            building =>

                building.category === selectedCategory

        );

    }, [

        buildings,

        selectedCategory,

        isNavigating,

    ]);

    function handleLocateMe() {

        setFollowUser(true);

        setTimeout(() => {

            setFollowUser(false);

        }, 600);

    }

    function handleSwapLocations() {

        const temp = startBuilding;

        setStartBuilding(destinationBuilding);

        setDestinationBuilding(temp);

    }

    function handleStartNavigation() {

        if (!destinationBuilding) return;

        setIsNavigating(true);

    }

    function handleEndNavigation() {

        setIsNavigating(false);

        setStartBuilding(null);

        setDestinationBuilding(null);

        setNavigationSteps([]);

        setRouteInfo({

            distance: "",

            time: "",

        });

    }

    function handleBuildingSelection(building) {

        if (!building) {

            alert("No matching building found.");
            return;

        }

        setSelectedBuilding(building);

        setDestinationBuilding(building);

        setNlpQuery(building.name);

    }

    if (loading) {

        return (

            <Loader

                fullscreen

                text="Loading ModyMap..."

            />

        );

    }

    if (error) {

        return (

            <div className="home-error">

                <h2>Unable to load buildings</h2>

                <p>{error}</p>

            </div>

        );

    }

    return (

        <div className={`home ${theme}`}>

            <Header

                onLocateMe={handleLocateMe}

                theme={theme}

                setTheme={setTheme}

                mapType={mapType}

                setMapType={setMapType}

            />

            <div className="home-content">

                <Sidebar

                    buildings={buildings}

                    currentLocation={currentLocation}

                    selectedBuilding={selectedBuilding}

                    selectedCategory={selectedCategory}

                    startBuilding={startBuilding}

                    destinationBuilding={destinationBuilding}

                    routeInfo={routeInfo}

                    isNavigating={isNavigating}

                    onStartSelect={setStartBuilding}

                    onDestinationSelect={setDestinationBuilding}

                    onSwapLocations={handleSwapLocations}

                    onStartNavigation={handleStartNavigation}

                    onEndNavigation={handleEndNavigation}

                    onCategorySelect={setSelectedCategory}

                    onNavigate={(building) => {

                        setSelectedBuilding(building);

                        setDestinationBuilding(building);

                    }}

                    onClose={() => setSelectedBuilding(null)}

                    nlpQuery={nlpQuery}

                    onNLPSearch={handleBuildingSelection}

                />

                <MapView

                    buildings={filteredBuildings}

                    selectedBuilding={selectedBuilding}

                    onSelectBuilding={setSelectedBuilding}

                    currentLocation={currentLocation}

                    followUser={followUser}

                    startBuilding={startBuilding}

                    destinationBuilding={destinationBuilding}

                    isNavigating={isNavigating}

                    setRouteInfo={setRouteInfo}

                    navigationSteps={navigationSteps}

                    setNavigationSteps={setNavigationSteps}

                    heading={heading}

                    speed={speed}

                    accuracy={accuracy}

                    mapType={mapType}

                />

            </div>

        </div>

    );

}