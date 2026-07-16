import "./Sidebar.css";

import SearchBox from "./SearchBox";
import Directory from "./Directory";
import BuildingInfo from "../BuildingInfo/BuildingInfo";

import NLPSearch from "../NLPSearch/NLPSearch";
import VoiceSearchButton from "../Navigation/VoiceSearchButton";

export default function Sidebar({

    buildings,

    currentLocation,

    selectedBuilding,

    selectedCategory,

    startBuilding,

    destinationBuilding,

    routeInfo,

    isNavigating,

    onStartSelect,

    onDestinationSelect,

    onSwapLocations,

    onStartNavigation,

    onEndNavigation,

    onCategorySelect,

    onNavigate,

    onClose,

    nlpQuery,

    onNLPSearch,

}) {

    return (

        <aside
            className={
                isNavigating
                    ? "sidebar navigation-mode"
                    : "sidebar"
            }
        >

            {!isNavigating && (

                <div className="ai-search-card">

                    <h2>AI Search</h2>

                    <div className="ai-search-row">

                        <NLPSearch
                            buildings={buildings}
                            onSelectBuilding={onDestinationSelect}
                        />

                        <VoiceSearchButton
                            buildings={buildings}
                            onSelectBuilding={onDestinationSelect}
                        />

                    </div>

                </div>

            )}

            <div className="navigation-card">

                <h2>Navigation</h2>

                <SearchBox
                    label="From"
                    buildings={buildings}
                    selected={startBuilding}
                    currentLocation={currentLocation}
                    onSelectBuilding={onStartSelect}
                />

                <SearchBox
                    label="To"
                    buildings={buildings}
                    selected={destinationBuilding}
                    onSelectBuilding={onDestinationSelect}
                />

                <div className="navigation-buttons">

                    <button
                        className="swap-btn"
                        onClick={onSwapLocations}
                    >
                        ⇅ Swap
                    </button>

                    {!isNavigating ? (

                        <button
                            className="start-btn"
                            disabled={!destinationBuilding}
                            onClick={onStartNavigation}
                        >
                            Start Navigation
                        </button>

                    ) : (

                        <button
                            className="end-btn"
                            onClick={onEndNavigation}
                        >
                            End Navigation
                        </button>

                    )}

                </div>

                <div className="route-summary">

                    <h4>Route Information</h4>

                    <div className="route-item">

                        <span>Distance</span>

                        <strong>{routeInfo?.distance || "--"}</strong>

                    </div>

                    <div className="route-item">

                        <span>Estimated Time</span>

                        <strong>{routeInfo?.time || "--"}</strong>

                    </div>

                </div>

            </div>

            {!isNavigating && (

                <>

                    <Directory
                        selectedCategory={selectedCategory}
                        onCategorySelect={onCategorySelect}
                    />

                    <BuildingInfo
                        building={selectedBuilding}
                        onNavigate={onNavigate}
                        onClose={onClose}
                    />

                </>

            )}

        </aside>

    );

}